import JobDetails from "@/Component/signleJob/JobDetails";
import Modal from "@/Component/signleJob/Modal";

  export default async  function Page({ params }: { params: { id: string } }) {
    const JobId = params.id;

    return (
     <div className="pt-36">
      <JobDetails id={JobId} />
      <Modal open={false} modalOpen={true} />
     </div>
    );
  }
