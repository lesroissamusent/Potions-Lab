/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SinglePotion from './SinglePotion'

const PotionIndex = () => {
  const [potions, setPotions] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('http://localhost:8000/api/potions')
      setPotions(response.data)
      console.log('RESPONSE.DATA', response.data)
    }
    getData()
  }, [])

  return (
    <div className="section">
      <div className="container">
        { potions &&
          <div className="columns is-multiline">
            { potions.map( potion => (
              <SinglePotion key={potions.id} {...potions} />
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default PotionIndex