// app/find-job/page.tsx
import React from 'react';
import JobFiltering from '@/Component/Joblist/JobFiltering';
import JobListings from '@/Component/Joblist/Joblist';

interface PageProps {
  searchParams: { viewMode?: string };
}

const Page = ({ searchParams }: PageProps) => {
  return (
    <>
      <JobFiltering />
      <JobListings searchParams={searchParams} />
    </>
  );
};

export default Page;
