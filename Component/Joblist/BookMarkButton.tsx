"use client"
import { AuthContext } from "@/Authentication/AuthContext"
import { Button } from "@/components/ui/button"
import { useGetUserByIdQuery } from "@/RTKQuery/authSlice"
import { useBookMarkDataPostMutation } from "@/RTKQuery/BookMarkSliceApi"
import { Bookmark, Loader2 } from "lucide-react"
import { useContext, useState } from "react"
import { toast, Toaster } from "sonner"

interface JobData {
  _id: string
  userId: string
  companyId: string
  companyName: string
  tags: string[]
  jobRole: string
  salaryType: string
  minSalary: number
  maxSalary: number
  education: string
  experience: string
  jobType: string
  expireDate: string
  vacancy: string
  jobLevel: string
  description: string
  responsibilities: string
  location: string
  status: string
  title: string
  promotedSystem?: string | null
  logo?: string | null
}

const BookMarkButton = ({ jobData }: { jobData: JobData }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
   const authContext = useContext(AuthContext);
    const currentUser = authContext?.currentUser;
    const { data: userEmail, error: userEmailError, isLoading: isUserLoading } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
    const usersEmail = userEmail?.user?.email || '';
  const [isLoading, setIsLoading] = useState(false)
  const [postBookMark] = useBookMarkDataPostMutation()
  const handleOnclick = async (data: JobData) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const resultBookmark = await postBookMark({
        userId: data.userId,
        companyId: data.companyId,
        jobId: data._id,
        email: usersEmail // Replace with actual user email
      }).unwrap()

      setIsBookmarked((prev) => !prev)
      toast.success(isBookmarked && resultBookmark.message ? resultBookmark.message : "Bookmarked successfully")
    } catch (err) {
      toast.error("Something went wrong")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <button
      onClick={() => handleOnclick(jobData)}
      className="cursor-pointer relative hover:bg-gray-100"
      disabled={isLoading}
      title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
      ) : (
        <Bookmark
          className={`h-5 w-5 transition-colors ${
            isBookmarked ? "fill-blue-500 text-blue-500" : "text-gray-500 hover:text-gray-700"
          }`}
        />
      )}
    </button>
    <Toaster richColors/> 
    </>
    
  )
}

export default BookMarkButton
