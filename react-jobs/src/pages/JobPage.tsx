// src/pages/JobPage.tsx
// import { useState, useEffect } from 'react'
// import Spinner from '../components/Spinner'
import { useParams, useLoaderData, type LoaderFunctionArgs } from 'react-router-dom'
import type { Jobitem } from '../components/JobsInterface'

const JobPage = () => {
  // useParams is still available if you need the raw route parameter
  const { id } = useParams<{ id: string }>()

  // Strongly typed from the loader output
  const job = useLoaderData() as Jobitem

  // --- Previous useEffect & useState implementation kept for reference ---
  // const [job, setJob] = useState<Jobitem | null>(null)
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const fetchJob = async () => {
  //     try {
  //       const res = await fetch(`/api/jobs/${id}`)
  //       if (!res.ok) {
  //         throw new Error('Could not fetch the job details')
  //       }
  //       const data: Jobitem = await res.json()
  //       setJob(data)
  //     } catch (error) {
  //       console.log('Error fetching data', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   if (id) {
  //     fetchJob()
  //   }
  // }, [id])
  // -----------------------------------------------------------------------

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-gray-500 mt-2">{job.type}</p>
      <p className="text-indigo-600 font-bold mt-2">{job.salary} / Year</p>
      <p className="mt-4">{job.description}</p>
    </div>
  )
}

export const jobLoader = async ({ params }: LoaderFunctionArgs): Promise<Jobitem> => {
  const res = await fetch(`/api/jobs/${params.id}`)
  if (!res.ok) {
    throw new Response('Not Found', { status: 404 })
  }
  const data: Jobitem = await res.json()
  return data
}

export default JobPage