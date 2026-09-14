import { useEffect, useState } from 'react'
import Joblistitem from './Joblistitem'
import type { Jobitem } from './JobsInterface'
import Spinner from './Spinner'

interface JobListingProps {
  isHome?: boolean
}

function JobListing({ isHome = false }: JobListingProps) {
  // Give useState the generic type <Jobitem[]>
  const [jobs, setJobs] = useState<Jobitem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchJobs = async () => {
  const apiUrl = '/api/jobs' // Fetch jobs directly

  try {
    const res = await fetch(apiUrl)
    const data = await res.json()
    // Handle both raw array and json-server v1 paginated object { data: [...] }
    const jobsArray = Array.isArray(data) ? data : data.data || []
    setJobs(jobsArray)
  } catch (error) {
    console.log('error fetching data', error)
  } finally {
    setLoading(false)
  }
}
    fetchJobs()
  }, [isHome])

  const jobListings = isHome ? jobs.slice(0, 3) : jobs

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobListings.map((job: Jobitem) => (
              <Joblistitem key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default JobListing