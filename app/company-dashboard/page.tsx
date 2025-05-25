import JobApplicationReceiveList from '@/Component/Employee-Dashboard/OverView/JobApplicationReceiveList';
import { MoveRight, ShieldCheck } from 'lucide-react';
import React from 'react';

export default async function  page  () {

    return (
        <div >
            <h1 className="text-2xl font-bold py-2">Hello, Esther Howard</h1>
        <p className="pb-5">Here is your daily activities and job alerts</p>
       <JobApplicationReceiveList/>
        </div>
    );
};

