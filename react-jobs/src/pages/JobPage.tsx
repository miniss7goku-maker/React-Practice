// src/pages/JobPage.tsx
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import type { Jobitem } from '../components/JobsInterface'

const JobPage = () => {
  // 1. Correct useParams type generic
  const { id } = useParams<{ id: string }>()
  const [job, setJob] = useState<Jobitem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // 2. Fetch from plural /api/jobs/${id}
        const res = await fetch(`/api/jobs/${id}`)
        if (!res.ok) {
          throw new Error('Could not fetch the job details')
        }
        const data = await res.json()
        setJob(data)
      } catch (error) {
        console.log('Error fetching data', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchJob()
    }
  }, [id])

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{job?.title}</h1>
      <p className="text-gray-500 mt-2">{job?.type}</p>
      <p className="text-indigo-600 font-bold mt-2">{job?.salary} / Year</p>
      <p className="mt-4">{job?.description}</p>
    </div>
  )
}

export default JobPage