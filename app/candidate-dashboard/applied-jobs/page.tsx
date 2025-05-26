import { PaginationDemo } from "@/Component/candidates-component/Pagination";
import AppliedJobs from "@/Component/Dashboard/AppliedJobs/AppliedJobs";

export default function AppliedJobsPage() {
    return (
      <div>
        <AppliedJobs/>
        <PaginationDemo itemsPerPage={10} candidates='' />
      </div>
    );
  }