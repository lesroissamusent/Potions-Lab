import React, { useEffect } from 'react'

const App = () => {

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/potions')
      console.log(await res.json())
    }
    getData()
  }, [])


  return <h1>Potions Lab</h1>
}

export default App