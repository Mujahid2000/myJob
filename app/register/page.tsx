'use client';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye } from "lucide-react";
import Image from "next/image";
import '../signin/signin.css'
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useContext, useState } from 'react';
import { AuthContext, AuthContextType } from '@/Authentication/AuthContext';
import { redirect } from 'next/navigation';



interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
}
  
export default function Page() {
  const { register, handleSubmit,  formState: { errors } } = useForm<Inputs>();
  const [password , setPassword] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [showPassword, setShowpassword] = useState<boolean | undefined>()
  const authContext = useContext<AuthContextType | undefined>(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is undefined. Ensure it is properly provided.");
  }

  const {currentUser, signup } = authContext;



  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    if (data.password !== data.confirm_password) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    if (data.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setError(undefined); // Clear any previous errors
    setPassword(data.password);
    
    signup(data.firstName + ' ' + data.lastName, data.email, data.confirm_password)
  if(currentUser){
    redirect('/')
  }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 max-w-xl mx-auto flex flex-col justify-between px-16 bg-white">
        <Link href='/' className="mb-8 py-2 flex items-center gap-2">
          <Image src="https://res.cloudinary.com/diez3alve/image/upload/v1740570665/briefcase-duotone_1_woenpy.svg" alt="MyJob" width={32} height={32} />
          <h2 className="text-xl font-semibold">MyJob</h2>
        </Link>
        
        <div className="">
        <div className="flex items-center justify-between">
        <div>
        <h1 className="text-[2rem] text-[#18191C] font-bold mb-2">Create account.</h1>
        <p className="text-gray-500 mb-6">
        Already have account? <Link href="/signin" className="text-[#0A65CC]">Log In</Link>
        </p>
        </div>
        <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Employee">Employee</SelectItem>
          <SelectItem value="Applicant">Applicant</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>
      

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-8">
                <div>
            <Input {...register('firstName')}  required type="text" placeholder="First Name" className="rounded-sm w-[13rem] "/>
                </div>
          <div className="relative">
          <Input {...register('lastName', { required: true })} required type="text" placeholder="Last Name" className="rounded-sm w-[13rem] "/>
          </div>
          {errors.lastName && <p>Last name is required.</p>}
            </div>
          <Input {...register('email', { required: true })} required type="email" placeholder="Email address" className="rounded-sm"/>
            <div className="relative">
            <Input
              {...register('password')}
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="rounded-sm"
            />
            <Eye
              onClick={() => setShowpassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              size={18}
            />
            </div>
            <div className="relative">
            <Input
              {...register('confirm_password')}
              required
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="rounded-sm"
            />
            <Eye
              onClick={() => setShowpassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              size={18}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" required/>
              <label htmlFor="remember">Remember Me</label>
            </div>
            <a href="#" className="text-[#0A65CC]">Forgot password?</a>
          </div>
          <Button type="submit" className="w-full cursor-pointer p-[1rem] rounded-sm bg-[#0A65CC] hover:bg-[#0A65CC] text-white">Sign In →</Button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="px-4 text-gray-500">or</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="flex gap-4">
          <Button  className="w-[33rem] hover:text-white bg-white text-[#474C54] cursor-pointer rounded-sm flex items-center gap-2 border border-gray-300">
            <Image src='https://res.cloudinary.com/diez3alve/image/upload/v1740758529/Employers_Logo_2_eyvdlw.png' alt="google"  width={18}  height={18}className="text-blue-500 hover:text-white"/> Sign in with Facebook
          </Button>
          <Button className="w-[33rem] hover:text-white bg-white flex text-[#474C54] cursor-pointer rounded-sm items-center gap-2 border border-gray-300">
            <Image src="https://res.cloudinary.com/diez3alve/image/upload/v1740756553/google_g2hwru.png" alt="fb" width={18} height={18}/> Sign in with Google
          </Button>
        </div>
        </div>
        <div>

        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-cover bg-center relative" style={{ backgroundImage: 'url(https://res.cloudinary.com/diez3alve/image/upload/v1740750261/Image_p8otkz.png)' }}>
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-xl font-semibold">Over 1,75,324 candidates waiting for good employees.</h2>
          <div className="flex gap-6 mt-4">
            <div className="text-center">
              <p className="text-lg font-bold">1,75,324</p>
              <p className="text-sm">Live Jobs</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">97,354</p>
              <p className="text-sm">Companies</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">7,532</p>
              <p className="text-sm">New Jobs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
