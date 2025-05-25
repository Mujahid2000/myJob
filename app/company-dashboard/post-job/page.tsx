'use client';
import { AuthContext } from '@/Authentication/AuthContext';
import SuccessModal from '@/Component/Employee-Dashboard/postajob/SuccessModal';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useGetCompanyDataQuery, useJobPostPromotedMutation, usePostAJobMutation } from '@/RTKQuery/JobPostSliceApi';
import { useGetAllTagsQuery } from '@/RTKQuery/TagsApi';
import { RootState } from '@/Store/Store';
import { addTag, removeTag } from '@/Store/TagStateSlice';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './custom.css'

type Inputs = {
  title: string;
  tags: string[];
  jobRole: string;
  minSalary: string;
  maxSalary: string;
  salaryType: string;
  education: string;
  experience: string;
  jobType: string;
  jobLevel: string;
  vacancies: string;
  expiryDate: string;
  applyMethod: string;
  description: string;
  location?: string; // Optional, will be overridden by companyData.mapLocation
};

interface tagsType {
  _id: string;
  name: string;
}

const PostAJob: React.FC = () => {
  const router = useRouter(); // Use useRouter from next/navigation
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useDispatch();
  const { tags } = useSelector((state: RootState) => state.SelectedTag);
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail } = useGetUserByIdQuery(currentUser?.email || '');
  const id = userEmail?.user?._id;
  const { data: companyData, isLoading: isCompanyDataLoading } = useGetCompanyDataQuery(id || '');
  const [promotedJobs, { isLoading: isPromotedLoading }] = useJobPostPromotedMutation();
  const companyId = companyData?._id;
  const location = companyData?.mapLocation;
  const [postData, { isLoading: isPostJobLoading }] = usePostAJobMutation();
  const [filteredTags, setFilteredTags] = useState<tagsType[]>([]);
  const { data: tagsList } = useGetAllTagsQuery() as { data: tagsType[] | undefined };
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>();
  const [jobId, setJobId] = useState<string | undefined>(undefined);
  const [descriptionValues, setDescriptionValues] = useState<string>('')
  const [responsibilityValues, setResponsibilityValues] = useState<string>('')
// console.log(descriptionValues)
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (userEmail?.user?.role === 'Company' && id && companyId && location) {
      const jobData = {
        ...data,
        userId: id,
        companyId,
        biography: descriptionValues,
        responsibilities: responsibilityValues,
        location, // Override form location with companyData.mapLocation
        expiryDate: data.expiryDate, // Ensure date format is compatible
      };
      try {
        const result = await postData(jobData).unwrap();
        if (result?._id) {
          setJobId(result._id);
          setIsModalOpen(true); // Open modal on success
          // Reset the form fields
          Object.keys(data).forEach((key) => setValue(key as keyof Inputs, ''));
          dispatch(removeTag('')); // Clear tags in Redux state
        }
      } catch (error) {
        console.error('Error posting job:', error);
      }
    } else {
      console.log('User role is not Company or missing ID/companyId');
    }
  };

  useEffect(() => {
    setValue('tags', tags); // Sync Redux tags with form
  }, [tags, setValue]);

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const handleViewJobs = (): void => {
    setIsModalOpen(false);
    router.push('/company-dashboard/my-jobs'); // Use router.push for navigation
  };

  const handlePromoteJob = async (promotionType: string | null) => {
    if (!companyId || !jobId || !id || !promotionType) {
      console.warn('Missing required data for promoting job');
      setIsModalOpen(false);
      return;
    }
    try {
      if (promotionType === 'cancel') {
        setIsModalOpen(false);
        router.push('/company-dashboard/my-jobs');
      } else {
        const result = await promotedJobs({ companyId, jobId, id, promotedSystem: promotionType }).unwrap();
        if (result) {
          setIsModalOpen(false);
          console.log('Job promoted successfully:', result);
          router.push('/company-dashboard/my-jobs'); // Redirect on success
        }
      }
    } catch (error) {
      console.error('Error promoting job:', error);
      setIsModalOpen(false); // Close modal on error
    }
  };

  const filterTags = (value: string) => {
    setTimeout(() => {
      const filtered = tagsList?.data?.filter((tag) => tag.name.toLowerCase().includes(value.toLowerCase())) || [];
      setFilteredTags(filtered);
    }, 300);
  };

  const handleTagSelection = (tagName: string) => {
    if (tags.length >= 5) {
      alert('You can only select up to 5 tags');
    } else if (!tags.includes(tagName)) {
      dispatch(addTag(tagName));
      setFilteredTags([]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      const trimmedInput = inputValue.trim();
      const isTagInFilteredList = filteredTags.some((tag) => tag.name.toLowerCase() === trimmedInput.toLowerCase());
      const isTagAlreadyAdded = tags.includes(trimmedInput);
      if (!isTagInFilteredList && !isTagAlreadyAdded && tags.length < 5) {
        dispatch(addTag(trimmedInput));
        setFilteredTags([]);
        setInputValue('');
      } else if (tags.length >= 5) {
        alert('You can only select up to 5 tags');
      } else if (isTagAlreadyAdded) {
        alert('This tag is already added');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Post a job</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Job Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add job title, role, vacancies etc..."
          />
        </div>

        {/* Tags and Job Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="mt-1 w-full border border-gray-300 rounded-sm p-2 flex flex-wrap gap-2 items-center bg-white">
              {tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => dispatch(removeTag(tag))}
                    className="ml-1 text-blue-500 hover:text-blue-700"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                id="tags-input"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  filterTags(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                className="flex-1 border-none p-1 text-sm focus:ring-0 focus:outline-none min-w-[150px]"
                placeholder={tags.length === 0 ? "Job keyword, tags etc..." : ""}
              />
            </div>
            {filteredTags.length > 0 && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
                {filteredTags.map((tag) => (
                  <p
                    key={tag._id}
                    onClick={() => handleTagSelection(tag.name)}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {tag.name}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select
              id="jobRole"
              {...register("jobRole")}
              className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select...</option>
              <option value="Designer">Designer</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>

        {/* Salary */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Salary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="minSalary" className="block text-sm font-medium text-gray-700">
                Min Salary
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  id="minSalary"
                  {...register("minSalary")}
                  className="w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Minimum salary..."
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  USD
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="maxSalary" className="block text-sm font-medium text-gray-700">
                Max Salary
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  id="maxSalary"
                  {...register("maxSalary")}
                  className="w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Maximum salary..."
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  USD
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="salaryType" className="block text-sm font-medium text-gray-700">
                Salary Type
              </label>
              <select
                id="salaryType"
                {...register("salaryType")}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="hourly">Hourly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Advance Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                Education
              </label>
              <select
                id="education"
                {...register("education")}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="High-School">High School</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Bachelor-Degree">Bachelor Degree</option>
                <option value="Graduation">Graduation</option>
                <option value="Master-Degree">Master Degree</option>
                
              </select>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <select
                id="experience"
                {...register("experience")}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="Freshers-">Freshers</option>
                <option value="1-2">1 - 2 Years</option>
                <option value="2-4">2 - 4 Years</option>
                <option value="4-6">4 - 6 Years</option>
                <option value="6-8">6 - 8 Years</option>
                <option value="8-10">8 - 10 Years</option>
                <option value="10-15">10 - 15 Years</option>
                <option value="15+">15+ Years</option>
              </select>


            </div>
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
                Job Type
              </label>
              <select
                id="jobType"
                {...register("jobType")}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="Full-time">Full Time</option>
                <option value="Part-time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
                <option value="Temporary">Temporary</option>
                <option value="Contract-Base">Contract Base</option>
                

              </select>
            </div>
            <div>
              <label htmlFor="jobLevel" className="block text-sm font-medium text-gray-700">
                Job Level
              </label>
              <select
                id="jobLevel"
                {...register("jobLevel")}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="Entry-Level">Entry-Level</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Expert-Level">Expert-Level</option>
              </select>
            </div>
            <div>
              <label htmlFor="vacancies" className="block text-sm font-medium text-gray-700">
                Vacancies
              </label>
              <select
                id="vacancies"
                {...register("vacancies")}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="1">1</option>
                <option value="2-5">2-5</option>
                <option value="5+">5+</option>
              </select>
            </div>
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                id="expiryDate"
                {...register("expiryDate")}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>
        </div>

        {/* Apply Job On */}
        <div className="bg-gray-50 p-4 rounded-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Apply Job on:</h3>
          <div className="flex items-center">
            <label className="flex items-center gap-2 hover:bg-white p-4">
              <input
                type="radio"
                value="on_jobpilot"
                {...register("applyMethod")}
                className="h-5 w-5 text-blue-500"
              />
              <span className="text-sm text-gray-700">
                On Jobpilot
                <p className="text-xs text-gray-500">
                  Candidate will apply using jobpilot & all application show on your dashboard.
                </p>
              </span>
            </label>
            <label className="flex items-center gap-2 hover:bg-white p-4">
              <input
                type="radio"
                value="external_platform"
                {...register("applyMethod")}
                className="h-5 w-5 text-blue-500"
              />
              <span className="text-sm text-gray-700">
                External Platform
                <p className="text-xs text-gray-500">
                  Candidate apply on job using your own website, all application on your website.
                </p>
              </span>
            </label>
            <label className="flex items-center gap-2 hover:bg-white p-4">
              <input
                type="radio"
                value="email"
                {...register("applyMethod")}
                className="h-5 w-5 text-blue-500"
              />
              <span className="text-sm text-gray-700">
                On Your Email
                <p className="text-xs text-gray-500">
                  Candidate apply on job using your email address, all application in your email.
                </p>
              </span>
            </label>
          </div>
        </div>

        {/* Description & Responsibilities */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Description & Responsibility</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
               <ReactQuill
            className="mt-1  rounded-md text-xl block h-56 w-full "
            theme="snow"
            value={descriptionValues}
            placeholder='Add your job description...'
            onChange={(value) => {
              setValue('description', value); // Update the 'description' field in the form
              setDescriptionValues(value); // Update local state
            }}
          />
            
            </div>
            <div className='py-12'>
              <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
               <ReactQuill
            className="mt-1  rounded-md text-xl block h-56 w-full "
            theme="snow"
            value={responsibilityValues}
            placeholder='Add your job responsibilities...'
            onChange={(value) => {
              setValue('description', value); // Update the 'description' field in the form
              setResponsibilityValues(value); // Update local state
            }}
          />
            
            </div>
         
           
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-start">
          <button
            disabled={isCompanyDataLoading || isPostJobLoading}
            type="submit"
            className="bg-[#0A65CC] text-white px-6 py-3 rounded-sm font-semibold cursor-pointer hover:bg-blue-600 flex items-center gap-2"
          >
            {isPostJobLoading
              ? 'Posting...'
              : isModalOpen
              ? 'Complete'
              : 'Post Job'}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </form>
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onViewJobs={handleViewJobs}
        onPromoteJob={handlePromoteJob}
      />
    </div>
  );
};

export default PostAJob;