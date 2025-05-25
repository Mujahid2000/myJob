'use client';

import { setRenderState } from '@/Store/accountSetupTabs';
import { MoveRight } from 'lucide-react';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { usePostContactInfoMutation } from '@/RTKQuery/contact';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { toast } from 'react-toastify';


interface Inputs {
  mapLocation: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
}

export default function Contact() {
  const [postContactInfo, { isLoading }] = usePostContactInfoMutation();
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail, isLoading: isUserLoading, error: userError } = useGetUserByIdQuery(
    currentUser?.email || '',
    {
      skip: !currentUser?.email,
    }
  );
  const userId = userEmail?.user?._id;


  const [mapLocation, setMapLocation] = useState<string>('');


  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setMapLocation(`${lat},${long}`);
        toast.success('Location fetched successfully!');
      },
      (error) => {
        toast.error('Failed to get location: ' + error.message);
      }
    );
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      mapLocation: '',
      email: currentUser?.email || '',
      phoneNumber: '',
      countryCode: '+880',
    },
  });


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!userId) {
      toast.error('User ID is required!');
      return;
    }

    const mobileNumber = `${data.countryCode}${data.phoneNumber}`;
    const formData = {
      userId,
      mapLocation: data.mapLocation || mapLocation,
      email: data.email,
      phoneNumber: mobileNumber,
    };

    try {
      await postContactInfo(formData).unwrap();
      toast.success('Contact info submitted successfully!');
      dispatch(setRenderState('success'));
    } catch (error: any) {
      toast.error('Failed to submit contact info: ' + (error.data?.message || error.message));
    }
  };


  if (isUserLoading) {
    return <div>Loading user data...</div>;
  }



  return (
    <div className="py-6 px-3 bg-white rounded-lg max-w-7xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ম্যাপ লোকেশন */}
        <div>
          <label htmlFor="mapLocation" className="block text-sm font-medium text-gray-700">
            Map Location
          </label>
          <div className="flex border border-gray-300 rounded-md">
            <input
              id="mapLocation"
              type="text"
              {...register('mapLocation')}
              value={mapLocation}
              onChange={(e) => setMapLocation(e.target.value)}
              placeholder="Enter coordinates (e.g., 23.123,90.456) / City, Country Name"
              className="mt-1 p-2 block w-full focus:outline-none"
            />
            <button
              type="button"
              onClick={getLocation}
              className="text-sm cursor-pointer text-gray-600 font-medium w-30 bg-gray-300 px-3"
              disabled={isLoading}
            >
              Get Location
            </button>
          </div>
          {errors.mapLocation && (
            <p className="mt-1 text-sm text-red-600">{errors.mapLocation.message}</p>
          )}
        </div>

        {/* ফোন নম্বর */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <div className="flex border border-gray-300 rounded-md items-center">
            <select
              id="countryCode"
              {...register('countryCode', { required: 'Country code is required' })}
              className="p-2 focus:outline-none text-gray-600"
            >
              <option value="+880">🇧🇩 +880</option>
              <option value="+92">🇵🇰 +92</option>
              <option value="+60">🇲🇾 +60</option>
              <option value="+90">🇹🇷 +90</option>
            </select>
            <input
              id="phoneNumber"
              type="text"
              {...register('phoneNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Enter a valid 10-digit phone number',
                },
              })}
              placeholder="Enter 10-digit number"
              className="w-full border-none rounded-sm py-2 px-3 focus:outline-none"
            />
          </div>
          {errors.countryCode && (
            <p className="mt-1 text-sm text-red-600">{errors.countryCode.message}</p>
          )}
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* ইমেইল */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="flex items-center mt-1">
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
              placeholder="Enter email address"
              className="block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* বাটন */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => dispatch(setRenderState('Social Media Profile'))}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
            disabled={isLoading}
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-7 py-2 bg-[#0A65CC] text-white rounded-md hover:bg-blue-700 flex items-center space-x-2 disabled:bg-gray-400"
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <>
                <span>Finish Editing</span>
                <MoveRight />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}