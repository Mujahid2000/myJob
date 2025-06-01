import SuggestJob from "@/Component/employee-Component/SuggestJob";
import OpenJobPositionsModal from "@/Component/signleJob/OpenJobPositionModal";
import OpenPositionButton from "@/Component/signleJob/OpenPositionButton";
import SafeHtml from "@/Component/signleJob/SafeHtml";
import SafeResponsibilities from "@/Component/signleJob/SafeResponsibilities";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { BriefcaseBusiness, Calendar, DollarSign, Globe, GraduationCap, Mail, Timer, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaPhone, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";

interface UserId {
  id: string;
}

export default async function Page({ params }: { params: Promise<UserId> }) {
  let resolveId: UserId;

  // Resolve params
  try {
    resolveId = await params;
    if (!resolveId.id) {
      throw new Error("Invalid company ID");
    }
  } catch (error) {
    console.error('Error resolving params:', error);
    return (
      <div className="text-center text-red-500 pt-20">
        Error loading parameters: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  // Fetch company data
  let singleCompany = null;
  try {
    const response = await fetch(`https://serverjob.vercel.app/jobs/getSingleCompanyData/${resolveId.id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch company data: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || typeof data !== 'object' || !data.data) {
      throw new Error('Invalid response format from API');
    }

    singleCompany = data.data;
  } catch (error) {
    console.error('Error fetching company data:', error);
    return (
      <div className="text-center text-red-500 pt-20">
        Error fetching company data: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  // Format date
  const yearOfEstablishment = singleCompany.yearEstablished?.split('T')?.[0] || "N/A";

  function formatDateToOrdinal(dateString: string) {
    if (!dateString || dateString === "N/A") return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";

    const day = date.getDate();
    const month = date.toLocaleDateString('en-GB', { month: 'long' });
    const year = date.getFullYear();

    const getOrdinalSuffix = (day: number) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  }

  const formattedDate = formatDateToOrdinal(yearOfEstablishment);

  return (
    <div className="pt-33">
      <div className="border-2 bg-[#F1F2F4]">
        <div className="max-w-7xl bg-[#F1F2F4] mx-auto py-3">
          <div className="bg-[#F1F2F4] py-2">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center py-3 max-w-7xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800">Single Employers</h3>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">Find Employees</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">Single Employers</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* company header section */}
        <div
  className="h-[312px] w-full flex items-center justify-center p-4 bg-cover bg-center"
  style={{
    backgroundImage: `url(${singleCompany?.banner || '/default-banner.jpg'})`,
  }}
>
  <div className="w-full max-w-full sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto">
    <Card className="w-full border-gray-200 bg-white rounded-lg shadow-sm mt-75 px-0">
      <CardContent className="flex flex-col sm:flex-row items-center justify-between px-0 lg:px-6">
        <div className="flex items-center gap-4">
          <img
            src={singleCompany?.logo || "https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png"}
            alt={singleCompany?.companyName || "company logo"}
            
            className="rounded-lg border-2 w-20 lg:w-24 h-20 lg:h-24 border-white"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{singleCompany?.companyName || "N/A"}</h2>
            <p className="text-sm text-gray-500">{singleCompany?.industryTypes || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-center mt-4 sm:mt-0">
          {/* <Button className="hover:bg-[#D6E7FB] hover:text-[#0A65CC] bg-[#084899] text-white px-6 py-6 rounded-sm transition-colors duration-200">
            View Open Position →
          </Button> */}
          <OpenPositionButton companyId={resolveId.id} companyindustry={singleCompany.industryTypes} logo={singleCompany.logo} companyname={singleCompany.companyName}/>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
{/* end of company header section */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-9 pb-5 pt-30 justify-between max-w-7xl mx-auto">
          <div className="max-w-[45.875rem]">
            
            <div className="mb-6 px-3">
              <h2 className="py-4 text-xl text-[#18191C] px-3 lg:px-0 font-medium">About Company</h2>
              <SafeResponsibilities html={singleCompany?.biography || "<p>No benefits description available.</p>"} />
              
            </div>
            <div className="mb-6 px-3">
              <CardTitle className="text-xl px-3 lg:px-0 text-[#18191C] font-medium">Company Vision</CardTitle>
              <SafeHtml html={singleCompany?.companyVision || "<p>No vision statement available.</p>"} />
             
            </div>
            <div className="flex flex-col gap-3 lg:flex-row items-start lg:items-center space-x-2 px-4 lg:px-3 ">
              <span className="text-gray-700">Share this job:</span>
              <div className="flex gap-3">
              <Button variant="outline" className="flex items-center space-x-1 lg:space-x-2">
                <FaFacebook className="text-blue-600" />
                <span>Facebook</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-1 lg:space-x-2">
                <FaTwitter className="text-blue-400" />
                <span>Twitter</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-1 lg:space-x-2">
                <FaPinterest className="text-red-600" />
                <span>Pinterest</span>
              </Button>
              </div>
              
            </div>
          </div>

          <div className="flex flex-col  px-3 gap-5">
            <Card className="p-6 max-h-[23rem] w-full lg:w-[30rem]">
              <div className="grid grid-cols-2 gap-6 text-gray-600">
                <p className="flex flex-col text-[#0A65CC] items-start gap-1">
                  <Calendar size={26} strokeWidth={1.7} />
                  <span className="font-normal uppercase text-[#767F8C]">Founded In:</span>
                  <span className="text-black font-medium">{formattedDate}</span>
                </p>
                <p className="flex flex-col text-[#0A65CC] items-start gap-1">
                  <Timer size={26} strokeWidth={1.7} />
                  <span className="font-normal uppercase text-[#767F8C]">Organization Type:</span>
                  <span className="text-black font-medium">{singleCompany?.organizationType || "N/A"}</span>
                </p>
                <p className="flex flex-col text-[#0A65CC] items-start gap-1">
                  <Wallet size={26} strokeWidth={1.7} />
                  <span className="font-normal uppercase text-[#767F8C]">Team Size:</span>
                  <span className="text-black font-medium">{singleCompany?.teamSize || "N/A"}</span>
                </p>
                <p className="flex flex-col text-[#0A65CC] items-start gap-1">
                  <BriefcaseBusiness size={26} strokeWidth={1.7} />
                  <span className="font-normal uppercase text-[#767F8C]">Industry Type:</span>
                  <span className="text-black font-medium">{singleCompany?.industryTypes || "N/A"}</span>
                </p>
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Globe className="text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">WEBSITE</p>
                    <a href={singleCompany?.companyWebsite || "#"}>{singleCompany?.companyWebsite || "N/A"}</a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-blue-600" size={21} />
                  <div>
                    <p className="text-sm text-gray-500">PHONE</p>
                    <p className="text-gray-700">{singleCompany?.phoneNumber || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-500">EMAIL ADDRESS</p>
                    <a href={`mailto:${singleCompany?.email || ""}`}>{singleCompany?.email || "N/A"}</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card >
              <CardHeader>
                <CardTitle>Follow us on:</CardTitle>
              </CardHeader>
              <CardContent className="flex space-x-4">
                {singleCompany?.socialLink?.length ? (
                  singleCompany.socialLink.map((social: any, index: number) => (
                    <Link
                      key={index}
                      href={social.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:bg-[#0A65CC] bg-[#E7F0FA] transition-colors duration-300 p-3"
                    >
                      {social.platform === "Facebook" && (
                        <FaFacebook className="text-blue-600 hover:text-white transition-colors duration-300" />
                      )}
                      {social.platform === "Twitter" && (
                        <FaTwitter className="text-blue-400 hover:text-white transition-colors duration-300" />
                      )}
                      {social.platform === "Instagram" && (
                        <FaInstagram className="text-pink-600 hover:text-white transition-colors duration-300" />
                      )}
                      {social.platform === "YouTube" && (
                        <FaYoutube className="text-red-600 hover:text-white transition-colors duration-300" />
                      )}
                    </Link>
                  ))
                ) : (
                  <p>No social links available.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <SuggestJob />
      <OpenJobPositionsModal />
    </div>
  );
}