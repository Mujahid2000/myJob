import React, { useContext, useState } from "react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useForm, SubmitHandler } from "react-hook-form";
import './custom.css'
import { usePostCandidatePersonalDataMutation } from "@/RTKQuery/CandidateInfo";
import { AuthContext } from "@/Authentication/AuthContext";
import { useGetUserByIdQuery } from "@/RTKQuery/authSlice";
import { useToast } from "@/Component/Toast/ToastNotification";

type Inputs = {
  country: string,
  dateOfBirth: string,
  gender: string,
  maritalStatus: string,
  education: string,
  experience: string,

};

// components/settings/Personal.tsx
const Personal: React.FC = () => {

  const [biography, setBiography] = useState<string>();
  const [createPersonalData, { data, error, isLoading }] = usePostCandidatePersonalDataMutation()
  const authContext = useContext(AuthContext);
  const { addToast } = useToast();
    const currentUser = authContext?.currentUser;
    const { data: userEmail } = useGetUserByIdQuery(currentUser?.email || '');
    const userId = userEmail?.user?._id;
    const email = userEmail?.user?.email || ''; // Default to empty string if undefined
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    if (!userId) {
      alert("User ID is missing. Please try again later.");
      return;
    }
    const sendData = { ...data, biography: biography ?? "", userId, email };
    try {
      const result = await createPersonalData(sendData);
      if ('data' in result && result.data) {
        setBiography('')
        //if result get successfully then empty the form 
        reset({
          country: "",
          dateOfBirth: "",
          gender: "",
          maritalStatus: "",
          education: "",
          experience: "",
        })
        addToast("Personal data saved successfully!", 'success');
      } else if ('error' in result && result.error) {
        addToast("Failed to save changes. Please try again.",'error');
      }
      console.log(result);
    } catch (error) {
      console.error("Error submitting personal data:", error);
      addToast("Failed to save changes. Please try again.",'error');
    }
  };


    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-9 py-6 bg-white h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nationality
            </label>
            <select {...register("country", { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Bangladeshi</option>
              <option>United States</option>
              <option>Nepal</option>
            </select>
          </div>
          <div>
            <label className="block pb-1 text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input {...register("dateOfBirth", { required: true })} type="date" className="w-full border border-gray-300 py-2 px-2 rounded-sm"/>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select {...register("gender", { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select {...register("maritalStatus", { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
              <option>Single</option>
              <option>Married</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Education
            </label>
            <select {...register("education", { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
              <option>S.S.C</option>
              <option>H.S.C</option>
              <option>C.S.E</option>
              <option>M.S.C</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <select {...register("experience", { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
              <option>Less than 1 Year</option>
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3 Years</option>
              <option>5 Years</option>
            </select>
          </div>
        </div>
       <div className=''>
                     <label className="block text-sm font-medium text-gray-700 pb-2">Biography</label>
                      <ReactQuill
                   className="mt-1  rounded-md text-xl block h-56 w-full "
                   theme="snow"
                   value={biography}
                   placeholder='Add your job responsibilities...'
                   onChange={(value) => {
                     setBiography(value); // Update local state
                   }}
                 />
                   
                   </div>
        <button type="submit" className="bg-[#0A65CC] flex text-white px-3 items-center py-2 mt-18 rounded hover:bg-blue-700">
          Save Changes
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
         
      </form>
    );
  };
  
  export default Personal;