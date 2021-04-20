import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SinglePotion from './SinglePotion'

const PotionIndex = () => {
  const [potions, setPotions] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/potions/')
      setPotions(response.data)
      console.log('RESPONSE', response)
    }
    getData()
  }, [])

  return (
    <>
      <h1>test</h1>
      <div className="section">
        <div className="container">
          { potions &&
            <div className="columns is-multiline">
              { potions.map( potion => (
                <SinglePotion key={potions._id} {...potions} />
              ))}
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default PotionIndex