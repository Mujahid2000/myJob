import React from 'react';
import JobFiltering from '@/Component/Joblist/JobFiltering';
import JobListings from '@/Component/Joblist/Joblist';
import {ReactLenis} from '@/lib/lenis'
interface PageProps {
  viewMode?: string;
}

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