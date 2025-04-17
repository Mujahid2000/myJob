import { MoveRight } from 'lucide-react';
import React from 'react';

const page = () => {
    return (
        <div >
            <h1 className="text-2xl font-bold py-2">Hello, Esther Howard</h1>
        <p className="pb-5">Here is your daily activities and job alerts</p>

        <div className="flex flex-col md:flex-row justify-start gap-5">
          <div className="flex w-66 justify-between gap-7 border items-center p-4 rounded-sm bg-[#E7F0FA]">
            <div>
              <h1 className="text-2xl font-medium">589</h1>
              <p>Applied jobs</p>
            </div>
            <div className="bg-white p-4 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <g clipPath="url(#clip0_1647_30666)">
    <path opacity="0.2" d="M16 19.0004C11.7872 19.007 7.64764 17.8995 4.00098 15.7902V26.0004C4.00098 26.1317 4.02684 26.2618 4.0771 26.3831C4.12735 26.5044 4.20101 26.6147 4.29387 26.7075C4.38673 26.8004 4.49697 26.8741 4.61829 26.9243C4.73962 26.9746 4.86965 27.0004 5.00098 27.0004H27.001C27.1323 27.0004 27.2623 26.9746 27.3837 26.9243C27.505 26.8741 27.6152 26.8004 27.7081 26.7075C27.8009 26.6147 27.8746 26.5044 27.9249 26.3831C27.9751 26.2618 28.001 26.1317 28.001 26.0004V15.7891C24.3539 17.8991 20.2135 19.0071 16 19.0004Z" fill="#0A65CC"/>
    <path d="M27.001 9H5.00098C4.44869 9 4.00098 9.44772 4.00098 10V26C4.00098 26.5523 4.44869 27 5.00098 27H27.001C27.5533 27 28.001 26.5523 28.001 26V10C28.001 9.44772 27.5533 9 27.001 9Z" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 9V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H13C12.4696 5 11.9609 5.21071 11.5858 5.58579C11.2107 5.96086 11 6.46957 11 7V9" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28.001 15.7891C24.3538 17.8991 20.2135 19.007 16 19.0004C11.7872 19.007 7.64749 17.8995 4.00079 15.7901" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.5 15H17.5" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1647_30666">
      <rect width="32" height="32" fill="white"/>
    </clipPath>
  </defs>
          </svg>
            </div>
          </div>
          <div className="flex w-66 justify-between gap-7  items-center p-4 rounded-sm bg-[#FFF6E6]">
            <div>
              <h1 className="text-2xl font-medium">589</h1>
              <p>Favorite jobs</p>
            </div>
            <div className="bg-white p-4 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M24 28L15.9991 23L8 28V6C8 5.73478 8.10536 5.48043 8.29289 5.29289C8.48043 5.10536 8.73478 5 9 5H23C23.2652 5 23.5196 5.10536 23.7071 5.29289C23.8946 5.48043 24 5.73478 24 6V28Z" fill="#FFF6E6" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            </div>
          </div>
          
         
          
        </div>
       
        </div>
    );
};

export default page;