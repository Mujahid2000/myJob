'use client';
import Image from 'next/image';
import { ArrowRight, Check, MoveRight } from 'lucide-react';
import CheckoutModal from '@/Component/Employee-Dashboard/postajob/CheckoutModal';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPlanDetails } from '@/Store/Subscription';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';


// Define the interface for a single plan
interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

// Define the plans data with the Plan interface
const plans: Plan[] = [
  {
    name: 'Basic',
    price: '19.00',
    description: 'Praesent eget pulvinar orci. Duis ut pellentesque ligula convallis.',
    features: [
      'Post 1 Job',
      'Urgents & Featured Jobs',
      'Highlights Job with Colors',
      'Access & Saved 5 Candidates',
      '10 Days Resume Visibility',
      '24/7 Critical Support',
    ],
  },
  {
    name: 'Standard',
    price: '39.00',
    description: 'Praesent eget pulvinar orci. Duis ut pellentesque ligula convallis.',
    features: [
      '3 Active Jobs',
      'Urgents & Featured Jobs',
      'Highlights Job with Colors',
      'Access & Saved 10 Candidates',
      '20 Days Resume Visibility',
      '24/7 Critical Support',
    ],
    recommended: true,
  },
  {
    name: 'Premium',
    price: '59.00',
    description: 'Praesent eget pulvinar orci. Duis ut pellentesque ligula convallis.',
    features: [
      '6 Active Jobs',
      'Urgents & Featured Jobs',
      'Highlights Job with Colors',
      'Access & Saved 20 Candidates',
      '30 Days Resume Visibility',
      '24/7 Critical Support',
    ],
  },
];

// Define the PricingPlans component with TypeScript
const page: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authContext = useContext(AuthContext);
    const currentUser = authContext?.currentUser;
    const { data: userEmail } = useGetUserByIdQuery(currentUser?.email || '');
    const id = userEmail?.user?._id;

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen);
    }

  return (
    <div className="max-w-7xl mx-auto p5-5 ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
            Buy Premium Subscription to Post a Job
          </h2>
          <p className="mt-4 text-gray-600">
            Donec eu justo sit amet dolor commodo ornare. Sed arcu libero, malesuada
            quis elit ac, varius tempor neque. Quisque ultricies mi sed lorem
            condimentum, vel tempus lectus ultricies.
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <Image
            src="https://res.cloudinary.com/diez3alve/image/upload/v1744957041/Screenshot_2025-04-18_121159_finvba.png"
            alt="Illustration"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-9 lg:gap-3 pt-20 ">
        {plans.map((plan: Plan) => (
          <div
            key={plan.name}
            className={`relative bg-white border rounded-lg shadow-lg p-6 ${
              plan.recommended ? 'border-2 border-blue-500' : ''
            }`}
          >
            {plan.recommended && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-sm text-sm font-semibold">
                  Recommendation
                </span>
              </div>
            )}
            <h3 className="text-base font-semibold text-gray-900">{plan.name}</h3>
            <p className="mt-2 text-[14px] text-gray-500">{plan.description}</p>
            <div className="mt-1">
              <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
              <span className="text-gray-500">/Monthly</span>
            </div>
            <ul className="mt-6 space-y-2">
              {plan.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center">
                  <Check  className="h-5 w-5 text-[#0A65CC]" />
                  <span className="ml-3 text-[14px] text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => {
                handleModalOpen();
                dispatch(setPlanDetails({userId: id|| '', name: plan.name, price: plan.price, duration: 'Monthly' }));
              }}
              className={`mt-8 w-full justify-center gap-3 flex py-3 rounded-xs text-[#0A65CC] hover:text-white cursor-pointer font-semibold ${
               'hover:bg-[#0A65CC] bg-[#E7F0FA]'
              
              }`}
            >
            Choose Plan
            <MoveRight />
            </button>
          </div>
        ))}
      </div>

      <CheckoutModal isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}/>
    </div>
  );
};

export default page;