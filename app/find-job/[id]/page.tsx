import JobDetails from "@/Component/signleJob/JobDetails";
import Modal from "@/Component/signleJob/Modal";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id

  // fetch post information
  const data = await fetch(`https://job-server-fqvf.onrender.com/jobs/jobPost/${id}`);
  const posts = await data.json();
  const singlePost = posts?.data

  return {
    title: singlePost.title,
    description: "" + singlePost.title + " - " + singlePost.companyName + " Hiring For " + singlePost.jobType + " Position",
  }
}

export default async function Page({ params, }: { params: Promise<{ id: string }> }) {
  const { id } = await params;



  return (
    <div className="pt-30 lg:pt-33">
      <JobDetails id={id} />
      <Modal />
    </div>
  );
}
