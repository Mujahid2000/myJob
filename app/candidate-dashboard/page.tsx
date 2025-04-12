import JobTable from "@/Component/Dashboard/Overview/JobdataTable";
import {  MoveRight } from "lucide-react";

export default function OverviewPage() {
    return (
      <div>
        <h1 className="text-2xl font-bold py-2">Hello, Esther Howard</h1>
        <p className="pb-5">Here is your daily activities and job alerts</p>

        <div className="flex flex-col md:flex-row justify-between gap-5">
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
          <div className="flex w-66 justify-between gap-7  items-center p-4 rounded-sm bg-[#E7F6EA]">
            <div>
              <h1 className="text-2xl font-medium">589</h1>
              <p>Job Alerts</p>
            </div>
            <div className="bg-white p-4 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M7.02535 14.0002C7.02205 12.8195 7.25176 11.6497 7.70133 10.5579C8.15089 9.46608 8.81147 8.47371 9.64522 7.63763C10.479 6.80155 11.4695 6.1382 12.56 5.68559C13.6506 5.23298 14.8197 5 16.0005 5C17.1812 5 18.3503 5.23298 19.4409 5.68559C20.5314 6.1382 21.522 6.80155 22.3557 7.63763C23.1895 8.47371 23.85 9.46608 24.2996 10.5579C24.7492 11.6497 24.9789 12.8195 24.9756 14.0002V14.0002C24.9756 18.4772 25.9122 21.0751 26.7372 22.495C26.8261 22.6467 26.8734 22.8192 26.8743 22.995C26.8752 23.1708 26.8298 23.3438 26.7426 23.4965C26.6553 23.6491 26.5294 23.7761 26.3774 23.8645C26.2254 23.953 26.0528 23.9998 25.877 24.0002H6.12292C5.94707 23.9998 5.77445 23.9529 5.62248 23.8645C5.4705 23.776 5.34454 23.649 5.25731 23.4963C5.17008 23.3437 5.12465 23.1707 5.12563 22.9948C5.1266 22.819 5.17393 22.6465 5.26284 22.4948C6.08825 21.0748 7.02534 18.4769 7.02534 14.0002H7.02535Z" fill="#E7F6EA" stroke="#0BA02C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M12 24V25C12 26.0609 12.4214 27.0783 13.1716 27.8284C13.9217 28.5786 14.9391 29 16 29C17.0609 29 18.0783 28.5786 18.8284 27.8284C19.5786 27.0783 20 26.0609 20 25V24" stroke="#0BA02C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M22.9291 2.99902C24.9639 4.2836 26.6042 6.10545 27.6689 8.26347" stroke="#0BA02C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M4.33118 8.26348C5.39587 6.10545 7.03617 4.2836 9.07099 2.99902" stroke="#0BA02C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            </div>
          </div>
         
          
        </div>
        <div className="flex my-6 justify-between gap-7 border items-center px-4 py-5 rounded-sm  bg-[#E05151]">
            <div className="flex items-center gap-5 justify-between">
              <img className="w-14 h-14 rounded-full" src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1744468423~exp=1744472023~hmac=f6080d476eff1e42b77bdc424c4eda6e63a501be446fc3990a456b7ee48035b6&w=996" alt="" />
              <div className="flex flex-col gap-1">
                <h1 className="text-white text-lg font-medium">Your profile editing is not completed.</h1>
                <p className="text-white text-sm">Complete your profile editing & build your custom Resume</p>
              </div>
            </div>
            <div className=" ">
            <button className="text-red hover:before:bg-redborder-red-500 relative h-[50px] w-40 overflow-hidden border border-red-500 bg-white px-3 text-red-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full"><span className="relative z-10 flex gap-5 items-center  justify-between">Edit Profile <MoveRight size={16}/></span></button>
            </div>
          </div>
          <JobTable/>
      </div>
    );
  }