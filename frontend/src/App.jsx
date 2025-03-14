import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JobList from './JobList';
import JobBoard from './jobBoard';

function App() {
  const [job, setjob] = useState([]);
  const [visibility,setvisibility]= useState(false);
  const [jobapp, setjobapp]= useState({
    job : '',
     description : '',
     status : '',
     date: ''
  })
  const [editingjob, seteditingjob] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  
 

  useEffect(()=>{
  
    const fetchData = async() =>{
      try{
        const response = await fetch('http://localhost:5008/api/data');
        const result = await response.json();
        setjob(result);
      }catch(error){
        console.error("Error fetching data:", error)

      }
    };
    fetchData();
    
  },[]);

  const handlesubmit = async(e)=>{
    e.preventDefault();
    console.log("Submitting data ",jobapp)
    try{

      const response = await fetch("http://localhost:5008/api/submit",{
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(jobapp)
      });
      const data = await response.json();

      if (response.ok){
        console.log("Sucess: ", data)
        setjobapp({ job: "", description: "", status: "", date: "" });
      }else{
        console.error("Failed to submit");
      }
    
    }catch(error){
      console.error("Error submitting the form:", error)
    }

  };


  const createApplication = ()=>{
    setvisibility(!visibility);
    

  }

  const startEditing = (index)=>{
    setEditingIndex(index);
    seteditingjob(job[index]);
    setjobapp(job[index])
    setvisibility(true)
  }
 
  const saveEdit = (e)=>{
    e.preventDefault();
    if (editingIndex != null){
      const updatedjobs = [...job];
      updatedjobs[editingIndex] = jobapp;
      setjob(updatedjobs);
      setEditingIndex(null);

    }
    else{
      setjob([...job, jobapp])
    }
    createApplication();
    // setjobapp({ job: "", description: "", status: "", date: "" });

  };
  const remove = (index)=>{
    setjob(job.filter((_,i)=>i != index));
    setjobapp({ job: "", description: "", status: "", date: "" });
    setvisibility(false)

  };

  return (
    <>
    
    
    
    {(!visibility)?
    (<>
    <h1 className='mt-5 text-start font-bold text-5xl pb-7 '>Your Job Applications</h1>
    <div className='flex flex-col    h-screen'> 
    
    <JobBoard jobs={job} />
    </div>
    </>

):(
      <div className='flex justify-center'>
      <div className='flex flex-row  bg-gray-100 h-100 w-130 pl-20 pr-20 rounded-2xl drop-shadow-lg '>

        
        <form className='flex flex-col gap-6 items-center justify-center' action="post" onSubmit={(e) => e.preventDefault()}>
        <div className=' flex flex-row gap-2'>
         <label className='"block text-gray-700 mb-1"' htmlFor="job"> Name: </label>
         <input className='border p-2 bg-white rounded-sm' type="text" name='job name' placeholder='Enter the job name'  value={jobapp.job}  onChange={(e)=>setjobapp({...jobapp ,job :(e.target.value)})}/>
         </div>
         <div className=' flex flex-row gap-2 '>
         <label htmlFor="description" > Description:</label> 
         <textarea className='border p-5 bg-white rounded-sm'  value={jobapp.description} placeholder='Enter the job description' onChange={(e) => setjobapp({...jobapp ,description :(e.target.value)})}></textarea>
         </div>
         <div className=''>
         <label className='"block text-gray-700 mb-1"' htmlFor="job"> Status: </label>
          <select className='border p-2 bg-white rounded-sm' name="job status" id="status"  onChange={(e) =>setjobapp({...jobapp ,status :(e.target.value)})}>
            <option value="">SELECT THE JOB STATUS</option>
            <option value="No Response" >NO RESPONSE</option>
            <option value="Under Review" >UNDER REVIEW</option>
            <option value="Interviewing" >INTERVIEWING</option>
            <option value="Offered" >OFFERED</option>
            <option value="Rejected" >REJECTED</option>
          </select>
          </div>
          <div>
            <label htmlFor="date">Date: </label>
            <input className='border p-2 rounded-sm bg-white' type="date"  value={jobapp.date} onChange={(e)=>setjobapp({...jobapp ,date :(e.target.value)})}/>
          </div>
          <div className='flex gap-5'>

          <button className='bg-red-500 text-white border border-black rounded-2xl p-2' onClick={()=>{remove(editingIndex)}}>Delete</button>
          <button className='bg-gray-500 text-white border border-black rounded-2xl p-2' onClick={(e)=>{saveEdit(e); handlesubmit(e); setvisibility(!visibility);}}>Save</button>
          </div>
        </form>

      </div>
      </div>)}

      
      <div>
      <button className='bg-black fixed right-10 bottom-10 rounded-2xl p-3 text-white' onClick={()=>{createApplication(); ; 
  }  }>ADD APPLICATION</button>
 </div>


  {/* To edit a job after it is clicked */}
  {/* { editingIndex === index ? ():()}  */}
      
      
    </>
  )
}

export default App
