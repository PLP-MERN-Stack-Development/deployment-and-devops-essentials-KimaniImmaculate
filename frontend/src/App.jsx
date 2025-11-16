import React, { useState, useEffect, Suspense } from 'react'
import './App.css'


// Lazy-loaded Dashboard component
const Dashboard = React.lazy(() => import('./Dashboard'))

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL

    fetch(`${apiUrl}/api/some-endpoint`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error('Error fetching data:', err))
  }, [])

  return (
    <div className="App">
      <h1>Vite + React</h1>

      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <Dashboard />
      </Suspense>

      {data && (
        <div>
          <h2>Data from API:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App

