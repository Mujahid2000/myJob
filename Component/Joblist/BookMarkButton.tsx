'use client'
import { AuthContext } from '@/Authentication/AuthContext';
import { Button } from '@/components/ui/button';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useBookMarkDataPostMutation } from '@/RTKQuery/BookMarkSliceApi';
import { Bookmark } from 'lucide-react';
import React, { useContext } from 'react';
import { Toaster, toast } from 'sonner'

interface jobData {
  _id: string;
  userId: string;
  companyId: string;
  companyName: string;
  tags: string[];
  jobRole: string;
  salaryType: string;
  minSalary: number;
  maxSalary: number;
  education: string;
  experience: string;
  jobType: string;
  expireDate: string;
  vacancy: string;
  jobLevel: string;
  description: string;
  responsibilities: string;
  location: string;
  status: string;
  title: string;
  promotedSystem?: string | null;
  logo?: string | null;
}

const BookMarkButton = ({ jobData }: { jobData: jobData }) => {
    const [Bookmarks, {isLoading: bookMarksLoading}] = useBookMarkDataPostMutation();
    const authContext = useContext(AuthContext);
    const currentUser = authContext?.currentUser;
    const { data: userEmail } = useGetUserByIdQuery(currentUser?.email || '');
    const userEmailAd = userEmail?.user?.email;



    const handleOnclick = async (data: jobData) =>{
        const jobId = data._id;
        const companyId = data.companyId;
        const userId = data.userId;
        const email = userEmailAd;
        try {
        const res = await Bookmarks({ jobId, companyId, userId, email:email || '' }).unwrap();
        if (res.success) toast.success(res.message);
        else toast.warning(res.message);
        } catch (err) {
        toast.error('Something went wrong');
        console.error(err);
        }

    }

    
    return (
        <div>
            <Button onClick={()=> handleOnclick(jobData)} variant="ghost" className="cursor-pointer">
                    <Bookmark />
            </Button>
            <Toaster richColors  />

        </div>
    );
};

export default BookMarkButton;