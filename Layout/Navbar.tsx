
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Phone, ChevronDown, Briefcase, Menu, User, LogOut, Bell, Settings } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import './navbar.css';
import { usePathname } from "next/navigation";
import { AuthContext } from "@/Authentication/AuthContext";
import { disableNavWithFooter } from "@/Hooks/disableNavWithFooter";
import ButtonCommon from "@/Component/HomeComponent/Button";
import { DialogTitle } from "@/components/ui/dialog";
import { FaUsers } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUserByIdQuery } from "@/RTKQuery/authSlice";
import { Badge } from "@/components/ui/badge";
import io from 'socket.io-client';
import { useGetNotificationsQuery } from "@/RTKQuery/NotificationApi";
import NavSearch from "@/Component/NavbarComponent/NavSearch";
import { useLenis } from "lenis/react";

// Socket.IO initialization
const socket = io('https://job-server-1.onrender.com', {
  withCredentials: false,
  extraHeaders: { 'Content-Type': 'application/json' },
});

type Notification = {
  id: string;
  companyUser: string;
  applicantId: string;
  jobId: string;
  message: string;
  timestamp: string;
  time: string
};

type NewNotification = {
  _id: string;
  id: string;
  companyUser: string;
  applicantId: string;
  jobId: string;
  message: string;
  Name: string;
  time: string;
  companyName: string;
};

export default function Navbar() {
  const navigationLinks = [
    { name: "Home", href: "/", active: true, id: 1 },
    { name: "Find Job", href: "find-job", active: false, id: 2 },
    { name: "Company", href: "employers", active: false, id: 3 },
    { name: "Candidates", href: "candidates", active: false, id: 4 },
    { name: "Pricing Plans", href: "pricing-plans", active: false, id: 5 },
    { name: "Customer Supports", href: "customer-supports", active: false, id: 6 },
  ];
  const lenis = useLenis()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState<boolean>()
  const path = usePathname();
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userData } = useGetUserByIdQuery(currentUser?.email || '');
  const role = userData?.user.role;
  const userId = userData?.user._id || '';
  const logOut = authContext?.logout;
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNotification, setNewNotification] = useState<NewNotification[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: notificationData } = useGetNotificationsQuery(userId);
  const notData = notificationData?.data;

  // Combine notifications
  const sumArray = [...notifications, ...newNotification];

  // Join user to their room
  useEffect(() => {
    if (!userId) return;

    socket.emit('join', userId);
    console.log(`User ${userId} joined their room`);

    return () => {
      socket.emit('leave', userId);
    };
  }, [userId]);

  // Handle incoming notifications
  useEffect(() => {
    if (!userId) return;

    const handleNotification = (data: Notification) => {
      console.log("Received notification:", data);
      if (data.applicantId === userId) {
        const formattedNotification = {
          ...data,
          timestamp: new Date(data.timestamp).toLocaleTimeString(),
        };

        // Check if jobId matches with any database notification
        const matchingDbNotification = Array.isArray(notData)
          ? notData.find((dbNot: NewNotification) => dbNot.jobId === formattedNotification.jobId)
          : null;

        const keywords = ["saved", "shortlisted"];
        const realTimeMessageHasKeyword = keywords.some((keyword) =>
          formattedNotification.message.toLowerCase().includes(keyword)
        );

        if (matchingDbNotification) {
          // If jobId matches, check if both messages have the same keyword
          const dbMessageHasKeyword = keywords.some((keyword) =>
            matchingDbNotification.message.toLowerCase().includes(keyword)
          );

          // If both messages have the same keyword (both have "saved" or "shortlisted"), skip adding
          if (realTimeMessageHasKeyword === dbMessageHasKeyword) {
            return;
          }
        }

        // If no matching jobId or keywords don't match, add to notifications
        setNotifications((prev) => [...prev, formattedNotification]);
      }
    };

    socket.on('receiveNotification', handleNotification);

    return () => {
      socket.off('receiveNotification', handleNotification);
    };
  }, [userId, notData]);

  // Handle database notifications
  useEffect(() => {
    if (Array.isArray(notData) && notData.length !== 0) {
      setNewNotification(notData); // Directly set database notifications
    }
  }, [notData]);

  // Handle outside click to close dropdown
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
  const firstName = singleName ? singleName[0] : '';



  // Stop Lenis scroll when dropdown is open
  useEffect(() => {
    if (dropdownOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [dropdownOpen, lenis]);


  return (
    <>
      {!disableNavWithFooter.includes(path) && (
        <div className="w-full bg-white border-b fixed top-0 left-0 right-0 z-50 shadow-sm">
          {/* Top Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center justify-between px-0 md:px-0 lg:px-3 xl:px-0 2xl:px-0 py-3 max-w-7xl mx-auto">
            <ul className="flex items-center space-x-6 xl:space-x-8">
              {navigationLinks.map((link) => (
                <li key={link.id} className="relative">
                  <Link href={link.id === 1 ? '/' : `/${link.href.toLowerCase()}`}>
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
          </nav>

          {/* Main Header */}
          <div className="px-3 lg:px-3 py-3 sm:py-4 max-w-7xl mx-auto">
            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between">
              {/* Logo Section */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded flex items-center justify-center">
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

                <NavSearch/>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-5">
                {/* notification section start */}
                {currentUser && role === 'Applicant' && (
                 <DropdownMenu open={dropdownOpen} onOpenChange={setDropDownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative focus:outline-none">
          <Bell className="h-4 w-4" />
          {sumArray.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              {sumArray.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <div
          data-lenis-prevent
          className="max-h-60 overflow-y-auto"
        >
          <div className="p-2 font-medium">Notifications</div>
          {sumArray.length === 0 ? (
            <DropdownMenuItem className="text-sm text-muted-foreground">
              No new notifications
            </DropdownMenuItem>
          ) : (
            sumArray.map((notification, index) => (
              <DropdownMenuItem
                key={index}
                className="flex flex-col items-start gap-1"
              >
                <span className="text-sm font-medium">{notification.message}</span>
                <span className="text-xs text-muted-foreground">
                  {notification.time}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
                )}
                {/* notification section end */}
                {/* condition sign in button if current user is not available  */}
                {!currentUser && (
                  <Link href="/signin" className="">
                    <Button variant='ghost' className="px-3 text-sm lg:px-6 py-4 border-gray-300 rounded-sm bg-gray-100 text-gray-500 cursor-pointer">
                      Sign In
                    </Button>
                  </Link>
                )}
                {/* profile dropdown start */}
                {/* if user is applicant then show this dropdown  */}
                {currentUser && role === 'Applicant' && (
                  <div className="relative" ref={menuRef}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="border cursor-pointer rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 hover:bg-gray-300">
                          {currentUser.displayName?.slice(0, 1)}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <Link href={'/candidate-dashboard/settings'}>
                            <DropdownMenuItem>
                              Profile
                              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </Link>
                          <Link href="/candidate-dashboard/settings">
                            <DropdownMenuItem className="flex justify-between">
                              Settings
                              <Settings size={16} />
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Team</DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Dashboard</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <Link href="/candidate-dashboard">
                                  <DropdownMenuItem>Overview</DropdownMenuItem>
                                </Link>
                                <Link href="/candidate-dashboard/applied-jobs">
                                  <DropdownMenuItem>Applied Jobs</DropdownMenuItem>
                                </Link>
                                <Link href="/candidate-dashboard/favourite-jobs">
                                  <DropdownMenuItem>Favorite Jobs</DropdownMenuItem>
                                </Link>
                                <Link href="/candidate-dashboard/job-alerts">
                                  <DropdownMenuItem>Job Alert</DropdownMenuItem>
                                </Link>
                                <Link href="/candidate-dashboard/settings">
                                  <DropdownMenuItem>Settings</DropdownMenuItem>
                                </Link>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <Link href="/customer-support">
                          <DropdownMenuItem>Support</DropdownMenuItem>
                        </Link>
                        <Link href="/https://github.com/Mujahid2000">
                          <DropdownMenuItem>GitHub</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          Log out
                          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
                {/* if user is company then show this dropdown */}
                {currentUser && role === 'Company' && (
                  <div className="relative" ref={menuRef}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="border cursor-pointer rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 hover:bg-gray-300">
                          {currentUser.displayName?.slice(0, 1)}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <Link href={'/company-dashboard/plans-&-billing'}>
                            <DropdownMenuItem>
                              Billing
                              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </Link>
                          <Link href={'/company-dashboard/settings'}>
                            <DropdownMenuItem className="flex justify-between">
                              Settings
                              <DropdownMenuShortcut>
                                <Settings size={16} />
                              </DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Team</DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Dashboard</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <Link href="/company-dashboard">
                                  <DropdownMenuItem>Overview</DropdownMenuItem>
                                </Link>
                                <Link href="/company-dashboard/employer-profile">
                                  <DropdownMenuItem>Employer Profile</DropdownMenuItem>
                                </Link>
                                <Link href="/company-dashboard/post-job">
                                  <DropdownMenuItem>Post Job</DropdownMenuItem>
                                </Link>
                                <Link href="/company-dashboard/my-jobs">
                                  <DropdownMenuItem>My Jobs</DropdownMenuItem>
                                </Link>
                                <Link href="/company-dashboard/saved-candidates">
                                  <DropdownMenuItem>Saved Candidates</DropdownMenuItem>
                                </Link>
                                <Link href="/company-dashboard/plans-&-billing">
                                  <DropdownMenuItem>Plans & Billings</DropdownMenuItem>
                                </Link>
                                <Link href="/company-dashboard/settings">
                                  <DropdownMenuItem>Settings</DropdownMenuItem>
                                </Link>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <Link href={'/customer-supports'}>
                          <DropdownMenuItem>Support</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          Log out
                          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
                {/* if user is company then show this button  */}
                {currentUser && role === 'Company' && (
                  <Link href="/company-dashboard/Post-a-Job">
                    <ButtonCommon name="Post A Post" />
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile & Tablet Layout */}
            <div className="lg:hidden">
              <div className="flex items-center justify-between gap-9  mb-4">
                {/* Mobile Menu Button */}
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild>
                    <button>
                      <Menu className="w-5 h-5" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-65 px-5">
                    <div className="flex flex-col space-y-4 mt-8">
                      <DialogTitle></DialogTitle>
                      {navigationLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          className="text-base font-medium py-1 transition-colors"
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
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center">
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

                <div className="flex gap-2 items-center">
 {/* notification section start */}
                {currentUser && role === 'Applicant' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative focus:outline-none">
                        <Bell className="h-4 w-4" />
                        {sumArray.length > 0 && (
                          <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                          >
                            {sumArray.length}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-60">
                      <div className="max-h-60 overflow-y-auto">
                      <div className="p-2 font-medium">Notifications</div>
                      {sumArray.length === 0 ? (
                        <DropdownMenuItem className="text-sm text-muted-foreground">
                          No new notifications
                        </DropdownMenuItem>
                      ) : (
                        sumArray.map((notification, index) => (
                          <DropdownMenuItem
                            key={index}
                            className="flex flex-col items-start gap-1"
                          >
                            <span className="text-sm font-medium">{notification.message}</span>
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </DropdownMenuItem>
                        ))
                      )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                
                {/* if currentUser not available then show the signin button */}
                {!currentUser && (
                  <Link href="/signin" className="">
                    <button className="px-3 text-sm lg:px-4 py-2 border-gray-300 rounded-sm text-gray-600">
                      Sign in
                    </button>
                  </Link>
                )}

                {/* Mobile Action Buttons */}
                <div className="flex items-center space-x-2">
                  {currentUser && role === 'Applicant' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="border rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 hover:bg-gray-300">
                          {currentUser.displayName?.slice(0, 1)}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 mx-1" align="start">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>
                              <User size={16} />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            Team
                            <DropdownMenuShortcut>
                              <FaUsers />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Dashboard</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <Link href="/candidate-dashboard">
                                  <DropdownMenuItem>Overview</DropdownMenuItem>
                                </Link>
                                <Link href="/candidate-dashboard/applied-jobs">
                                  <DropdownMenuItem>Applied Jobs</DropdownMenuItem>
                                </Link>
                                <Link href="/candidate-dashboard/favourite-jobs">
                                  <DropdownMenuItem>Favorite Jobs</DropdownMenuItem>
                                </Link>
                                <Link href="/candidate-dashboard/job-alerts">
                                  <DropdownMenuItem>Job Alert</DropdownMenuItem>
                                </Link>
                                <Link href="/candidate-dashboard/settings">
                                  <DropdownMenuItem>Settings</DropdownMenuItem>
                                </Link>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <Link href="/customer-support">
                          <DropdownMenuItem>Support</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          Log out
                          <DropdownMenuShortcut>
                            <LogOut size={16} />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                {/* if company user is available then show this  */}
                <div className="flex items-center space-x-2">
                  {currentUser && role === 'Company' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="border rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 hover:bg-gray-300">
                          {currentUser.displayName?.slice(0, 1)}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 mx-1" align="start">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>
                              <User size={16} />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            Team
                            <DropdownMenuShortcut>
                              <FaUsers />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Dashboard</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <Link href="/company-dashboard">
                                  <DropdownMenuItem>Overview</DropdownMenuItem>
                                </Link>
                                <Link href="/company-dashboard/employer-profile">
                                  <DropdownMenuItem>Employer Profile</DropdownMenuItem>
                                </Link>
                                <Link href="/company-dashboard/post-job">
                                  <DropdownMenuItem>Post Job</DropdownMenuItem>
                                </Link>
                                <Link href="/company-dashboard/my-jobs">
                                  <DropdownMenuItem>My Jobs</DropdownMenuItem>
                                </Link>
                                <Link href="/company-dashboard/saved-candidates">
                                  <DropdownMenuItem>Saved Candidates</DropdownMenuItem>
                                </Link>
                                <Link href="/company-dashboard/plans-&-billing">
                                  <DropdownMenuItem>Plans & Billings</DropdownMenuItem>
                                </Link>
                                <Link href="/company-dashboard/settings">
                                  <DropdownMenuItem>Settings</DropdownMenuItem>
                                </Link>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <Link href="/customer-support">
                          <DropdownMenuItem>Support</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          Log out
                          <DropdownMenuShortcut>
                            <LogOut size={16} />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                </div>
                
              </div>

              {/* Search Bar - Mobile & Tablet Full Width */}
              <NavSearch/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
