import React from 'react';
import JobList from './JobList';
import { useEffect, useState } from 'react';

function JobBoard({jobs}) {
    const statuses = ["No Response", "Under Review","Interviewing","Offered", "Rejected"]
    const colors = ["decoration-blue-400", "decoration-orange-400", "decoration-yellow-400", "decoration-green-400", "decoration-red-400"]
    // const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //     if (jobs.length > 0) {
    //         setIsLoading(false); 
    //     }
    // }, [jobs]);
    // console.log("Jobs in JobBoard before passing to JobList:", jobs);
    
    
    // const noResponse = job.filter((j)=>j.status === "No Response");
    // const underReview = job.filter((j)=>j.status === "Under Review");
    // const reject = job.filter((j)=>j.status === "Rejected");
    // const interview = job.filter((j)=>j.status === "Interviewing");
    // const offer = job.filter((j)=>j.status === "Offered");
    return (
        <div className='flex flex-row gap-10 ' >
        {statuses.map((status)=>(
        <JobList key={status} title={status} color={colors[statuses.indexOf(status)]} jobs={jobs.filter(job=> job.status == status)} />
))}
        </div>

    );
}

export default JobBoard