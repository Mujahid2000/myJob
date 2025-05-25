import ApplicationDetails from '@/Component/Employee-Dashboard/MyJobComponent/ApplicationDetails';
import React from 'react';


export default async function page ({ params, }: {params:Promise< { id: string }>}) {
    const { id } =await params;

    return (
        <div>
            <ApplicationDetails jobId={id} />
        </div>
    );
};


