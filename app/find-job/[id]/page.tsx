import JobDetails from "@/Component/signleJob/JobDetails";
import Modal from "@/Component/signleJob/Modal";

  export default async  function Page({ params, }: {params:Promise< { id: string }>}) {
    const { id } = await params;

    return (
     <div className="pt-36">
      <JobDetails id={id} />
      <Modal  />
     </div>
    );
  }
