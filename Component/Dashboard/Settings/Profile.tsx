'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CirclePlus, CloudUpload, FileText } from 'lucide-react';
import React, { useRef, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { RootState } from '@/Store/Store';
import { useGetResumesQuery, useUploadCvMutation, useUpdateProfileMutation, useGetProfileDataQuery } from '@/RTKQuery/profileApi';
import { setActiveDropdown, setModalOpen } from '@/Store/profileSlice';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { Toaster, toast } from 'sonner';

interface BasicInfoFormData {
  fullName: string;
  title: string;
  experience: string;
  education: string;
  personalWebsite: string;
  profilePicture: FileList;
}

interface CvFormData {
  resumeName: string;
  uploadCv: FileList;
}

const Profile = () => {
  const dispatch = useDispatch();
  const { isModalOpen, activeDropdown } = useSelector((state: RootState) => state.profile);
  const [uploadCvMutation, { isLoading: isUploading, isError, error }] = useUploadCvMutation();
  const [updateProfileMutation, { isLoading: isProfileUploading, isError: isProfileError, error: profileError }] = useUpdateProfileMutation();
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail } = useGetUserByIdQuery(currentUser?.email || '');
  const userId = userEmail?.user?._id;
  const email = userEmail?.user?.email || ''; // Default to empty string if undefined

  const { data: resumes, isLoading: isResumesLoading, error: resumesError } = useGetResumesQuery(email, {
    skip: !email, // Skip query if email is undefined
  });

  const { data: candidateInfo, isLoading: inCandidateLoading } = useGetProfileDataQuery(email, {
    skip: !email, // Skip query if email is undefined
  });

  const getAllResume = resumes?.data || []; // Default to empty array if data is undefined
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCvUploading, setIsCvUploading] = useState(false);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Basic Information Form
  const { control: basicInfoControl, handleSubmit: handleBasicInfoSubmit, reset: resetBasicInfo, formState: { errors: basicInfoErrors } } = useForm<BasicInfoFormData>({
    defaultValues: {
      fullName: candidateInfo?.fullName || '',
      title: candidateInfo?.title || '',
      experience: candidateInfo?.experience || '',
      education: candidateInfo?.education || '',
      personalWebsite: candidateInfo?.portfolio || '',
      profilePicture: undefined,
    },
  });

  // CV Upload Form (Modal)
  const { control: cvControl, handleSubmit: handleCvSubmit, reset: resetCv, formState: { errors: cvErrors } } = useForm<CvFormData>({
    defaultValues: {
      resumeName: '',
      uploadCv: undefined,
    },
  });



  const onBasicInfoSubmit = async (data: BasicInfoFormData) => {
    const profilePicture = data.profilePicture?.[0];
    try {
      await updateProfileMutation({
        fullName: data.fullName,
        title: data.title,
        experience: data.experience,
        education: data.education,
        portfolio: data.personalWebsite,
        profilePicture: profilePicture || undefined,
        userId: userId || '',
        email: email || '',
      }).unwrap();
      toast.success('Profile updated successfully!');
      resetBasicInfo();
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile.');
    }
  };

  const onCvSubmit = async (data: CvFormData) => {
    const file = data.uploadCv[0];
    if (file && data.resumeName) {
      try {
        const result = await uploadCvMutation({ resumeName: data.resumeName, userId: userId || '', email: email || '', file }).unwrap();
        toast.success(result.message || 'CV uploaded successfully!');
        dispatch(setModalOpen(false));
        resetCv();
        setSelectedFile(null);
      } catch (err) {
        console.error('Upload failed:', err);
        toast.error('Failed to upload CV.');
      }
    } else {
      toast.error('Please fill all fields.');
    }
  };

  return (
    <div className="p-6 min-h-screen max-w-5xl mx-auto">
      {/* Basic Information Section */}
      <form className="mb-8" onSubmit={handleBasicInfoSubmit(onBasicInfoSubmit)}>
        <h2 className="text-xl font-semibold">BASIC INFORMATION</h2>
        <div className="rounded-lg pt-3 max-h-screen bg-white">
          <h1 className="py-2">Profile Picture</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div className="flex relative max-h-[230px] flex-col border-2 border-dashed border-gray-300 rounded-lg items-center relative">
              {imagePreview || candidateInfo?.profilePicture ? (
                <>
                  <img
                    id="image-preview"
                    src={imagePreview || candidateInfo?.profilePicture}
                    alt="Preview"
                    className="w-full h-full rounded-lg flex md:absolute"
                  />
                  {
                    !candidateInfo?.profilePicture ?  <button
                    id="remove-image"
                    type="button"
                    className="absolute cursor-pointer top-0 right-0 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs"
                    onClick={() => {
                      setImagePreview(null);
                      basicInfoControl._formValues.profilePicture = undefined;
                    }}
                  >
                    ✕
                  </button> : ''
                  }
                 
                </>
              ) : (
                <>
                  <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
                    <Controller
                      name="profilePicture"
                      control={basicInfoControl}
                      rules={{
                        validate: {
                          fileSize: (files: FileList) => {
                            const file = files?.[0];
                            return !file || file.size <= 3 * 1024 * 1024 ? true : 'File size exceeds 3 MB';
                          },
                        },
                      }}
                      render={({ field: { onChange } }) => (
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 3 * 1024 * 1024) {
                                toast.error('File size exceeds the maximum limit of 3 MB.');
                              } else {
                                setImagePreview(URL.createObjectURL(file));
                                onChange(e.target.files);
                              }
                            }
                          }}
                        />
                      )}
                    />
                    <CloudUpload size={44} className="text-gray-400" />
                  </div>
                  <p className="text-sm relative text-gray-500 mt-2 text-center">
                    BROWSE PHOTO or drop here
                  </p>
                  <p className="text-xs relative text-gray-400 text-center">
                    A photo larger than 400 pixels works best. Max photo size 3 MB
                  </p>
                </>
              )}
              {basicInfoErrors.profilePicture && (
                <p className="text-red-500 text-sm">{basicInfoErrors.profilePicture.message}</p>
              )}
            </div>

            <div className="col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    FULL NAME
                  </label>
                  <Controller
                    name="fullName"
                    control={basicInfoControl}
                    rules={{ required: 'Full name is required' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder={candidateInfo?.fullName ? candidateInfo.fullName : 'Type your Full Name'}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  />
                  {basicInfoErrors.fullName && (
                    <p className="text-red-500 text-sm">{basicInfoErrors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    TITLE/HEADLINE
                  </label>
                  <Controller
                    name="title"
                    control={basicInfoControl}
                    rules={{ required: 'Title/headline is required' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder={candidateInfo?.title ? candidateInfo.title : 'Title/Headline...'}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  />
                  {basicInfoErrors.title && (
                    <p className="text-red-500 text-sm">{basicInfoErrors.title.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    EXPERIENCE
                  </label>
                  <Controller
                    name="experience"
                    control={basicInfoControl}
                    rules={{ required: 'Experience is required' }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select...</option>
                        <option value="Less than 1 year">Less than 1 year</option>
                        <option value="1 year">1 year</option>
                        <option value="2 year">2 year</option>
                        <option value="3 year">3 year</option>
                        <option value="5 year">5 year</option>
                      </select>
                    )}
                  />
                  {basicInfoErrors.experience && (
                    <p className="text-red-500 text-sm">{basicInfoErrors.experience.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    EDUCATION
                  </label>
                  <Controller
                    name="education"
                    control={basicInfoControl}
                    rules={{ required: 'Education is required' }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select...</option>
                        <option value="S.S.C">S.S.C</option>
                        <option value="H.S.C">H.S.C</option>
                        <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                        <option value="M.S.C">M.S.C</option>
                      </select>
                    )}
                  />
                  {basicInfoErrors.education && (
                    <p className="text-red-500 text-sm">{basicInfoErrors.education.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PERSONAL WEBSITE
                </label>
                <Controller
                  name="personalWebsite"
                  control={basicInfoControl}
                  rules={{ required: 'Personal website is required' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                     
                      placeholder={candidateInfo?.portfolio ? candidateInfo.portfolio : '🔗 Website url...'}
                      className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  )}
                />
                {basicInfoErrors.personalWebsite && (
                  <p className="text-red-500 text-sm">{basicInfoErrors.personalWebsite.message}</p>
                )}
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  className="bg-[#0A65CC] text-white px-6 py-3 hover:bg-blue-700"
                  disabled={isProfileUploading}
                >
                  {isProfileUploading ? 'Saving...' : 'SAVE CHANGES'}
                </Button>
                {isProfileError && <p className="text-red-500 text-sm mt-2">Error: {profileError?.toString()}</p>}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Your CV/Resume Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">YOUR CV/RESUME</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getAllResume?.map((resume: any) => (
            <div key={resume._id} className="border rounded-sm p-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">
                    <FileText />
                  </span>
                  <div>
                    <p className="font-medium">{resume.resumeName}</p>
                    <p className="text-sm text-gray-500">
                      {resume?.size
                        ? resume.size >= 1024
                          ? `${(resume.size / 1024).toFixed(2)} MB`
                          : `${resume.size.toFixed(2)} KB`
                        : ''}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    aria-label="More options"
                    className="text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={() =>
                      dispatch(setActiveDropdown(activeDropdown === parseInt(resume._id) ? null : parseInt(resume._id)))
                    }
                  >
                    ⋯
                  </button>
                  {activeDropdown === parseInt(resume._id) && (
                    <div
                      ref={(el) => {
                        dropdownRefs.current[resume._id] = el;
                      }}
                      className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10"
                    >
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          dispatch(setModalOpen(true));
                          dispatch(setActiveDropdown(null));
                        }}
                      >
                        Edit Resume
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={() => {
                          console.log(`Delete resume ${resume._id}`);
                          dispatch(setActiveDropdown(null));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* CV/Resume Add Button */}
          <div className="border p-4 rounded-sm">
            <div onClick={() => dispatch(setModalOpen(true))} className="cursor-pointer">
              <button className="flex items-center cursor-pointer text-blue-600">
                <span className="px-2">
                  <CirclePlus />
                </span>
                <p className="text-black font-medium cursor-pointer">Add CV/Resume</p>
              </button>
              <p className="text-xs text-gray-400 mt-1 cursor-pointer">
                Click to add a CV/Resume, only .pdf
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className={`${
          isModalOpen ? 'visible' : 'invisible'
        } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
      >
        <div
          className={`${
            isModalOpen ? 'scale-[1] opacity-100' : 'scale-[0] opacity-0'
          } w-[27%] rounded-lg transition-all duration-300 mx-auto mt-8`}
        >
          <form
            className="max-w-lg p-6 bg-white rounded-lg space-y-6"
            onSubmit={handleCvSubmit(onCvSubmit)}
          >
            <h2 className="text-xl font-semibold">Add CV/Resume</h2>

            {/* Resume Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CV/Resume Name
              </label>
              <Controller
                name="resumeName"
                control={cvControl}
                rules={{ required: 'Resume name is required' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter resume name"
                    className="rounded-sm"
                  />
                )}
              />
              {cvErrors.resumeName && (
                <p className="text-red-500 text-sm">{cvErrors.resumeName.message}</p>
              )}
            </div>

            {/* File Upload */}
            <div className="border-2 border-dashed py-5">
              <Controller
                name="uploadCv"
                control={cvControl}
                rules={{
                  required: 'Please upload a CV',
                  validate: {
                    fileType: (files: FileList) => {
                      const file = files?.[0];
                      return file && file.type === 'application/pdf' ? true : 'Please upload a PDF file';
                    },
                    fileSize: (files: FileList) => {
                      const file = files?.[0];
                      return file && file.size <= 5 * 1024 * 1024 ? true : 'File size exceeds 5 MB';
                    },
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <div className="text-center">
                    {value && value[0] ? (
                      <div className="flex items-center justify-between px-4">
                        <p className="text-sm text-gray-700">
                          {value[0].name} (
                          {(value[0].size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => onChange(undefined)}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <>
                        <label
                          htmlFor="cv-upload"
                          className="cursor-pointer flex flex-col items-center justify-center"
                        >
                          <CloudUpload size={44} className="text-gray-400" />
                          <p className="text-sm text-gray-500 mt-2">
                            BROWSE PDF or drop here
                          </p>
                          <p className="text-xs text-gray-400">
                            Max file size 5 MB, only .pdf
                          </p>
                        </label>
                        <input
                          id="cv-upload"
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => onChange(e.target.files)}
                        />
                      </>
                    )}
                  </div>
                )}
              />
              {cvErrors.uploadCv && (
                <p className="text-red-500 text-sm">{cvErrors.uploadCv.message}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  dispatch(setModalOpen(false));
                  resetCv();
                  setSelectedFile(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="hover:bg-[#D6E7FB] cursor-pointer bg-[#0A65CC] hover:text-[#0A65CC] text-white w-[13rem] px-[2rem] py-[1rem] rounded-none"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Add Cv/Resume →'}
              </Button>
            </div>
            {isError && <p className="text-red-500 text-sm">Error: {error?.toString()}</p>}
          </form>
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default Profile;