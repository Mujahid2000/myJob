import React, { useContext, useEffect, useState } from 'react';
import { Calendar, Link, Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon } from 'lucide-react';
import { useGetCompanyProfileQuery } from '@/RTKQuery/companySlice';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './custom.css';


const EmployeeCompanyInfo: React.FC = () => {
   const [value, setValue] = useState(''); // State for ReactQuill content
    const authContext = useContext(AuthContext);
    const currentUser = authContext?.currentUser;
    const { data: userEmail, error: userEmailError } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
    const userId = userEmail?.user?._id || '';
    const email = userEmail?.user?.email || '';
    const {data:companyProfile} = useGetCompanyProfileQuery(userId);
    

    useEffect(() =>{
      if(companyProfile?.companyVision){
        setValue(companyProfile.companyVision)
      }
    },[companyProfile])
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Organization Type, Industry Types, Team Size */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Organization Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ORGANIZATION TYPE
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={companyProfile?.organizationType}
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="startup">Startup</option>
            <option value="corporate">Corporate</option>
            <option value="nonprofit">Nonprofit</option>
          </select>
        </div>
        {/* Industry Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            INDUSTRY TYPES
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue=""
          >
            <option defaultValue={companyProfile?.industryTypes} disabled>
              Select...
            </option>
            <option value="tech">Technology</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
          </select>
        </div>
        {/* Team Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            TEAM SIZE
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue=""
          >
            <option defaultValue={companyProfile?.teamSize} disabled>
              Select...
            </option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
          </select>
        </div>
      </div>

      {/* Year of Establishment, Company Website */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Year of Establishment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YEAR OF ESTABLISHMENT
          </label>
          <div className="relative">
            <input
              type="date"
              defaultValue={companyProfile?.yearEstablished}
              placeholder="mm/dd/yyyy"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* Company Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            COMPANY WEBSITE
          </label>
          <div className="relative">
            <input
            defaultValue={companyProfile?.companyWebsite}
              type="url"
              placeholder="Website url..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Link className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>
      </div>

      {/* Company Vision */}
      <div className="mb-6">
              <label className="block uppercase text-sm font-medium text-gray-700 mb-2">
                Company Vision
              </label>
              <ReactQuill
                className="mt-1 rounded-md text-xl block h-56 w-full"
                theme="snow"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                placeholder="Write down your company here. Let the candidate know who we are..."
              />
            </div>

      {/* Save Button */}
      <div className="flex justify-start pt-16 lg:pt-12">
         <button className="bg-[#0A65CC] text-white px-6 py-3 rounded-sm cursor-pointer hover:bg-blue-500">
          Save Change
        </button>
      </div>
    </div>
  );
};

export default EmployeeCompanyInfo;