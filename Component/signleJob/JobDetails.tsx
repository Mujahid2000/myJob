import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bookmark, Briefcase, Calendar, DollarSign, GraduationCap,Link, Mail, MapPin, Phone, Users } from "lucide-react"
import Image from "next/image"
import { FaFacebook, FaPinterest, FaTwitter } from "react-icons/fa"
import SafeHtml from "./SafeHtml"
import SafeResponsibilities from "./SafeResponsibilities"
import { Badge } from "@/components/ui/badge"
import BookMarkButton from "../Joblist/BookMarkButton"
import ApplyNowButton from "./ApplyNowButton"

export default async function JobDetails ({id}: {id:string}) {
      const jobs = [
    {
      id: 1,
      company: "Reddit",
      logo: "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png",
      location: "United Kingdom",
      title: "Marketing Officer",
      type: "Full Time",
      salary: "$30K-$35K",
      featured: true,
    },
    {
      id: 2,
      company: "Google",
      logo: "/placeholder.svg?height=55&width=55",
      location: "United States",
      title: "Software Engineer",
      type: "Full Time",
      salary: "$80K-$120K",
      featured: false,
    },
    {
      id: 3,
      company: "Microsoft",
      logo: "/placeholder.svg?height=55&width=55",
      location: "Canada",
      title: "Product Manager",
      type: "Full Time",
      salary: "$90K-$130K",
      featured: true,
    },
    {
      id: 4,
      company: "Apple",
      logo: "/placeholder.svg?height=55&width=55",
      location: "United States",
      title: "UX Designer",
      type: "Full Time",
      salary: "$70K-$100K",
      featured: false,
    },
    {
      id: 5,
      company: "Meta",
      logo: "/placeholder.svg?height=55&width=55",
      location: "United Kingdom",
      title: "Data Scientist",
      type: "Full Time",
      salary: "$85K-$115K",
      featured: true,
    },
    {
      id: 6,
      company: "Netflix",
      logo: "/placeholder.svg?height=55&width=55",
      location: "Germany",
      title: "Content Strategist",
      type: "Full Time",
      salary: "$60K-$80K",
      featured: false,
    },
  ]
  
  const data = await fetch(`https://serverjob.vercel.app/jobs/jobPost/${id}`);
  const posts = await data.json();
  const singlePost = posts?.data

return (
    <><div className='bg-[#F1F2F4] py-2 '>
        <div className='flex  justify-between items-center py-3 px-3 lg:px-0 max-w-7xl mx-auto'>
            <h3 className='text-xl lg:text-2xl font-semibold text-gray-800'>Job Details</h3>
            <p className='text-gray-500'>Home / Find Job/ Job Details</p>
        </div>
    </div><div className="max-w-7xl mx-auto gap-6">
            {/* Left Section */}
            <div className=" space-y-6">
                <Card className=" rounded-none shadow-none border-none">
                    <div className="flex flex-col lg:flex-row items-start gap-3 lg:gap-0 lg:items-center justify-between px-5">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                            <img src={singlePost?.logo} alt="Instagram" className="w-[5rem] lg:w-[6rem] h-[5rem] lg:h-[6rem] rounded-full" />
                            <div>
                                <div className='flex flex-row items-center gap-3'>
                                    <div>
                                        <h2 className="text-[1.4rem] lg:text-[1.5rem] text[#18191C] font-bold">{singlePost.title} </h2>
                                    </div>
                                   
                                    <div className="flex gap-2">
                                        {
                                            singlePost.promoted?  <>
                                    <Badge className='bg-red-100 text-[#FF4F4F]'>Featured</Badge>
                                    </> :
                                    ''
                                        }
                                    <Badge className='bg-blue-100 text-[#06F]'>{singlePost.jobType}</Badge>
                                    </div>
                                </div>
                                <div className='flex flex-col lg:flex-row gap-4'>
                                    <div className='flex items-center gap-1'>
                                        <Link size={15} />
                                        <p className="text-gray-500">{singlePost.companyWebsite}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Phone size={15} />
                                        <p className="text-gray-500">{singlePost.phone}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Mail size={15} />
                                        <p className="text-gray-500">{singlePost.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* bookmark and apply now button */}
                        <div className=' '>
                            <div className='flex gap-5'>
                                <BookMarkButton jobData={singlePost}/>
                               <ApplyNowButton id={singlePost._id}/>

                            </div>
                            <div className='flex  justify-start lg:justify-between'>
                                <div>

                                </div>
                                <div>

                                    <p className='py-2'>Job expire in: <span className='text-red-600'> {singlePost.expiryDate}</span></p>
                                </div>
                            </div>

                        </div>
                    </div>
                </Card>
            </div>

        </div><div className='flex flex-col lg:flex-row justify-between max-w-7xl mx-auto'>
            <div className='max-w-[45.875rem] '>
                {/* safe html component*/}
                <SafeHtml html={singlePost.biography} />
                {/* SafeResponsibilities component */}
                <SafeResponsibilities html={singlePost.responsibilities}/>
                <div className="flex flex-col gap-2 px-3 lg:px-0 lg:flex-row  items-start lg:items-center space-x-2 py-[2rem]">
                    <span className="text-gray-700">Share this job:</span>
                    <div className="flex gap-4">
                    <Button variant="outline" className="flex items-center space-x-2">
                        <FaFacebook className="text-blue-600" />
                        <span>Facebook</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                        <FaTwitter className="text-blue-400" />
                        <span>Facebook</span> {/* This should be Twitter */}
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                        <FaPinterest className="text-red-600" />
                        <span>Pinterest</span>
                    </Button>
                    </div>
                   
                </div>
            </div>
            <div>
                <div className=" px-2 lg:px-0 mx-auto space-y-6">
                    {/* Job Overview */}
                    <Card className="p-3 lg:p-6 max-h-[27rem] max-w-full lg:max-w-[33rem]">
                        <h3 className="text-[1.5rem] font-semibold mb-2">Job Overview</h3>
                        <div className="grid grid-cols-3 gap-5 lg:gap-6 text-gray-600">
                            <p className="flex flex-col text-[#0A65CC] items-start gap-1"><Calendar size={26} strokeWidth={1.7} /> <span className="font-normal text-[#767F8C]">Job Posted:</span> <span className='text-black text-wrap text-sm lg:text-base font-medium'>{singlePost.postedDate}</span></p>
                            <p className="flex flex-col text-[#0A65CC] items-start gap-1"><Calendar size={26} strokeWidth={1.7} /> <span className="font-normal text-[#767F8C]">Job Expire In:</span> <span className='text-black text-wrap text-sm lg:text-base font-medium'>{singlePost.expiryDate}</span></p>
                            <p className="flex flex-col text-[#0A65CC] items-start gap-1"><GraduationCap size={26} strokeWidth={1.7} /> <span className="font-normal text-[#767F8C]">Education:</span> <span className='text-black text-wrap text-sm lg:text-base font-medium'>{singlePost.education}</span></p>
                            <p className="flex flex-col text-[#0A65CC] items-start gap-1"><DollarSign size={26} strokeWidth={1.7} /> <span className="font-normal text-[#767F8C]">Salary:</span> <span className='text-black text-wrap text-sm lg:text-base font-medium'>${singlePost.minSalary}-{singlePost.maxSalary}k/month</span></p>
                            <p className="flex flex-col text-[#0A65CC] items-start gap-1"><MapPin size={26} strokeWidth={1.7} /> <span className="font-normal text-[#767F8C]">Location:</span> <span className='text-black text-wrap text-sm lg:text-base font-medium'>{singlePost.location}</span></p>
                            <p className="flex flex-col text-[#0A65CC] items-start gap-1"><Briefcase size={26} strokeWidth={1.7} /> <span className="font-normal text-[#767F8C]">Job Type:</span> <span className='text-black text-wrap text-sm lg:text-base font-medium'>{singlePost.jobType}</span></p>
                            <p className="flex flex-col text-[#0A65CC] items-start gap-1"><Users size={26} strokeWidth={1.7} /> <span className="font-normal text-[#767F8C]">Experience:</span> <span className='text-black text-wrap text-sm lg:text-base font-medium'>{singlePost.experience} Years</span></p>
                        </div>
                    </Card>

                    {/* Company Info */}
                    <Card className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={singlePost.logo} alt="Instagram" className="w-[4rem] h-[4rem] rounded-md" />
                            <div className='flex flex-col gap-2'>
                                <h3 className="text-lg font-semibold">{singlePost.companyName}</h3>
                                <p className="text-gray-500">{singlePost.industryType}</p>
                            </div>
                        </div>
                        <div className="text-gray-600 space-y-2">
                            <p className='flex justify-between text-wrap text-sm lg:text-base'><span className="font-medium ">Founded:</span> March 21, 2006</p>
                            <p className='flex justify-between text-wrap text-sm lg:text-base'><span className="font-medium ">Organization type:</span> {singlePost.organizationType}</p>
                            <p className='flex justify-between text-wrap text-sm lg:text-base'><span className="font-medium ">Company size:</span> {singlePost.companySize} Employers</p>
                            <p className='flex justify-between text-wrap text-sm lg:text-base'><span className="font-medium ">Phone:</span> {singlePost.phone}</p>
                            <p className='flex justify-between text-wrap text-sm lg:text-base'><span className="font-medium ">Email:</span> {singlePost.email}</p>
                            <p className='flex justify-between text-wrap text-sm lg:text-base'><span className="font-medium ">Website:</span> {singlePost.companyWebsite}</p>
                        </div>
                        <div className="flex  items-center gap-4 mt-4">
                            <img src="https://res.cloudinary.com/diez3alve/image/upload/v1740758529/Employers_Logo_2_eyvdlw.png" alt="Facebook" className="w-6 h-6" />
                            <img src="https://res.cloudinary.com/diez3alve/image/upload/v1740989286/twitter-logo-2429_uijomq.png" alt="Twitter" className="w-6 h-6" />
                            <img src="https://res.cloudinary.com/diez3alve/image/upload/v1740989351/instagram-logo-8869_jtat6w.png" alt="Instagram" className="w-6 h-6" />
                            <img src="https://res.cloudinary.com/diez3alve/image/upload/v1740989461/youtube-logo-blue-10691_cghwse.png" alt="YouTube" className="w-6 h-6" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
        <div className="w-full px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-5">
        {/* Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="w-full">
              <Card className="w-full border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex flex-col gap-3 p-4">
                  {/* Company info section */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <Image
                        src={job.logo || "/placeholder.svg"}
                        alt={job.company}
                        width={55}
                        height={55}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <h4 className="font-semibold text-base sm:text-[1rem] truncate">{job.company}</h4>
                        {job.featured && (
                          <Badge
                            variant="destructive"
                            className="bg-[#FFE0E0] text-[#FF4F4F] text-xs whitespace-nowrap"
                          >
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-1 items-center mt-1">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <p className="text-sm text-gray-400 truncate">{job.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Job title */}
                  <h3 className="text-blue-600 font-semibold cursor-pointer text-lg sm:text-[1.15rem] hover:text-blue-700 transition-colors">
                    {job.title}
                  </h3>

                  {/* Job details */}
                  <p className="text-gray-500 text-sm sm:text-base">
                    {job.type} • {job.salary}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
        
        </>
)
}