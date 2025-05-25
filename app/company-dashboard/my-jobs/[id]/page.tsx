import ApplicationDetails from '@/Component/Employee-Dashboard/MyJobComponent/ApplicationDetails';
import React from 'react';


export default async function page ({ params }: {params: { id: string }}):Promise<any> {
    const { id } = params;

    return (
        <div>
            <ApplicationDetails jobId={id} />
        </div>
    );
};


