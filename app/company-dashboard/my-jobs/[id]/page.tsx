import ApplicationDetails from '@/Component/Employee-Dashboard/MyJobComponent/ApplicationDetails';
import React from 'react';

// Define PageProps to match Next.js expectations
interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Page = async ({ params }: PageProps): Promise<React.JSX.Element> => {
  const { id } = params;

  return (
    <div>
      <ApplicationDetails jobId={id} />
    </div>
  );
};

export default Page;