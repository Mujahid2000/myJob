'use client';

import { AuthContext } from "@/Authentication/AuthContext";
import { useGetUserByIdQuery } from "@/RTKQuery/authSlice";
import { usePostFounderInfoMutation } from "@/RTKQuery/FoundingInfoReducers";
import {
  setRenderState,
} from "@/Store/accountSetupTabs";
import {
  resetForm,
  setCompanyVision,
  setCompanyWebsite,
  setIndustryTypes,
  setOrganizationType,
  setTeamSize,
  setYearOfEstablishment,
} from "@/Store/foundingInfoSlice";
import { RootState } from "@/Store/Store";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';


interface Inputs {
  organizationType: string;
  industryTypes: string;
  teamSize: string;
  yearOfEstablishment: string;
  companyWebsite: string;
  companyVision: string;
}

export default function FoundingInfo() {
  const dispatch = useDispatch();
  const {
    organizationType,
    industryTypes,
    teamSize,
    yearOfEstablishment,
    companyWebsite,
    companyVision,
  } = useSelector((state: RootState) => state.foundingInfo);

  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail } = useGetUserByIdQuery(currentUser?.email || '', {
    skip: !currentUser?.email,
  });
  const userId = userEmail?.user?._id;

  const [postFounderInfo, { isLoading, error }] = usePostFounderInfoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    defaultValues: {
      organizationType,
      industryTypes,
      teamSize,
      yearOfEstablishment,
      companyWebsite,
      companyVision,
    },
  });

  const [descriptionValues, setDescriptionValues] = useState<string>(companyVision || '');

  // Sync Redux state with form
  useEffect(() => {
    setValue('companyVision', descriptionValues);
  }, [descriptionValues, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!userId) {
      alert('User ID is required!');
      return;
    }

    try {
      dispatch(setOrganizationType(data.organizationType));
      dispatch(setIndustryTypes(data.industryTypes));
      dispatch(setTeamSize(data.teamSize));
      dispatch(setYearOfEstablishment(data.yearOfEstablishment));
      dispatch(setCompanyWebsite(data.companyWebsite));
      dispatch(setCompanyVision(data.companyVision));

      await postFounderInfo({
        userId,
        ...data,
      }).unwrap();

      dispatch(resetForm());
      dispatch(setRenderState('Social Media Profile'));
    } catch (err) {
      console.error('Failed to update founding info:', err);
      alert('Failed to update founding info!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {/* Organization Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Organization Type</label>
          <select
            {...register('organizationType', { required: 'Organization Type is required' })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select...</option>
            <option value="Government Agency">Government Agency</option>
            <option value="Nonprofit Organization">Semi Government</option>
            <option value="Nonprofit Organization">NGO</option>
            <option value="Nonprofit Organization">Private Company</option>
            <option value="Nonprofit Organization">International Agencies </option>
            <option value="Partnership">Others</option>
          </select>
          {errors.organizationType && (
            <p className="text-red-500 text-sm mt-1">{errors.organizationType.message}</p>
          )}
        </div>

        {/* Industry Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Industry Types</label>
          <select
            {...register('industryTypes', { required: 'Industry Type is required' })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select...</option>
            <option value="Technology Industry">Technology Industry</option>
            <option value="Service Industry">Service Industry</option>
          </select>
          {errors.industryTypes && (
            <p className="text-red-500 text-sm mt-1">{errors.industryTypes.message}</p>
          )}
        </div>

        {/* Team Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Team Size</label>
          <select
            {...register('teamSize', { required: 'Team Size is required' })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select...</option>
            <option value="Small Team (3–5 members)">Small Team (3–5 members)</option>
            <option value="Medium Team (6–15 members)">Medium Team (6–15 members)</option>
            <option value="Large Team (16+ members)">Large Team (16+ members)</option>
          </select>
          {errors.teamSize && (
            <p className="text-red-500 text-sm mt-1">{errors.teamSize.message}</p>
          )}
        </div>
      </div>

      {/* Establishment Year & Website */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Year of Establishment</label>
          <input
            type="date"
            {...register('yearOfEstablishment', {
              required: 'Year of Establishment is required',
              validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                return selectedDate <= today || 'Date cannot be in the future';
              },
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            min="1900-01-01"
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.yearOfEstablishment && (
            <p className="text-red-500 text-sm mt-1">{errors.yearOfEstablishment.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Website</label>
          <input
            type="url"
            {...register('companyWebsite', {
              required: 'Company Website is required',
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: 'Please enter a valid URL',
              },
            })}
            placeholder="https://example.com"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.companyWebsite && (
            <p className="text-red-500 text-sm mt-1">{errors.companyWebsite.message}</p>
          )}
        </div>
      </div>

      {/* Company Vision */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Company Vision</label>
        <ReactQuill
          className="mt-1 rounded-md text-xl block h-56 w-full"
          theme="snow"
          value={descriptionValues}
          onChange={(value) => {
            setDescriptionValues(value);
            setValue('companyVision', value);
          }}
          placeholder="Add your company vision..."
        />
      </div>

      {/* Buttons */}
      <div className="lg:mt-15 flex justify-between">
        <button
          type="button"
          onClick={() => dispatch(setRenderState('Company Info'))}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
        >
          Previous
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2  bg-[#0A65CC] text-white rounded-md hover:bg-blue-700 flex items-center space-x-2 disabled:bg-gray-400"
        >
          <span>{isLoading ? 'Saving...' : 'Save & Next'}</span>
          {!isLoading && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 mt-2">
          {'data' in error ? (error.data as any)?.message : 'An error occurred'}
        </p>
      )}
    </form>
  );
}
