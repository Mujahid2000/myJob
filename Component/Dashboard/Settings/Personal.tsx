import React, { useContext, useState } from "react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useForm, SubmitHandler } from "react-hook-form";
import './custom.css'
import { usePostCandidatePersonalDataMutation } from "@/RTKQuery/CandidateInfo";
import { toast, Toaster } from "sonner";
import { AuthContext } from "@/Authentication/AuthContext";
import { useGetUserByIdQuery } from "@/RTKQuery/authSlice";

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
        toast.success("Personal data saved successfully!");
      } else if ('error' in result && result.error) {
        toast.error("Failed to save changes. Please try again.");
      }
      console.log(result);
    } catch (error) {
      console.error("Error submitting personal data:", error);
      toast.error("Failed to save changes. Please try again.");
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
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
         <Toaster richColors />
      </form>
    );
  };
  
  export default Personal;