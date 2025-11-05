
import { RouterProvider } from 'react-router-dom'
import './App.css'

import router from './router'
import { Suspense } from 'react'
import Loader from './ui/Loader'

function App() {


  return (
    <>

      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>

    </>
  )
}

export default App
