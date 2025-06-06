import Banner from "@/Component/HomeComponent/Banner";
import FeaturedJobs from "@/Component/HomeComponent/FeaturedJobs";
import JobPilotSteps from "@/Component/HomeComponent/JobPilotSteps";
import PopularCategory from "@/Component/HomeComponent/PopularCategory";
import PopularVacancies from "@/Component/HomeComponent/PopularVacancies";
import TopCompany from "@/Component/HomeComponent/TopCompany";
import RegisterCards from "@/Component/HomeComponent/RegisterCards";
import ClientsTestimonials from "@/Component/HomeComponent/ClientsTestimonials";
import {ReactLenis} from '@/lib/lenis'


export default function Home() {
  return (
      <ReactLenis root>
        <div className="">
     <Banner/>
     <PopularVacancies/>
     <JobPilotSteps/>
     <PopularCategory/>
     <FeaturedJobs/>
     <TopCompany/>
     <ClientsTestimonials/>
     <RegisterCards/>
    </div>
  </ReactLenis>
    
  );
}
