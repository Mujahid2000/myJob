import ApplicationDetails from '@/Component/Employee-Dashboard/MyJobComponent/ApplicationDetails';
import React from 'react';

interface PageProps {
    params: { id: string };
}

const Page = async ({ params }: PageProps) => {
    const { id } = params;

    return (
        <div>
            <ApplicationDetails jobId={id} />
        </div>
    );
};

export default Page;
