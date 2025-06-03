import React from 'react';
import JobFiltering from '@/Component/Joblist/JobFiltering';
import JobListings from '@/Component/Joblist/Joblist';

// Define the props for searchParams


interface PageProps {
  viewMode?: string;
}

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
// get for view mode value
   const params = resolvedSearchParams || { viewMode: 'grid' }; 

  return (
    <>
      <JobFiltering />
      <JobListings searchParams={params} />
    </>
  );
}