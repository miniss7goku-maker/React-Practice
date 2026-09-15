// src/App.tsx
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import NotFound from './pages/NotFound'
import JobPage, { jobLoader } from './pages/JobPage'
import AddJobPage from './pages/AddJobPage'
import EditJobPage from './pages/EditJobPage'

// --- Previous pattern: Passing deletejob as a prop from App.tsx ---
// const deletejob = async (id: string) => {
//   const res = await fetch(`/api/jobs/${id}`, {
//     method: 'DELETE',
//   })
//   console.log('delete', id)
// }
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/add" element={<AddJobPage />} />
      
      {/* React 19 Action: Component handles delete directly, no prop needed */}
      <Route
        path="/jobs/:id"
        element={<JobPage  />}
        loader={jobLoader}
      />
      <Route
        path="/edit-jobs/:id"
        element={<EditJobPage/>}
        loader={jobLoader}
      />
      
      {/* Previous element with deletejob prop:
      <Route
        path="/jobs/:id"
        element={<JobPage deletejob={deletejob} />}
        loader={jobLoader}
      />
      */}

      <Route path="/jobs/edit/:id" element={<AddJobPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App