import { CheckCheck } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';

export default function SetupComplete() {
  return (
    <div className="min-h-[85vb] bg-gray-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-6 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <CheckCheck className='text-blue-500'/>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center justify-center">
            🎉
            Congratulations, Your profile is 100% complete!
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Donec hendrerit, ante mattis pellentesque eleifend, tortor urna malesuada ante, eget aliquam nulla sed sem vitae. Nunc
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/candidate-dashboard">
              <button className="px-4 py-2 bg-[#E7F0FA] border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
                View Dashboard
              </button>
            </Link>
            <Link href="/post-job">
              <button className="px-4 py-2 bg-[#0A65CC] text-white rounded-md hover:bg-blue-400 flex items-center space-x-2">
                <span>Post Job</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </main>
     
    </div>
  );
}