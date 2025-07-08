'use client';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useGetCompanyDataQuery, useJobPostPromotedMutation, usePostAJobMutation } from '@/RTKQuery/JobPostSliceApi';
import { useGetAllTagsQuery } from '@/RTKQuery/TagsApi';
import { RootState } from '@/Store/Store';
import { addTag, removeTag } from '@/Store/TagStateSlice';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
const SuccessModal = dynamic(() => import('@/Component/Employee-Dashboard/postajob/SuccessModal'), { ssr: false });

import 'react-quill-new/dist/quill.snow.css';
import './custom.css';
import 'ldrs/react/Ring.css'
import dynamic from 'next/dynamic';
import { toast, Toaster } from 'sonner';
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
  location?: string;
  biography?: string; // Added for better form handling
  responsibilities?: string; // Added for better form handling
};

interface tagsType {
  _id: string;
  name: string;
}

const PostAJob: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useDispatch();
  const { tags } = useSelector((state: RootState) => state.SelectedTag);
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail } = useGetUserByIdQuery(currentUser?.email || '', {
    skip: !currentUser?.email,
  });
  const id = userEmail?.user?._id;
  const { data: companyData, isLoading: isCompanyDataLoading } = useGetCompanyDataQuery(id || '', {
    skip: !id,
  });
  const [promotedJobs, { isLoading: isPromotedLoading }] = useJobPostPromotedMutation();
  const companyId = companyData?._id;
  const location = companyData?.mapLocation;
  const [postData, { isLoading: isPostJobLoading }] = usePostAJobMutation();
  const [filteredTags, setFilteredTags] = useState<tagsType[]>([]);
  const { data: tagsList } = useGetAllTagsQuery();
  const taglist = tagsList?.data;
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>();
  const [jobId, setJobId] = useState<string | undefined>(undefined);
  const [descriptionValues, setDescriptionValues] = useState<string>('');
  const [responsibilityValues, setResponsibilityValues] = useState<string>('');
  

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (userEmail?.user?.role !== 'Company' || !id || !companyId || !location) {
      // console.log('User role is not Company or missing ID/companyId/location');
      alert('User is not authorized or missing required data.');
      return;
    }

    const jobData = {
      ...data,
      userId: id,
      companyId,
      biography: descriptionValues || '',
      responsibilities: responsibilityValues || '',
      location,
      expiryDate: data.expiryDate,
      status: 'active', // Added as required by PostJobRequest
      minSalary: Number(data.minSalary) || 0, // Convert to number as required by PostJobRequest
      maxSalary: Number(data.maxSalary) || 0, // Convert to number as required by PostJobRequest
    };

    try {
      const result = await postData(jobData).unwrap();
      if(result.message) {
        toast.success(result.message)
      }
      if (result?.data._id) {
        setJobId(result.data._id);
        setIsModalOpen(true);
        Object.keys(data).forEach((key) => setValue(key as keyof Inputs, ''));
        dispatch(removeTag('')); // Consider revising this to clear all tags
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    }
  };

  useEffect(() => {
    setValue('tags', tags);
  }, [tags, setValue]);

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const handleViewJobs = (): void => {
    setIsModalOpen(false);
    router.push('/company-dashboard/my-jobs');
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
        const result = await promotedJobs({
          userId: id,
          jobId,
          companyId,
          promotedSystem: promotionType,
        }).unwrap();
        if (result) {
          setIsModalOpen(false);
          console.log('Job promoted successfully:', result);
          router.push('/company-dashboard/my-jobs');
        }
      }
    } catch (error) {
      console.error('Error promoting job:', error);
      alert('Failed to promote job. Please try again.');
      setIsModalOpen(false);
    }
  };

  const filterTags = (value: string) => {
    setTimeout(() => {
      const filtered = taglist?.filter((tag) => tag.name.toLowerCase().includes(value.toLowerCase())) || [];
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
            {...register("title", { required: "Job title is required" })}
            className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add job title, role, vacancies etc..."
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
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
              {...register("jobRole", { required: "Job type is required" })}
              className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select...</option>
              <option value="Designer">Designer</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
            </select>
            {errors.jobRole && <p className="text-red-500 text-xs mt-1">{errors.jobRole.message}</p>}
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
                  {...register("minSalary", { required: "Minimum salary is required" })}
                  className="w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Minimum salary..."
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  USD
                </span>
              </div>
              {errors.minSalary && <p className="text-red-500 text-xs mt-1">{errors.minSalary.message}</p>}
            </div>
            <div>
              <label htmlFor="maxSalary" className="block text-sm font-medium text-gray-700">
                Max Salary
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  id="maxSalary"
                  {...register("maxSalary", { required: "Maximum salary is required" })}
                  className="w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Maximum salary..."
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  USD
                </span>
              </div>
              {errors.maxSalary && <p className="text-red-500 text-xs mt-1">{errors.maxSalary.message}</p>}
            </div>
            <div>
              <label htmlFor="salaryType" className="block text-sm font-medium text-gray-700">
                Salary Type
              </label>
              <select
                id="salaryType"
                {...register("salaryType", { required: "Salary type is required" })}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="hourly">Hourly</option>
              </select>
              {errors.salaryType && <p className="text-red-500 text-xs mt-1">{errors.salaryType.message}</p>}
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
                {...register("education", { required: "Education level is required" })}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="High-School">High School</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Bachelor-Degree">Bachelor Degree</option>
                <option value="Graduation">Graduation</option>
                <option value="Master-Degree">Master Degree</option>
              </select>
              {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education.message}</p>}
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <select
                id="experience"
                {...register("experience", { required: "Experience level is required" })}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="Freshers">Freshers</option>
                <option value="1-2">1 - 2 Years</option>
                <option value="2-4">2 - 4 Years</option>
                <option value="4-6">4 - 6 Years</option>
                <option value="6-8">6 - 8 Years</option>
                <option value="8-10">8 - 10 Years</option>
                <option value="10-15">10 - 15 Years</option>
                <option value="15+">15+ Years</option>
              </select>
              {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
            </div>
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
                Job Type
              </label>
              <select
                id="jobType"
                {...register("jobType", { required: "Job type is required" })}
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
              {errors.jobType && <p className="text-red-500 text-xs mt-1">{errors.jobType.message}</p>}
            </div>
            <div>
              <label htmlFor="jobLevel" className="block text-sm font-medium text-gray-700">
                Job Level
              </label>
              <select
                id="jobLevel"
                {...register("jobLevel", { required: "Job level is required" })}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="Entry-Level">Entry-Level</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Expert-Level">Expert-Level</option>
              </select>
              {errors.jobLevel && <p className="text-red-500 text-xs mt-1">{errors.jobLevel.message}</p>}
            </div>
            <div>
              <label htmlFor="vacancies" className="block text-sm font-medium text-gray-700">
                Vacancies
              </label>
              <select
                id="vacancies"
                {...register("vacancies", { required: "Number of vacancies is required" })}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="1">1</option>
                <option value="2-5">2-5</option>
                <option value="5+">5+</option>
              </select>
              {errors.vacancies && <p className="text-red-500 text-xs mt-1">{errors.vacancies.message}</p>}
            </div>
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                id="expiryDate"
                {...register("expiryDate", { required: "Expiry date is required" })}
                className="mt-1 w-full border border-gray-300 rounded-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="DD/MM/YYYY"
              />
              {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate.message}</p>}
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
                {...register("applyMethod", { required: "Application method is required" })}
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
          {errors.applyMethod && <p className="text-red-500 text-xs mt-1">{errors.applyMethod.message}</p>}
        </div>

        {/* Description & Responsibilities */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Description & Responsibility</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <ReactQuill
                className="mt-1 rounded-md text-xl block h-56 w-full"
                theme="snow"
                value={descriptionValues}
                placeholder="Add your job description..."
                onChange={(value) => {
                  setValue('description', value);
                  setDescriptionValues(value);
                }}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>
            <div className="py-12">
              <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
              <ReactQuill
                className="mt-1 rounded-md text-xl block h-56 w-full"
                theme="snow"
                value={responsibilityValues}
                placeholder="Add your job responsibilities..."
                onChange={(value) => {
                  setValue('responsibilities', value); // Fixed to set 'responsibilities' instead of 'description'
                  setResponsibilityValues(value);
                }}
              />
              {errors.responsibilities && <p className="text-red-500 text-xs mt-1">{errors.responsibilities.message}</p>}
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
      <Toaster richColors/>
    </div>
  );
};

export default PostAJob;