'use client'
import { CountryDropDown } from '@/Component/HomeComponent/CountryDropDown';
import React, { useContext } from 'react';
import { FiPhoneCall, FiSearch } from "react-icons/fi";
import './navbar.css';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ButtonCommon from '@/Component/HomeComponent/Button';
import { disableNavWithFooter } from '@/Hooks/disableNavWithFooter';
import { usePathname } from 'next/navigation';
import { AuthContext } from '@/Authentication/AuthContext';


const list = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Find Job' },
    { id: 3, name: 'Employers' },
    { id: 4, name: 'Candidates' },
    { id: 5, name: 'Pricing Plans' },
    { id: 6, name: 'Customer Supports' },
];

const Navbar = () => {
    const path = usePathname()
    const authContext = useContext(AuthContext);
    const currentUser = authContext?.currentUser;
    
    
    return (
        <>
        {
            !disableNavWithFooter.includes(path) && (
                <div className='fixed z-50 w-full mx-auto'>
            {/* Top Navbar */}
            <div className='  bg-[#F1F2F4]'>
            <div className='flex max-w-7xl mx-auto justify-between py-3 mx-auto '>
                <nav>
                    <ul className='flex justify-around gap-4 relative'>
                        {list.map((link) => (
                            <li key={link.id} className="relative">
                                <Link href={link.id === 1 ? '/' : `/${link.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                    <p className="bar text-base">{link.name}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className='flex gap-3 items-center'>
                    <p className='flex gap-3 items-center text-base'>
                        <FiPhoneCall /> +1-202-555-0178
                    </p>
                    <CountryDropDown />
                </div>
            </div>
            </div>

            <div className='border bg-white shadow-sm'>
            <div className='flex max-w-7xl mx-auto flex-row justify-between  py-4 items-center'>
                {/* Left Side - Logo & Search */}
                <div className='flex gap-11 items-center'>
                    {/* Logo */}
                    <div className='flex items-center gap-2'>
                        <Image
                            src="https://res.cloudinary.com/diez3alve/image/upload/v1740414466/briefcase_1_l2uamk.png"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                        <p className='text-2xl font-semibold'>MyJob</p>
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center gap-2 bg-white rounded-sm border flex-row-reverse w-[500px] px-3 py-1">
                        <Input type="text" placeholder="Search..." className="flex-1 border-none focus:outline-none outline-none px-2" />
                        <FiSearch className="text-blue-500 text-lg" />

                        <Select>
                            <SelectTrigger className="w-32 shadow-none focus:outline-none border-none bg-transparent">
                                <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent className="border-none shadow-md focus:outline-none">
                                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                <SelectItem value="usa">United States</SelectItem>
                                <SelectItem value="Nepal">Nepal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Right Side - Buttons */}
                <div className='flex gap-4'>
                <Link href="/signin" className="">
                    <Button variant="outline" className="px-6 py-4  border-gray-300 rounded-sm text-gray-700">Sign In</Button>
                </Link>
                <Link href='/'>
                
                    <ButtonCommon name='Post A Post' />
                </Link>
                </div>
            </div>
            </div>
            {/* Logo, Search Bar & Buttons */}
        </div>
            )
        }
        </>
    );
};

export default Navbar;
