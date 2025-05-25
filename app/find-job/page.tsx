import React from 'react';
import JobFiltering from '@/Component/Joblist/JobFiltering';
import JobListings from '@/Component/Joblist/Joblist';

// Define the props for searchParams
interface SearchParams {
  viewMode?: string;
}

interface PageProps {
  searchParams: SearchParams;
}

/**
 * Page component for displaying job filtering and listings.
 * @param searchParams - A promise that resolves to query parameters for filtering jobs.
 */
export default async function Page({ searchParams }: { searchParams: Promise<PageProps> }) {
  // Resolve searchParams
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

  // Extract the inner searchParams
  const params = resolvedSearchParams.searchParams || { viewMode: 'grid' };

  return (
    <>
      <JobFiltering />
      <JobListings searchParams={params} />
    </>
  );
}