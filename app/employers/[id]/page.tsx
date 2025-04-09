import SuggestJob from "@/Component/employee-Component/SuggestJob";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, Globe, GraduationCap, Mail } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaFacebook, FaInstagram, FaPhone, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";

const page = ({ params }) => {
    return (
        <div className="pt-35">
            <div className="border-2 bg-[#F1F2F4]">
                <div className="max-w-7xl bg-[#F1F2F4] mx-auto py-3">
                    <div className="bg-[#F1F2F4] py-2">
                        <div className="flex justify-between items-center py-3 max-w-7xl mx-auto">
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
                <div className="h-[312px] max-w-full mx-auto flex items-center justify-center p-4 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.pexels.com/photos/5989062/pexels-photo-5989062.jpeg')",
                    }}
                >
                    <div className="relative z-10">
                        <div className="max-w-7xl mx-auto">
                            <Card className="min-w-7xl border-gray-200 bg-white rounded-lg shadow-sm mt-75 mx-4 md:mx-0">
                                <CardContent className="flex items-center justify-between p-6">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src="https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png"
                                            alt="company logo"
                                            width={80}
                                            height={80}
                                            className="rounded-lg border-2 border-white"
                                        />
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Twitter</h2>
                                            <p className="text-sm text-gray-500">Information Technology (IT)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Button className="hover:bg-[#D6E7FB] hover:text-[#0A65CC] bg-[#084899] text-white px-6 cursor-pointer py-6 rounded-sm transition-colors duration-200">
                                            View Open Position →
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="flex gap-9 pb-5 pt-30 justify-between max-w-7xl mx-auto">
                    <div className="max-w-[45.875rem]">
                        <div>
                            <h3 className="py-3 text-[1.25rem] text-[#18191C] font-medium">Description</h3>
                            <p className="text-[1rem] text[#5E6670]">
                            Fusce et erat at nibh maximus fermentum. Mauris ac justo nibh. Praesent nec lorem lorem. Donec ullamcorper lacus mollis tortor pretium malesuada. In quis porta nisi, quis fringilla orci. Donec porttitor, odio a efficitur blandit, orci nisl porta elit, eget vulputate quam nibh ut tellus. Sed ut posuere risus, vitae commodo velit. Nullam in lorem dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla tincidunt ac quam quis vehicula. Quisque sagittis ullamcorper magna. Vivamus elementum eu leo et gravida. Sed dignissim placerat diam, ac laoreet eros rutrum sit amet. Donec imperdiet in leo et imperdiet. In hac habitasse platea dictumst. Sed quis nisl molestie diam ullamcorper condimentum. Sed aliquet, arcu eget pretium bibendum, odio enim rutrum arcu, quis suscipit mauris turpis in neque. Vestibulum id vestibulum odio. Sed dolor felis, iaculis eget turpis eu, lobortis imperdiet massa.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h2 className="py-4 text-xl text-[#18191C] font-medium">Company Benefits</h2>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>In hac habitasse platea dictumst.</li>
                                <li>Sed aliquet, arcu eget pretium bibendum, odio enim rutrum arcu.</li>
                                <li>Vestibulum id vestibulum odio.</li>
                            </ul>
                        </div>
                        <div>
                            <CardTitle className="text-xl text-[#18191C] font-medium">Company Vision</CardTitle>
                            <p className="py-3 text-gray-700">
                                Praesent ultrices mauris at nisi euismod, ut venenatis augue blandit.
                            </p>
                        </div>
                        <div className="flex items-center space-x-2 py-[2rem]">
                            <span className="text-gray-700">Share this job:</span>
                            <Button variant="outline" className="flex items-center space-x-2">
                                <FaFacebook className="text-blue-600" />
                                <span>Facebook</span>
                            </Button>
                            <Button variant="outline" className="flex items-center space-x-2">
                                <FaTwitter className="text-blue-400" />
                                <span>Twitter</span>
                            </Button>
                            <Button variant="outline" className="flex items-center space-x-2">
                                <FaPinterest className="text-red-600" />
                                <span>Pinterest</span>
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <Card className="p-6 max-h-[23rem] w-[30rem]">
                            <div className="grid grid-cols-2 gap-6 text-gray-600">
                                <p className="flex flex-col text-[#0A65CC] items-start gap-1">
                                    <Calendar size={26} strokeWidth={1.7} />
                                    <span className="font-normal text-[#767F8C]">Job Posted:</span>
                                    <span className="text-black font-medium">14 June, 2021</span>
                                </p>
                                <p className="flex flex-col text-[#0A65CC] items-start gap-1">
                                    <GraduationCap size={26} strokeWidth={1.7} />
                                    <span className="font-normal text-[#767F8C]">Education:</span>
                                    <span className="text-black font-medium">Graduation</span>
                                </p>
                                <p className="flex flex-col text-[#0A65CC] items-start gap-1">
                                    <DollarSign size={26} strokeWidth={1.7} />
                                    <span className="font-normal text-[#767F8C]">Salary:</span>
                                    <span className="text-black font-medium">$50k-80k/month</span>
                                </p>
                            </div>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Globe className="text-blue-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">WEBSITE</p>
                                        <a href="http://www.estherhoward.com">www.estherhoward.com</a>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaPhone className="text-blue-600" size={21} />
                                    <div>
                                        <p className="text-sm text-gray-500">PHONE</p>
                                        <p className="text-gray-700">+1-202-555-0141</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="text-blue-600" size={24} />
                                    <div>
                                        <p className="text-sm text-gray-500">EMAIL ADDRESS</p>
                                        <a href="mailto:esther.howard@gmail.com">esther.howard@gmail.com</a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Follow us on:</CardTitle>
                            </CardHeader>
                            <CardContent className="flex space-x-4">
                                <button className=" cursor-pointer hover:bg-[#0A65CC] bg-[#E7F0FA] transition-colors duration-300 p-3">
                                    <FaFacebook className="text-blue-600 hover:text-white transition-colors duration-300" />
                                </button>
                                <button  className=" cursor-pointer hover:bg-[#0A65CC] bg-[#E7F0FA] transition-colors duration-300 p-3">
                                    
                                        <FaTwitter className="text-blue-400" />
                                   
                                </button>
                                <button  className=" cursor-pointer hover:bg-[#0A65CC] bg-[#E7F0FA] transition-colors duration-300 p-3">
                                    
                                        <FaInstagram className="text-pink-600" />
                                 
                                </button>
                                <button  className=" cursor-pointer hover:bg-[#0A65CC] bg-[#E7F0FA] transition-colors duration-300 p-3">
                                   
                                        <FaYoutube className="text-red-600" />
                                   
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <SuggestJob/>
        </div>
    );
};

export default page;
