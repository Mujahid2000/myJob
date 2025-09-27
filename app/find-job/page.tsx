import React from 'react';
import JobFiltering from '@/Component/Joblist/JobFiltering';
import JobListings from '@/Component/Joblist/Joblist';
import {ReactLenis} from '@/lib/lenis'
import { Metadata } from 'next';
interface PageProps {
  viewMode?: string;
}

export const metadata: Metadata = {
  title: "Find Job",
  description: "Explore thousands of job opportunities tailored to your skills and interests.",
  keywords: ["find job", "job listings", "career opportunities", "employment", "MyJob"],
  openGraph: {
    title: "Find Job | MyJob",
    description: "Explore thousands of job opportunities tailored to your skills and interests.",
    url: "https://my-job-brown.vercel.app/find-job",
    siteName: "MyJob",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Job | MyJob",
    description: "Explore thousands of job opportunities tailored to your skills and interests.",
  },
};

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: { searchParams: Promise<PageProps> }) {
  let resolvedSearchParams: PageProps;
  try {
    resolvedSearchParams = await searchParams;
  } catch (error) {
    console.error('Error resolving searchParams:', error);
    return (
      <div className="text-center text-red-500 pt-20">
        Error loading filters: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  const params = resolvedSearchParams || { viewMode: 'grid' };

  return (

<div>
      <JobFiltering />
      <JobListings searchParams={params} />
    </div>

    
  );
}