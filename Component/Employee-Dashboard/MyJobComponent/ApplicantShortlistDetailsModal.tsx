import { AuthContext } from '@/Authentication/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useGetJobPostApplicantDetailsQuery } from '@/RTKQuery/JobApplyApiSlice';
import { shortlistRequest, useGetShortListedCandidateDetailsQuery, usePostShortListedDataMutation, useSaveCandidateProfileMutation } from '@/RTKQuery/ShortListedApi';
import { Bookmark, Cake, CircleArrowRight, CircleUserRound, ClipboardList, Download, FileText, GraduationCap, Layers, Mail, Map, MapPin, Phone, Star } from 'lucide-react';
import Link from 'next/link';
import React, { useContext } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaReddit, FaTwitter, FaYoutube } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';
import { FaUsersBetweenLines } from "react-icons/fa6";

const ApplicantShortlistDetailsModal = ({ newopen, setnewopen, userId, resume_Id, jobId, companyname, jobTitle}:{newopen: any, setnewopen:any, userId: string, resume_Id:string, jobId:string, companyname:string | undefined, jobTitle:string}) => {
    const authContext = useContext(AuthContext);
    const currentUser = authContext?.currentUser;
    const { data: userEmail, error: userEmailError } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
    const currentUserid = userEmail?.user?._id || '';
    const email = userEmail?.user?.email || '';
    const applicantDetailsData = {userId, resumeId: resume_Id};
    const [sendShortList, {isLoading: shortLoading}]= usePostShortListedDataMutation()

    const { data: sortingApplicantDetails, isLoading, isError, error, isSuccess } = useGetShortListedCandidateDetailsQuery(applicantDetailsData); //Argument of type '{userId:string; resume_Id: string; }' is not assignable to parameter of type 'unique symbol | { userId: string; resumeId: string; }'. Property 'resumeId' is missing in type '{ userId: string; resume_Id: string; }' but required in type '{ userId: string; resumeId: string; }'.ts(2345)ShortListed.Api.ts(97, 103): 'resumeId' is declared here.
   
  const applicantData = sortingApplicantDetails?.applicant;
  const date = applicantData?.dateOfBirth;
  interface FormatDateToOrdinalOptions {
    year: 'numeric';
    month: 'long';
    day: 'numeric';
  }

  function formatDateToOrdinal(dateString: string): string {
    const options: FormatDateToOrdinalOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date: Date = new Date(dateString);

    // Format day with ordinal suffix (st, nd, rd, th)
    const day: number = date.getDate();
    const month: string = date.toLocaleDateString('en-GB', { month: 'long' });
    const year: number = date.getFullYear();

    const getOrdinalSuffix = (day: number): string => {
      if (day > 3 && day < 21) return 'th'; // catch 11th, 12th, 13th
      switch (day % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  }

// Example usage
const formattedDate = formatDateToOrdinal(date ?? '');

if (isLoading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }


if (isSuccess && !applicantData) {
    return  <div className="text-white text-lg">No applicant details found</div>
  }


const handleShortListed = async () => {
    if (!applicantData) {
        console.error('No applicant data available');
        return;
    }
    const shortListedData: shortlistRequest = {
        jobId: jobId || '',
        userId: currentUserid,
        resumeId: applicantData.resumeId || '',
        email: email || '',
        applicantId: sortingApplicantDetails?.applicant.userId || ''
        
    };
    try {
        const response = await sendShortList(shortListedData).unwrap();
        if(response.message === 'you already added this candidate'){
          toast.warning(response.message)
        }else if (response.message === 'You shortListed this candidate successfully'){
          toast.success(response.message)
        }
        console.log('Shortlist response:', response);
    } catch (error) {
        console.error('Failed to shortlist:', error);
    }
};






    return (
        <div>
             <div
        className={`${
          newopen ? " visible" : " invisible"
        } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
      >
        <div
          className={`${
            newopen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
          } w-[50%] max-h-[95vh] overflow-y-auto pt-6 rounded-lg transition-all duration-300  `}
        >
          <div className="flex gap-3 ">
                      
          <div className="p-5 rounded-md bg-white ">
            <div className="max-w-7xl mx-auto px-4">
            
              <div>
                {/* this is header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img src={applicantData?.profilePicture} className="w-16 h-16  rounded-full object-cover" />
                    <div>
                      <h1 className="text-xl font-bold text-gray-800">
                        {applicantData?.fullName}
                      </h1>
                      <p className="text-sm text-gray-600">
                        {applicantData?.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={handleShortListed} title='shortlisted'  className="cursor-pointer">
                    <FaUsersBetweenLines />
                    </Button>
                    

                    <Button className="bg-white border border-[#0A65CC] text-[#0A65CC] hover:bg-blue-700 hover:text-white">
                      <Mail className="mr-2 h-4 w-4" /> Send Mail
                    </Button>
                    <Button className="bg-[#0A65CC] hover:bg-white border hover:text-[#0A65CC] hover:border-[#0A65CC] text-white">
                      <CircleArrowRight  className="mr-2 h-4 w-4" /> Hire Candidates
                    </Button>
                  </div>
                </div>

                <div className="flex gap-5 justify-between pt-6">
{/* 1st parent div */}
<div className="flex-1">
<div className="pb-4">
  <h3 className="text-base font-medium text-[#18191C]">BIOGRAPHY</h3>
  <p className="text-sm">I&apos;ve been passionate about graphic design and digital art from an early age with a keen interest in Website and Mobile Application User Interfaces. I can create high-quality and aesthetically pleasing designs in a quick turnaround time. Check out the portfolio section of my profile to see samples of my work and feel free to discuss your designing needs. I mostly use Adobe Photoshop, Illustrator, XD and Figma. *Website User Experience and Interface (UI/UX) Design - for all kinds of Professional and Personal websites. *Mobile Application User Experience and Interface Design - for all kinds of IOS/Android and Hybrid Mobile Applications. *Wireframe Designs.</p>
</div>
<hr />
<div>
            <div className="border-b pb-6">
              <div>
                <h3 className="text-[#18191C] font-medium py-5">COVER LETTER</h3>
              </div>
              <div>
                <p className="text-gray-700 text-sm">
                  Dear Sir,
                  <br />
                  
                  I am writing to express my interest in the fourth grade instructional position that is currently available in the Fort Wayne Community School System. I learned of the opening through a notice posted on JobZone, IPFW’s job database. I am confident that my academic background and curriculum development skills would be successfully utilized in this teaching position.
                  <br />
                  <br />
                  I have just completed my Bachelor of Science degree in Elementary Education and have successfully completed Praxis I and Praxis II. During my student teaching experience, I developed and initiated a three-week curriculum sequence on animal species and earth resources. This collaborative unit involved working with three other third grade teachers within my team, and culminated in a field trip to the Indianapolis Zoo Animal Research Unit.
                  <br />
                  <br />
                  Sincerely,
                  <br />
                  <span className="pt-3 text-xl">Esther Howard</span>
                </p>
              </div>
            </div>
</div>
<div className="py-3">
  <h3>Follow me on social media</h3>
  <div className="flex gap-2 pt-3">
<button className="bg-[#E7F0FA] hover:bg-[#0A65CC] rounded-sm text-blue-600 hover:text-white w-8 text-center flex justify-center items-center h-8"> <FaFacebookF /></button>
<button className="bg-[#E7F0FA] hover:bg-[#0A65CC] rounded-sm text-blue-600 hover:text-white w-8 text-center flex justify-center items-center h-8"><FaTwitter /></button>
<button className="bg-[#E7F0FA] hover:bg-[#0A65CC] rounded-sm text-blue-600 hover:text-white w-8 text-center flex justify-center items-center h-8"> <FaLinkedinIn /></button>
<button className="bg-[#E7F0FA] hover:bg-[#0A65CC] rounded-sm text-blue-600 hover:text-white w-8 text-center flex justify-center items-center h-8"><FaReddit /></button>
<button className="bg-[#E7F0FA] hover:bg-[#0A65CC] rounded-sm text-blue-600 hover:text-white w-8 text-center flex justify-center items-center h-8"> <FaInstagram /></button>
<button className="bg-[#E7F0FA] hover:bg-[#0A65CC] rounded-sm text-blue-600 hover:text-white w-8 text-center flex justify-center items-center h-8"> <FaYoutube />
</button>
</div>
</div>
</div>
{/* 2rd parent div */}
<div className="">
<Card className="p-6 shadow-none hover:shadow-md duration-300 rounded-md  max-w-[33rem]">
        
        <div className="grid grid-cols-2 gap-2 text-gray-600">
          <p className="flex flex-col text-[#0A65CC] items-start "><Cake  size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">Date of Birth:</span> <span className='text-black font-medium text-[14px]'>{formattedDate}</span></p>
          <p className="flex flex-col items-start "><Map className="text-[#0A65CC]" size={16} strokeWidth={1.7}/> <span className="font-normal  text-[12px] text-[#767F8C]">Nationality:</span> <span className='text-black font-medium text-[14px]'>{applicantData?.country}</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start "><ClipboardList size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">marital Status:</span> <span className='text-black font-medium text-[14px]'>{applicantData?.maritalStatus}</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start "><CircleUserRound size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">Gender:</span> <span className='text-black font-medium text-[14px]'>{applicantData?.gender}</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start "><Layers size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">Experience:</span> <span className='text-black font-medium text-[14px]'>{applicantData?.experience}</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start "><GraduationCap size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">Educations:</span> <span className='text-black font-medium text-[14px]'>{applicantData?.education}</span></p>
        
        </div>
      </Card>


<div>
      <Card className="flex flex-col duration-300 gap-2 px-2 mt-2 shadow-none hover:shadow-md">
        <h3 className="text-[16px] text-[#18191C] px-3 ">Download My Resume</h3>
        <div className="flex justify-between items-center px-3">
        <div className="flex justify-between items-center gap-2">
        <FileText className="text-[#E4E5E8]" size={40} />
        <div className="flex flex-col gap-1">
          <h5 className="text-[#767F8C] text-sm">{applicantData?.resumeName}</h5>
          <h5 className="text-[#18191C] text-sm font-medium">PDF</h5>
        </div>
        </div>
        {applicantData?.resumeUrl ? (
          <Link href={applicantData.resumeUrl} target='_blank'>
            <button className="bg-[#E7F0FA] cursor-pointer hover:bg-[#0A65CC] hover:text-white p-3 rounded-sm"><Download size={20}/></button>
          </Link>
        ) : (
          <button className="bg-[#E7F0FA] cursor-not-allowed p-3 rounded-sm" disabled>
            <Download size={20}/>
          </button>
        )}
        </div>
      </Card>

</div>
<div className="mt-2">
  <div className="p-4 border rounded-xl duration-300 hover:shadow-md">
    <h3 className="px-3 pb-2">Contact Information</h3>
    <div className="flex gap-5 border-b pb-4 px-6 items-center">
    <MapPin className="text-blue-500"/>
      <div>
        <p className="text-sm">Website</p>
        {applicantData?.portfolio ? (
          <Link href={applicantData.portfolio} target='_blank'>
            <p className="text-sm font-medium">{applicantData.portfolio.slice(0,28)}</p>
          </Link>
        ) : (
          <p className="text-sm font-medium text-gray-400">No portfolio provided</p>
        )}
      </div>
    </div>
    
    <div className="border-b pb-3">
    <div className="flex justify-center gap-5 px-4 items-center">
    <MapPin className="text-blue-500"/>
      <div>
        <p className="text-sm">Location</p>
        <p className="text-sm font-medium">{applicantData?.mapLocation}</p>
      </div>
    </div>
    <p className="text-wrap px-6 py-1 text-[#5E6670] text-sm">Zone/Block Basement 1 Unit B2, 1372 <br /> Spring Avenue, Portland, </p>
    </div>

    <div className=" pt-3 ">
    <div className="flex gap-4 px-7 items-start">
    <Phone className="text-blue-500"/>
      <div>
        <p className="text-sm">Phone</p>
        <p className="text-sm font-medium">+880{applicantData?.phoneNumber}</p>
        <p className="text-sm font-medium text-[#767F8C] pt-1">Secondary Phone</p>
        <p className="text-sm font-medium">+880{applicantData?.phoneNumber}</p>
      </div>
    </div>
    
    </div>
  </div>
</div>
</div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={()=>setnewopen(!newopen)}  className="bg-white hover:bg-gray-200 w-5 h-5 flex justify-center items-center text-xl cursor-pointer text-black rounded-full p-5">X</button>
          </div>
        </div>
      </div>
      <Toaster richColors/>
        </div>
    );
};

export default ApplicantShortlistDetailsModal;