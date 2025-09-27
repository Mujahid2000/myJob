import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Layout/Navbar";
import FooterSection from "@/components/sections/footer/default";
import { store } from "@/Store/Store";
import StoreProvider from "./StoreProvider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MyJob",
    template: "%s | MyJob", // Ensures consistent branding
  },
  description: "Find jobs that match your skills, interests, and career goals.",
  keywords: ["job search", "career", "employment", "MyJob", "find job online", "Bangladesh jobs"],
  authors: [{ name: "MyJob Team", url: "https://myjob.com" }],
  openGraph: {
    title: "MyJob",
    description: "Find jobs that match your skills, interests, and career goals.",
    url: "https://myjob.com",
    siteName: "MyJob",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyJob",
    description: "Find jobs that match your skills, interests, and career goals.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 



{
  return (
    <html lang="en">
       <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home Decor</title>
    <meta name="description" content='My Job' />
    <link rel="icon" type="image/svg+xml" href="https://res.cloudinary.com/diez3alve/image/upload/v1740414466/briefcase_1_l2uamk.png" />
  </head>

 <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider >
        <Navbar/>
        {children}
        <FooterSection/>
        </StoreProvider>
        
      </body>


     
    </html>
  );
}
