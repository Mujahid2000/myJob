'use client'
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FaFacebook, FaTwitter, FaPinterest } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Bookmark, Calendar, Mail, MapPin,Phone, DollarSign, GraduationCap, Link, Briefcase, Users } from "lucide-react";
import {RxCross1} from "react-icons/rx";
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Textarea } from '@/components/ui/textarea';
const page = () => {
  const [open, setOpen] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    setOpen(false); // Close modal after submission
  };

    return (
        <div className=' pt-36 pb-10'>
          <div className='bg-[#F1F2F4] py-2 '>
            <div className='flex  justify-between items-center py-3 max-w-7xl mx-auto'>
                    <h3 className='text-2xl font-semibold text-gray-800'>Job Details</h3>
                    <p className='text-gray-500'>Home / Find Job/ Job Details</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto gap-6">
      {/* Left Section */}
      <div className=" space-y-6">
        <Card className=" rounded-none shadow-none border-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png" alt="Instagram" className="w-[6rem] h-[6rem] rounded-full" />
              <div>
                <div className='flex items-center gap-3'>
                <div>
                <h2 className="text-[1.5rem] text[#18191C] font-bold">Senior UX Designer</h2>
                </div>
                <div>
                <Badge className='bg-red-100 text-[#FF4F4F]'>Featured</Badge>
                </div>
                <div>
                <Badge className='bg-blue-100 text-[#06F]'>Full Time</Badge>
                </div>
                </div>
                <div className='flex gap-4'>
                <div className='flex items-center gap-1'>
                <Link size={15}/>
                <p className="text-gray-500">https://instagram.com</p>
                </div>
                <div className='flex items-center gap-1'>
                <Phone size={15}/>
                <p className="text-gray-500">(406) 555-0120</p>
                </div>
                <div className='flex items-center gap-1'>
                <Mail size={15}/>
                <p className="text-gray-500">career@instagram.com</p>
                </div>
                </div>
              </div>
            </div>
            <div className=''>
            <div className='flex gap-5'>
            <Button variant="outline" className="flex cursor-pointer bg-[#D6E7FB] items-center gap-2">
              <Bookmark size={25} />
            </Button>
            <div>
            <Button onClick={() => setOpen(!open)} className='bg-[#D6E7FB] cursor-pointer hover:bg-[#084899] text-[#0A65CC] hover:text-white w-[13rem] px-[2rem] py-[1rem] rounded-none'>
              Apply Now →
            </Button>
            </div>
            
            </div>
            <div className='flex justify-between'>
                <div>
                    
                </div>
                <div>

            <p className='py-2'>Job expire in: <span className='text-red-600'> June 30, 2021</span></p>
                </div>
            </div>

            </div>
          </div>
        </Card>
      </div>
        
        </div>

     
<div className='flex justify-between max-w-7xl mx-auto'>
<div className='max-w-[45.875rem] '>
        <div>
           <h3 className='py-3 text-[1.25rem] text-[#18191C] font-medium'>
            Description
           </h3>
           <p className='text-[1rem] text[#5E6670]'> 
           Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet.
           </p>
           <p className='py-3'>
           Nam dapibus consectetur erat in euismod. Cras urna augue, mollis venenatis augue sed, porttitor aliquet nibh. Sed tristique dictum elementum. Nulla imperdiet sit amet quam eget lobortis. Etiam in neque sit amet orci interdum tincidunt.
           </p>
        </div>
        <div>
            <h3 className='text-[1.125rem] py-3'>Responsibilities</h3>
            <ul className='text-[#5E6670] list-disc px-4 text-[1rem] '>
                <li className='py-2'>
                Quisque semper gravida est et consectetur.
                </li>
                <li className='py-2'>
                Curabitur blandit lorem velit, vitae pretium leo placerat eget.
                </li>
                <li className='py-2'>
                Morbi mattis in ipsum ac tempus.
                </li>
                <li className='py-2'>
                vulputate turpis. Quisque ante odio, iaculis a porttitor sit amet.
                </li>
                <li className='py-2'>
                lobortis vel lectus. Nulla at risus ut diam.
                </li>
                <li className='py-2'>
                commodo feugiat. Nullam laoreet, diam placerat dapibus tincidunt.
                </li>
                <li className='py-2'>
                odio metus posuere lorem, id condimentum erat velit nec neque.
                </li>
                <li className='py-2'>
                dui sodales ut. Curabitur tempus augue.
                </li>
            </ul>
        </div>
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
          <p className="flex flex-col text-[#0A65CC] items-start gap-1"><Calendar size={26} strokeWidth={1.7}/> <span className="font-normal text-[#767F8C]">Job Posted:</span> <span className='text-black font-medium'>14 June, 2021</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start gap-1"><Calendar size={26} strokeWidth={1.7}/> <span className="font-normal text-[#767F8C]">Job Expire In:</span> <span className='text-black font-medium'>14 July, 2021</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start gap-1"><GraduationCap size={26} strokeWidth={1.7}/> <span className="font-normal text-[#767F8C]">Education:</span> <span className='text-black font-medium'>Graduation</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start gap-1"><DollarSign size={26} strokeWidth={1.7}/> <span className="font-normal text-[#767F8C]">Salary:</span> <span className='text-black font-medium'>$50k-80k/month</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start gap-1"><MapPin size={26} strokeWidth={1.7}/> <span className="font-normal text-[#767F8C]">Location:</span> <span className='text-black font-medium'>New York, USA</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start gap-1"><Briefcase size={26} strokeWidth={1.7}/> <span className="font-normal text-[#767F8C]">Job Type:</span> <span className='text-black font-medium'>Full Time</span></p>
          <p className="flex flex-col text-[#0A65CC] items-start gap-1"><Users size={26} strokeWidth={1.7}/> <span className="font-normal text-[#767F8C]">Experience:</span> <span className='text-black font-medium'>10-15 Years</span></p>
        </div>
      </Card>

      {/* Company Info */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <img src="https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png" alt="Instagram" className="w-[4rem] h-[4rem] rounded-md" />
          <div className='flex flex-col gap-2'>
            <h3 className="text-lg font-semibold">Instagram</h3>
            <p className="text-gray-500">Social networking service</p>
          </div>
        </div>
        <div className="text-gray-600 space-y-2">
          <p className='flex justify-between'><span className="font-medium">Founded:</span> March 21, 2006</p>
          <p className='flex justify-between'><span className="font-medium">Organization type:</span> Private Company</p>
          <p className='flex justify-between'><span className="font-medium">Company size:</span> 120-300 Employers</p>
          <p className='flex justify-between'><span className="font-medium">Phone:</span> (406) 555-0120</p>
          <p className='flex justify-between'><span className="font-medium">Email:</span> twitter@gmail.com</p>
          <p className='flex justify-between'><span className="font-medium">Website:</span> https://twitter.com</p>
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
</div>
<div className='max-w-7xl mx-auto grid grid-cols-3 py-5 gap-4'>
<div className='' >
          <Card  className=' border hover:shadow-lg transition'>
            <CardContent className={`flex flex-col gap-3 p-4`}>
              <div className='flex items-center gap-3'>
                <Image src='https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png' alt='Reddit' width={55} height={55} className='rounded-md' />
                <div>
                <div className='flex gap-3'>
                  <h4 className='font-semibold text-[1rem]'>Reddit</h4>
                   <Badge variant='destructive'className='bg-[#FFE0E0]  text-[#FF4F4F]'>Featured</Badge>
                </div>
                <div className='flex gap-1 items-center'>
                <MapPin className='w-4'/>
                <p className='text-[0.875rem] text-gray-400'>United Kingdom</p>
                </div>
                </div>
              </div>
             
             <h3 className='text-blue-600 font-semibold cursor-pointer text-[1.15rem]'>Marketing Officer</h3>
              <p className='text-gray-500'>Full Time • $30K-$35K </p>
            

              
            </CardContent>
          </Card>
          </div>
<div className='' >
          <Card  className=' border hover:shadow-lg transition'>
            <CardContent className={`flex flex-col gap-3 p-4`}>
              <div className='flex items-center gap-3'>
                <Image src='https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png' alt='Reddit' width={55} height={55} className='rounded-md' />
                <div>
                <div className='flex gap-3'>
                  <h4 className='font-semibold text-[1rem]'>Reddit</h4>
                   <Badge variant='destructive'className='bg-[#FFE0E0]  text-[#FF4F4F]'>Featured</Badge>
                </div>
                <div className='flex gap-1 items-center'>
                <MapPin className='w-4'/>
                <p className='text-[0.875rem] text-gray-400'>United Kingdom</p>
                </div>
                </div>
              </div>
             
             <h3 className='text-blue-600 font-semibold cursor-pointer text-[1.15rem]'>Marketing Officer</h3>
              <p className='text-gray-500'>Full Time • $30K-$35K </p>
            

              
            </CardContent>
          </Card>
          </div>
<div className=' ' >
          <Card  className=' border hover:shadow-lg transition'>
            <CardContent className={`flex flex-col gap-3 p-4`}>
              <div className='flex items-center gap-3'>
                <Image src='https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png' alt='Reddit' width={55} height={55} className='rounded-md' />
                <div>
                <div className='flex gap-3'>
                  <h4 className='font-semibold text-[1rem]'>Reddit</h4>
                   <Badge variant='destructive'className='bg-[#FFE0E0]  text-[#FF4F4F]'>Featured</Badge>
                </div>
                <div className='flex gap-1 items-center'>
                <MapPin className='w-4'/>
                <p className='text-[0.875rem] text-gray-400'>United Kingdom</p>
                </div>
                </div>
              </div>
             
             <h3 className='text-blue-600 font-semibold cursor-pointer text-[1.15rem]'>Marketing Officer</h3>
              <p className='text-gray-500'>Full Time • $30K-$35K </p>
            

              
            </CardContent>
          </Card>
          </div>
<div className='' >
          <Card  className=' border hover:shadow-lg transition'>
            <CardContent className={`flex flex-col gap-3 p-4`}>
              <div className='flex items-center gap-3'>
                <Image src='https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png' alt='Reddit' width={55} height={55} className='rounded-md' />
                <div>
                <div className='flex gap-3'>
                  <h4 className='font-semibold text-[1rem]'>Reddit</h4>
                   <Badge variant='destructive'className='bg-[#FFE0E0]  text-[#FF4F4F]'>Featured</Badge>
                </div>
                <div className='flex gap-1 items-center'>
                <MapPin className='w-4'/>
                <p className='text-[0.875rem] text-gray-400'>United Kingdom</p>
                </div>
                </div>
              </div>
             
             <h3 className='text-blue-600 font-semibold cursor-pointer text-[1.15rem]'>Marketing Officer</h3>
              <p className='text-gray-500'>Full Time • $30K-$35K </p>
            

              
            </CardContent>
          </Card>
          </div>
</div>
<div
            className={`${
                open ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a]  transition-all duration-300 flex items-center justify-center`}
        >
            <div 
                className={`${
                    open
                        ? " scale-[1] opacity-100"
                        : " scale-[0] opacity-0"
                } w-[27%]  rounded-lg transition-all duration-300 mx-auto mt-8`}
            >
                
                <form onSubmit={handleSubmit} className="max-w-lg p-6 bg-white rounded-lg  space-y-6">
      <h2 className="text-xl font-semibold">Apply Job: Senior UX Designer</h2>

      {/* Resume Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Choose Resume</label>
        <fieldset>
  <div className="relative border border-gray-300 text-gray-800 bg-white ">
    <label htmlFor="frm-whatever" className="sr-only">My field</label>
    <select className="appearance-none w-full py-1 px-2 bg-white" name="whatever" id="frm-whatever">
        <option value="">Select&hellip;</option>
      <option value="1">Item 1</option>
      <option value="2">Item 2</option>
      <option value="3">Item 3</option>
    </select>
    <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
    </div>
</div>
    </fieldset>
      </div>

      {/* Cover Letter */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
        <Textarea 
          placeholder="Write down your biography here. Let the employers know who you are..." 
          className="mt-1 h-28 w-full" 
          required 
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button  onClick={() => setOpen(!open)} type="button" variant="outline">Cancel</Button>
        <Button type='submit' className='hover:bg-[#D6E7FB] cursor-pointer bg-[#0A65CC] hover:text-[#0A65CC] text-white w-[13rem] px-[2rem] py-[1rem] rounded-none'>
              Apply Now →
            </Button>
      </div>
    </form>
                
            </div>
        </div>
       
    </div>
     
    );
};

export default page;