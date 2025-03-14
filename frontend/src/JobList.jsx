import React from 'react'

function JobList({jobs,title,color}) {
    
    
    const getRandomColor = () => {
        const colors = ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400"];
        return colors[Math.floor(Math.random() * colors.length)];
      };
  return (
    <ul className='flex flex-col gap-5 pt-10 p '>
      <h2 className={`underline ${color} decoration-6 pb-5 text-left w-3xs underline-offset-4 text-xl font-medium `}> {title}</h2>
    {jobs.map((job,index)=>(
      
      <li className={`${getRandomColor()} p-15   w-3xs rounded-2xl text-xl drop-shadow-md text-left flex flex-col items-start relative`} key={index} onClick={() => startEditing(index)}> <span className='absolute font-medium  text-2 text-left top-5 left-5'>{job.job}</span>
      <span className='absolute text-lg top-11 left-8'>{job.description}</span>
      <span className='absolute bottom-6 right-5 text-sm '>{job.date}</span>
      
      
      
      </li>
      
    )

    )}
    
  </ul>
  )
}

export default JobList
