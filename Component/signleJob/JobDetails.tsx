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

  
  const data = await fetch(`https://serverjob.vercel.app//jobs/jobPost/${id}`);
  const posts = await data.json();
  const singlePost = posts?.data

return (
    <><div className='bg-[#F1F2F4] py-2 '>
        <div className='flex  justify-between items-center py-3 max-w-7xl mx-auto'>
            <h3 className='text-2xl font-semibold text-gray-800'>Job Details</h3>
            <p className='text-gray-500'>Home / Find Job/ Job Details</p>
        </div>
    </div><div className="max-w-7xl mx-auto gap-6">
            {/* Left Section */}
            <div className=" space-y-6">
                <Card className=" rounded-none shadow-none border-none">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src={singlePost.logo} alt="Instagram" className="w-[6rem] h-[6rem] rounded-full" />
                            <div>
                                <div className='flex items-center gap-3'>
                                    <div>
                                        <h2 className="text-[1.5rem] text[#18191C] font-bold">{singlePost.title} </h2>
                                    </div>
                                        {
                                            singlePost.promoted?  <div>
                                    <Badge className='bg-red-100 text-[#FF4F4F]'>Featured</Badge>
                                    </div> :
                                    ''
                                        }
                                   
                                    <div>
                                    <Badge className='bg-blue-100 text-[#06F]'>{singlePost.jobType}</Badge>
                                    </div>
                                </div>
                                <div className='flex gap-4'>
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
                        <div className=''>
                            <div className='flex gap-5'>
                                <BookMarkButton jobData={singlePost}/>
                               <ApplyNowButton id={singlePost._id}/>

                            </div>
                            <div className='flex justify-between'>
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

        </div><div className='flex justify-between max-w-7xl mx-auto'>
            <div className='max-w-[45.875rem] '>
                {/* safe html component*/}
                <SafeHtml html={singlePost.biography} />
                {/* SafeResponsibilities component */}
                <SafeResponsibilities html={singlePost.responsibilities}/>
                <div className="flex items-center space-x-2 py-[2rem]">
                    <span className="text-gray-700">Share this job:</span>
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
            <div>
                <div className="  mx-auto space-y-6">
                    {/* Job Overview */}
                    <Card className="p-6 max-h-[27rem] max-w-[33rem]">
                        <h3 className="text-[1.5rem] font-semibold mb-2">Job Overview</h3>
                        <div className="grid grid-cols-3 gap-6 text-gray-600">
                            <p className="flex flex-col text-[#0A65CC] items-start gap-1"><Calendar size={26} strokeWidth={1.7} /> <span className="font-normal text-[#767F8C]">Job Posted:</span> <span className='text-black font-medium'>{singlePost.postedDate}</span></p>
                            <p className="flex flex-col text-[#0A65CC] items-start gap-1"><Calendar size={26} strokeWidth={1.7} /> <span className="font-normal text-[#767F8C]">Job Expire In:</span> <span className='text-black font-medium'>{singlePost.expiryDate}</span></p>
                            <p className="flex flex-col text-[#0A65CC] items-start gap-1"><GraduationCap size={26} strokeWidth={1.7} /> <span className="font-normal text-[#767F8C]">Education:</span> <span className='text-black font-medium'>{singlePost.education}</span></p>
                            <p className="flex flex-col text-[#0A65CC] items-start gap-1"><DollarSign size={26} strokeWidth={1.7} /> <span className="font-normal text-[#767F8C]">Salary:</span> <span className='text-black font-medium'>${singlePost.minSalary}-{singlePost.maxSalary}k/month</span></p>
                            <p className="flex flex-col text-[#0A65CC] items-start gap-1"><MapPin size={26} strokeWidth={1.7} /> <span className="font-normal text-[#767F8C]">Location:</span> <span className='text-black font-medium'>{singlePost.location}</span></p>
                            <p className="flex flex-col text-[#0A65CC] items-start gap-1"><Briefcase size={26} strokeWidth={1.7} /> <span className="font-normal text-[#767F8C]">Job Type:</span> <span className='text-black font-medium'>{singlePost.jobType}</span></p>
                            <p className="flex flex-col text-[#0A65CC] items-start gap-1"><Users size={26} strokeWidth={1.7} /> <span className="font-normal text-[#767F8C]">Experience:</span> <span className='text-black font-medium'>{singlePost.experience} Years</span></p>
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
                            <p className='flex justify-between'><span className="font-medium">Founded:</span> March 21, 2006</p>
                            <p className='flex justify-between'><span className="font-medium">Organization type:</span> {singlePost.organizationType}</p>
                            <p className='flex justify-between'><span className="font-medium">Company size:</span> {singlePost.companySize} Employers</p>
                            <p className='flex justify-between'><span className="font-medium">Phone:</span> {singlePost.phone}</p>
                            <p className='flex justify-between'><span className="font-medium">Email:</span> {singlePost.email}</p>
                            <p className='flex justify-between'><span className="font-medium">Website:</span> {singlePost.companyWebsite}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                            <img src="https://res.cloudinary.com/diez3alve/image/upload/v1740758529/Employers_Logo_2_eyvdlw.png" alt="Facebook" className="w-6 h-6" />
                            <img src="https://res.cloudinary.com/diez3alve/image/upload/v1740989286/twitter-logo-2429_uijomq.png" alt="Twitter" className="w-6 h-6" />
                            <img src="https://res.cloudinary.com/diez3alve/image/upload/v1740989351/instagram-logo-8869_jtat6w.png" alt="Instagram" className="w-6 h-6" />
                            <img src="https://res.cloudinary.com/diez3alve/image/upload/v1740989461/youtube-logo-blue-10691_cghwse.png" alt="YouTube" className="w-6 h-6" />
                        </div>
                    </Card>
                </div>
            </div>
        </div><div className='max-w-7xl mx-auto grid grid-cols-3 py-5 gap-4'>
            <div className=''>
                <Card className=' border hover:shadow-lg transition'>
                    <CardContent className={`flex flex-col gap-3 p-4`}>
                        <div className='flex items-center gap-3'>
                            <Image src='https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png' alt='Reddit' width={55} height={55} className='rounded-md' />
                            <div>
                                <div className='flex gap-3'>
                                    <h4 className='font-semibold text-[1rem]'>Reddit</h4>
                                    <Badge variant='destructive' className='bg-[#FFE0E0]  text-[#FF4F4F]'>Featured</Badge>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <MapPin className='w-4' />
                                    <p className='text-[0.875rem] text-gray-400'>United Kingdom</p>
                                </div>
                            </div>
                        </div>

                        <h3 className='text-blue-600 font-semibold cursor-pointer text-[1.15rem]'>Marketing Officer</h3>
                        <p className='text-gray-500'>Full Time • $30K-$35K </p>



                    </CardContent>
                </Card>
            </div>


        </div></>
)
}