'use client'
import { AuthContext } from '@/Authentication/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useGetResumesQuery } from '@/RTKQuery/profileApi';
import { openModal } from '@/Store/ModalSlice';
import { AppDispatch, RootState } from '@/Store/Store';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'sonner';
import { usePostJobApplyDataMutation } from '@/RTKQuery/JobApplyApiSlice';

type Inputs = {
  resume_id: string,
  coverLetter: string,

};



const Modal: React.FC = () => {
      const dispatch = useDispatch<AppDispatch>();
      const authContext = useContext(AuthContext);
      const currentUser = authContext?.currentUser;
      const { data: userEmail, error: userEmailError } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
      const userId = userEmail?.user?._id || '';
      const email = userEmail?.user?.email || '';
      const [postAppliedJobs, {isLoading: applieLoading}] =usePostJobApplyDataMutation()
     
       const { data: resumes, isLoading: isResumesLoading, error: resumesError } = useGetResumesQuery(email, {
          skip: !email, // Skip query if email is undefined
        });
        const userResume = resumes?.data;
       
    const {jobId, value} = useSelector((state: RootState) => state.modal)
    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: { resume_id: '', coverLetter: '' },
  });
    



  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (!data.resume_id || !data.coverLetter) {
        toast.error('Something went wrong');
        reset();
        dispatch(openModal({ value: false, jobId }));
        return;
      }
      const applyData = {
        jobId,
        userId,
        email,
        resume_Id: data.resume_id,
        coverLetter: data.coverLetter,
      };
      const result = await postAppliedJobs(applyData).unwrap();
      if (result?.message === 'Job application submitted successfully.') {
        toast.success(result?.message || 'Failed to apply for job');
      } else if (result?.message === 'You have already applied for this job.') {
        toast.error(result.message);
      }
      reset();
      dispatch(openModal({ value: false, jobId }));
    } catch (error: any) {
      toast.error(error?.data?.message || 'An error occurred');
      reset();
      dispatch(openModal({ value: false, jobId }));
    }
  };

     const handleOpen = () => {
    dispatch(openModal({ value: false, jobId }))
  }
  
    return (
        <div>
            <div
            className={`${
                value ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a]  transition-all duration-300 flex items-center justify-center`}
        >
            <div 
                className={`${
                    value
                        ? " scale-[1] opacity-100"
                        : " scale-[0] opacity-0"
                } w-[27%]  rounded-lg transition-all duration-300 mx-auto mt-8`}
            >
                
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg p-6 bg-white rounded-lg  space-y-6">
      <h2 className="text-xl font-semibold">Apply Job: Senior UX Designer</h2>

      {/* Resume Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Choose Resume</label>
        <fieldset>
  <div className="relative border border-gray-300 text-gray-800 bg-white ">
    <label htmlFor="frm-whatever" className="sr-only">My field</label>
    <select {...register('resume_id', { required: 'Resume is required' })} className="appearance-none w-full py-1 px-2 bg-white" >
        <option value="">Select&hellip;</option>
              {
                userResume?.map((res: { _id: string; resumeName: string })=>(
                  <option key={res._id}  value={res._id} >{res.resumeName}</option>
                ))
              }
     
    </select>
    <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
    </div>
</div>
    </fieldset>
      </div>

      {/* Cover Letter */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
        <Textarea 
        {...register('coverLetter', { required: 'Cover letter is required' })}
          placeholder="Write down your biography here. Let the employers know who you are..." 
          className="mt-1 h-28 w-full" 
           
        />
{errors.coverLetter && <p className="text-red-600 text-sm mt-1">{errors.coverLetter.message}</p>}
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button  onClick={handleOpen} type="button" variant="outline">Cancel</Button>
        <Button type='submit' className='hover:bg-[#D6E7FB] cursor-pointer bg-[#0A65CC] hover:text-[#0A65CC] text-white w-[13rem] px-[2rem] py-[1rem] rounded-none'>
              Apply Now →
            </Button>
      </div>
    </form>
                
            </div>
        </div>
        </div>
    );
};

export default Modal;