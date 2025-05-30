"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Phone, ChevronDown, Briefcase, Menu } from "lucide-react"
import Image from "next/image"
import { useContext, useEffect, useRef, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import './navbar.css'
import { usePathname } from "next/navigation"
import { AuthContext } from "@/Authentication/AuthContext"
import { disableNavWithFooter } from "@/Hooks/disableNavWithFooter"
import ButtonCommon from "@/Component/HomeComponent/Button"
import { DialogTitle } from "@/components/ui/dialog"
export default function Navbar() {
  const navigationLinks = [
    { name: "Home", href: "/", active: true, id: 1 },
    { name: "Find Job", href: "/find-job", active: false, id: 2 },
    { name: "Employers", href: "/employers", active: false, id: 3 },
    { name: "Candidates", href: "/candidates", active: false, id: 4 },
    { name: "Pricing Plans", href: "/price-plans", active: false, id: 5 },
    { name: "Customer Supports", href: "/customer-supports", active: false, id: 6 },
  ]
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const path = usePathname()
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const logOut: (() => Promise<void>) | undefined = authContext?.logout;
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      if (logOut) {
        await logOut();
        
      } else {
        console.error('Logout function is not defined.');
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const singleName = currentUser?.displayName?.split(' ');
  const firstName = singleName ? singleName[0] : 'User';

  return (
    <>
    {
      !disableNavWithFooter.includes(path) && (
      <div className="w-full bg-white border-b fixed top-0 left-0 right-0 z-50 shadow-sm">
      {/* Top Navigation - Hidden on mobile */}
      <nav className="hidden lg:flex items-center justify-between   py-3 max-w-7xl mx-auto">
        <ul className="flex items-center space-x-6 xl:space-x-8">
         
            {navigationLinks.map((link, index) => (
                            <li key={link.id} className="relative ">
                                <Link href={link.id === 1 ? '/' : `/${link.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                    <p className="bar text-base">{link.name}</p>
                                </Link>
                            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          <div className="hidden xl:flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <span className="text-sm">+1-202-555-0178</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-gray-900">
              <Image src="https://res.cloudinary.com/diez3alve/image/upload/v1748450608/image_1_t9kjf2.png" alt="US Flag" width={24} height={16} className="mr-2" />
              <span className="text-sm">English</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Spanish</DropdownMenuItem>
              <DropdownMenuItem>French</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Main Header */}
      <div className=" px-6 lg:px-1 py-3 sm:py-4 max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8  rounded flex items-center justify-center">
               <Link href="/" className="flex items-center">
               <Image
                            src="https://res.cloudinary.com/diez3alve/image/upload/v1740414466/briefcase_1_l2uamk.png"
                            alt="Logo"
                            width={40}
                            height={40}
                        />

                      </Link>
              </div>
              <span className="text-2xl font-bold text-gray-900">MyJob</span>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-sm border flex-row-reverse max-w-full xl:w-[500px] px-3 py-1">
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

          {/* Action Buttons */}
          <div className="flex items-center gap-5">
            {
                    currentUser? 
                    
                    <div className="relative" ref={menuRef}>
                    {/* Profile button */}
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                    >
                      <span>{firstName || currentUser.email}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
              
                    {/* Dropdown menu */}
                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                        <Link
                          href="/company-dashboard/employer-profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          Profile
                        </Link>
                         <Link
                          href="/company-dashboard/Post-a-Job"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          Post A Job
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                  :
              <Link href="/signin" className="">
                    <button  className="px-3 text-sm lg:px-6 py-4  border-gray-300 rounded-sm text-gray-700">Sign In</button>
                </Link>
                }
                <Link href={"/company-dashboard/Post-a-Job"}>
                
            <ButtonCommon name='Post A Post' />
                </Link>
                
            
          </div>
        </div>

        {/* Mobile & Tablet Layout */}
        <div className="lg:hidden ">
          <div className="flex items-center justify-between mb-4">
            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button>
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 px-5">
                <div className="flex flex-col space-y-4 mt-8">
                  <DialogTitle></DialogTitle>
                  {navigationLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`text-lg font-medium py-2 transition-colors`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}

                  <div className="border-t pt-4 mt-6">
                    <div className="flex items-center text-gray-600 mb-4">
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="text-sm">+1-202-555-0178</span>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-gray-900">
                        <Image
                          src="https://res.cloudinary.com/diez3alve/image/upload/v1748450608/image_1_t9kjf2.png"
                          alt="US Flag"
                          width={24}
                          height={16}
                          className="mr-2"
                        />
                        <span className="text-sm">English</span>
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>English</DropdownMenuItem>
                        <DropdownMenuItem>Spanish</DropdownMenuItem>
                        <DropdownMenuItem>French</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8  rounded flex items-center justify-center">
                 <Link href="/" className="flex items-center">
                 <Image
                            src="https://res.cloudinary.com/diez3alve/image/upload/v1740414466/briefcase_1_l2uamk.png"
                            alt="Logo"
                            width={40}
                            height={40}
                        />

                      </Link>
                </div>
                <span className="text-lg sm:text-xl font-bold text-gray-900">MyJob</span>
              </div>

            
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex items-center space-x-2">
              {
                    currentUser? 
                    
                    <div className="relative" ref={menuRef}>
                    {/* Profile button */}
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                    >
                      <span>{firstName || currentUser.email}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
              
                    {/* Dropdown menu */}
                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                        <Link
                          href="/company-dashboard/employer-profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          href="/company-dashboard/Post-a-Job"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          Post A Job
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                  :
              <Link href="/signin" className="">
                    <button  className="px-3 text-sm lg:px-6 py-4  border-gray-300 rounded-sm text-gray-700">Sign In</button>
                </Link>
                }
             
            </div>
          </div>

          {/* Search Bar - Mobile & Tablet Full Width */}
          <div className="flex items-center gap-2 bg-white rounded-sm border flex-row-reverse max-w-full xl:w-[500px] px-3 py-1">
                        <Input type="text" placeholder="Search..." className="flex-1 border-none focus:outline-none outline-none px-2" />
                        <FiSearch size={15} className="text-blue-500 text-lg" />

                        <Select >
                            <SelectTrigger className="w-20 px-0 shadow-none focus:outline-none border-none bg-transparent">
                                <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent className="border-none text-base shadow-md focus:outline-none">
                                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                <SelectItem value="usa">United States</SelectItem>
                                <SelectItem value="Nepal">Nepal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                
        </div>
      </div>
    </div>
      
      )
    }
    </>
  )
}
