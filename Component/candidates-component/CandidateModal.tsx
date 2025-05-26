'use client'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { candidateModal } from "@/Store/CandidateModal";
import { AppDispatch, RootState } from "@/Store/Store";
import { Bookmark, Cake, CircleUserRound, ClipboardList, Download, FileText, GraduationCap, Layers, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaReddit, FaTwitter, FaYoutube } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function CandidateModal() {
     const dispatch = useDispatch<AppDispatch>();
    const {value, candidateId} = useSelector((state: RootState) => state.candidateModal);
    

    return (
        <div
        className={`${
          value ? " visible" : " invisible"
        } w-full  fixed top-0 left-0 z-[200000000] bg-[#0000002a]  transition-all duration-300 flex items-center justify-center`}
      >
        <div
          className={`${
            value ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
          } w-[50%] h-screen pt-6 rounded-lg transition-all duration-300  `}
        >
          <div className="flex gap-3 ">
                      
          <div className="p-5 rounded-md bg-white ">
            <div className="max-w-7xl mx-auto px-4">
            
              <div>
                {/* this is header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img src='https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1744370221~exp=1744373821~hmac=bf9f0c7b9e4a2b2b0886b2278f2d6c5b8dcd60f7c3a72a3d4d2ba9f68c486866&w=996' className="w-16 h-16  rounded-full object-cover" />
                    <div>
                      <h1 className="text-xl font-bold text-gray-800">
                        Esther Howard
                      </h1>
                      <p className="text-sm text-gray-600">
                        Website Designer (UI/UX)
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="ghost" className="cursor-pointer">
                      <Bookmark />
                    </Button>

                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Mail className="mr-2 h-4 w-4" /> Send Mail
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
          <p className="flex flex-col text-[#0A65CC] items-start "><Cake  size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">Date of Birth:</span> <span className='text-black font-medium text-[14px]'>14 June, 2021</span></p>
          <p className="flex flex-col items-start "><MapPin className="text-[#0A65CC]" size={16} strokeWidth={1.7}/> <span className="font-normal  text-[12px] text-[#767F8C]">Nationality:</span> <span className='text-black font-medium text-[14px]'>Bangladeshi</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start "><ClipboardList size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">marital Status:</span> <span className='text-black font-medium text-[14px]'>Single</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start "><CircleUserRound size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">Gender:</span> <span className='text-black font-medium text-[14px]'>Male</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start "><Layers size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">Experience:</span> <span className='text-black font-medium text-[14px]'>7 Years</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start "><GraduationCap size={16} strokeWidth={1.7}/> <span className="font-normal text-[12px] text-[#767F8C]">Educations:</span> <span className='text-black font-medium text-[14px]'>Master Degree</span></p>
        
        </div>
      </Card>


<div>
      <Card className="flex flex-col duration-300 gap-2 px-2 mt-2 shadow-none hover:shadow-md">
        <h3 className="text-[16px] text-[#18191C] px-3 ">Download My Resume</h3>
        <div className="flex justify-between items-center px-3">
        <div className="flex justify-between items-center gap-2">
        <FileText className="text-[#E4E5E8]" size={40} />
        <div className="flex flex-col gap-1">
          <h5 className="text-[#767F8C] text-sm">Esther Howard</h5>
          <h5 className="text-[#18191C] text-sm font-medium">PDF</h5>
        </div>
        </div>
        <button className="bg-[#E7F0FA] hover:bg-[#0A65CC] hover:text-white p-3 rounded-sm"><Download size={20}/></button>
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
        <p className="text-sm font-medium">www.estherhoward.com</p>
      </div>
    </div>
    
    <div className="border-b pb-3">
    <div className="flex justify-center gap-5 px-4 items-center">
    <MapPin className="text-blue-500"/>
      <div>
        <p className="text-sm">Location</p>
        <p className="text-sm font-medium">Beverly Hills, California 90202</p>
      </div>
    </div>
    <p className="text-wrap px-6 py-1 text-[#5E6670] text-sm">Zone/Block Basement 1 Unit B2, 1372 <br /> Spring Avenue, Portland, </p>
    </div>

    <div className=" pt-3 ">
    <div className="flex gap-4 px-7 items-start">
    <Phone className="text-blue-500"/>
      <div>
        <p className="text-sm">Phone</p>
        <p className="text-sm font-medium">+1-202-555-0141</p>
        <p className="text-sm font-medium text-[#767F8C] pt-1">Secondary Phone</p>
        <p className="text-sm font-medium">+1-202-555-0189</p>
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
          <button onClick={() => dispatch(candidateModal( {value:!value, candidateId} ))} className="bg-white hover:bg-gray-200 w-5 h-5 flex justify-center items-center text-xl cursor-pointer text-black rounded-full p-5">X</button>
          </div>
        </div>
      </div>
    )
}