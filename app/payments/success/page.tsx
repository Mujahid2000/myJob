
'use client';

import { useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setDisableSideBar } from '@/Store/DisableSidebar';
import Link from 'next/link';
import { useGetSubscriptionDataByUserIdQuery } from '@/RTKQuery/SubscriptionDataByUserId';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { BriefcaseBusiness } from 'lucide-react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

const Success: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail } = useGetUserByIdQuery(currentUser?.email || '', {
    skip: !currentUser?.email,
  });
  const userId = userEmail?.user?._id || '';
  const pathName = usePathname();

  // Fetch subscription data, skip if userId is undefined
  const { data: subscriptionData, isLoading, error: subscriptionError } = useGetSubscriptionDataByUserIdQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if (pathName === '/company-dashboard/Post-a-Job/success') {
      dispatch(setDisableSideBar({ isDisabled: true }));
    }
  }, [pathName, dispatch]);

  // Get the latest subscription record (last index after sorting by createdAt)
  const latestSubscription = subscriptionData && subscriptionData.length > 0
    ? [...subscriptionData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : null;

  // Fallback payment details if subscriptionData is unavailable
  const paymentDetails = latestSubscription;

  // Handle loading state
  if (isLoading) {
    return (
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Handle error state
  if (subscriptionError) {
    let errorMessage = 'An error occurred while fetching subscription data.';
    
    if ('status' in subscriptionError) {
      // Handle FetchBaseQueryError
      const fetchError = subscriptionError as FetchBaseQueryError;
      errorMessage = `Error ${fetchError.status}: ${
        typeof fetchError.data === 'string' ? fetchError.data : 'Failed to fetch subscription data'
      }`;
    } else {
      // Handle SerializedError
      const serializedError = subscriptionError as SerializedError;
      errorMessage = serializedError.message || errorMessage;
    }

    return (
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="text-red-600 font-semibold">Error: {errorMessage}</div>
      </div>
    );
  }

  // Handle case where paymentDetails is null
  if (!paymentDetails) {
    return (
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="text-gray-600">No subscription data available.</div>
      </div>
    );
  }


  const converterPrice = parseFloat(paymentDetails.price)

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {/* Checkmark Animation */}
        <div className="flex justify-center mb-6">
          <svg className="checkmark w-20 h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your payment. Your job posting package has been activated successfully.</p>

        {/* Payment Details */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Payment Details</h2>
          <p className="text-gray-600">
            <span className="font-medium">Package:</span> {paymentDetails.packageName || 'N/A'}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Duration:</span> {paymentDetails.duration || 'N/A'}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Amount:</span> ${converterPrice ? converterPrice.toFixed(2) : 'N/A'}
          </p>
        </div>

        {/* Back to Dashboard Button */}
        <Link className="flex justify-center" href="/company-dashboard/post-job">
          <button
            onClick={() => router.push('/company-dashboard/post-job')}
            className="bg-[#0A65CC] flex gap-3 items-center justify-center cursor-pointer text-white px-6 py-2 rounded-xs hover:bg-blue-700 transition duration-300"
          >
            <BriefcaseBusiness /> Post a Job
          </button>
        </Link>
      </div>

      <style jsx>{`
        .checkmark {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: block;
          stroke-width: 2;
          stroke: #fff;
          stroke-miterlimit: 10;
          box-shadow: inset 0px 0px 0px #34D399;
          animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
        }
        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 2;
          stroke-miterlimit: 10;
          stroke: #34D399;
          fill: none;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .checkmark__check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes scale {
          0%, 100% {
            transform: none;
          }
          50% {
            transform: scale3d(1.1, 1.1, 1);
          }
        }
        @keyframes fill {
          100% {
            box-shadow: inset 0px 0px 0px 30px #34D399;
          }
        }
      `}</style>
    </div>
  );
};

export default Success;
