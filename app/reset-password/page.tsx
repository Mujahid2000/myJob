'use client';
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { useResetPasswordMutation } from "@/RTKQuery/authSlice";

type Inputs = {
  password: string;
  confirmPassword: string;
};

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const password = watch("password");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!token) {
      setMessage("Invalid token");
      return;
    }
    if (data.password !== data.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      await resetPassword({ token, password: data.password }).unwrap();
      setMessage("Password reset successful! Redirecting to sign in...");
      setTimeout(() => router.push("/signin"), 3000);
    } catch (err: any) {
      setMessage(err?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg text-center">
        <Link href='/' className="mb-8 flex items-center justify-center gap-2">
          <Image src="https://res.cloudinary.com/diez3alve/image/upload/v1740570665/briefcase-duotone_1_woenpy.svg" alt="MyJob" width={32} height={32} />
          <h2 className="text-xl font-semibold">MyJob</h2>
        </Link>
        
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <p className="text-gray-600 mb-6">Enter your new password below.</p>

        {message && (
          <div className={`p-3 mb-4 rounded text-center ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} {...register("password")} required placeholder="New Password" />
            <Eye onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer right-3 top-3 text-gray-400" size={18} />
          </div>
          <Input type="password" {...register("confirmPassword")} required placeholder="Confirm New Password" />
          
          <Button type="submit" disabled={isLoading || isSuccess} className="w-full bg-[#0A65CC] hover:bg-[#0A65CC]/90 text-white">
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
