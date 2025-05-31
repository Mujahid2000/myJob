import JobDetails from "@/Component/signleJob/JobDetails";
import Modal from "@/Component/signleJob/Modal";

  export default async  function Page({ params, }: {params:Promise< { id: string }>}) {
    const { id } = await params;

    return (
     <div className="pt-30 lg:pt-33">
      <JobDetails id={id} />
      <Modal  />
     </div>
    );
  }
