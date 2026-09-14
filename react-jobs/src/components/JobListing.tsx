import React from 'react'
import { useEffect,useState } from 'react'
import Joblistitem from './Joblistitem';
import type { Jobitem } from './JobsInterface';

interface JobListingProps {
  isHome?: boolean
}


function JobListing({ isHome = false }: JobListingProps) {
  const[jobs, setJobs] = useState([]);
  const[loading, setloading] = useState(true);
  useEffect(()=> {
    const fetchJobs = async () => {
      try{
      const res = await fetch('http://localhost:8000/jobs')
      const data = await res.json();
      setJobs(data);
      }
      catch(error)
      {
        console.log('error fetching data', error);

      }
      finally{
        setloading(false);
      }
    }
    fetchJobs();
  },[]);
  // If on HomePage, only show 3 jobs; otherwise show all
  const jobListings = isHome ? jobs.slice(0, 3) : jobs

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading?(<h2>Loadding...</h2>):(<>{jobListings.map((job:Jobitem) => (
            <Joblistitem key={job.id} job={job} />
          ))}</>)}
        </div>
      </div>
    </section>
  )
}

export default JobListing