import { RouteRouter } from './routes'
import React, { useState, useLayoutEffect } from 'react'
export const Permission = React.createContext()

function App() {
  const [rootPermission, setRootPermission] = useState([])

  useLayoutEffect(() => {
    setRootPermission([
      '/',
      '/Coursedesign'
    ])
  }, [])

  return <Permission.Provider value={rootPermission}>
    <RouteRouter />
  </Permission.Provider>
}

export default App