'use client';
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useForgotPasswordMutation } from "@/RTKQuery/authSlice";
import { useState } from "react";

type Inputs = {
  email: string;
};

export default function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [forgotPassword, { isLoading, isSuccess, isError, error }] = useForgotPasswordMutation();
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await forgotPassword(data).unwrap();
      setMessage("Check your email for the reset link!");
    } catch (err: any) {
      setMessage(err?.data?.message || "Failed to send reset email");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <Link href='/' className="mb-8 flex items-center justify-center gap-2">
          <Image src="https://res.cloudinary.com/diez3alve/image/upload/v1740570665/briefcase-duotone_1_woenpy.svg" alt="MyJob" width={32} height={32} />
          <h2 className="text-xl font-semibold">MyJob</h2>
        </Link>
        
        <h1 className="text-2xl font-bold text-center mb-4">Forgot Password</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {message && (
          <div className={`p-3 mb-4 rounded text-center ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("email")} required type="email" placeholder="Email address" className="rounded-sm" />
          <Button type="submit" disabled={isLoading} className="w-full bg-[#0A65CC] hover:bg-[#0A65CC]/90 text-white py-2 rounded-sm">
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/signin" className="text-[#0A65CC] hover:underline">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}
