// src/pages/JobPage.tsx
// import { useState, useEffect } from 'react'
// import Spinner from '../components/Spinner'
// import { useParams } from 'react-router-dom'
import { useLoaderData, type LoaderFunctionArgs, Link, useNavigate } from 'react-router-dom'
import type { Jobitem } from '../components/JobsInterface'
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa'

// --- Previous Props interface when delete was passed down from App.tsx ---
// interface JobPageProps {
//   deletejob: (id: string) => void
// }

const JobPage = () => {
  // const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
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

  // --- Previous event handler using deletejob prop or onClick ---
  // const onDeleteClick = async (jobId: string) => {
  //   const confirm = window.confirm('Are you sure you want to delete this listing?')
  //   if (!confirm) return
  //   // deletejob(jobId)
  //   try {
  //     const res = await fetch(`/api/jobs/${jobId}`, {
  //       method: 'DELETE',
  //     })
  //     if (res.ok) {
  //       navigate('/jobs')
  //     }
  //   } catch (error) {
  //     console.error('Error deleting job', error)
  //   }
  // }

  // React 19 Action: executed directly by <form action={deleteJobAction}>
  const deleteJobAction = async () => {
    const confirm = window.confirm('Are you sure you want to delete this listing?')
    if (!confirm) return

    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        navigate('/jobs')
      }
    } catch (error) {
      console.error('Error deleting job', error)
    }
  }

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_30%] w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-orange-700 mr-2" />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>
                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>
                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>
                <h2 className="text-2xl">{job.company.name}</h2>
                <p className="my-2">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold break-all">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactPhone}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/edit-jobs/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>

                {/* React 19 Action Form for Deletion */}
                <form action={deleteJobAction}>
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                  >
                    Delete Job
                  </button>
                </form>

                {/* Previous onClick Button approach:
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                  onClick={() => onDeleteClick(job.id)}
                >
                  Delete Job
                </button>
                */}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
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