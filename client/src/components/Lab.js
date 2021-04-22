import React, { useEffect } from 'react'
import '../styles/lab.scss'
import '../styles/main.scss'



const App = () => {
  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/potions/')
      console.log('console log!!', await res.json())
    }
    getData()
  }, [])


  return (
    <div className="corridor">
      <h5>Welcome to the store.</h5>
    </div>
  )


}

export default App