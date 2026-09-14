import React from 'react'
import JobListing from '../components/JobListing'

function JobsPage() {
  return (
    <section className="bg-blue-50 px-4 py-6">
      <JobListing isHome={false} />
    </section>
  )
}

export default JobsPage