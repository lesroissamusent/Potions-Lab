/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SinglePotion from './SinglePotion'

const PotionIndex = () => {
  const [potions, setPotions] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/potions')
      setPotions(response.data)
      console.log('RESPONSE.DATA', response.data)
    }
    getData()
  }, [])

  

  if ( !potions ) return null

  console.log('name', potions[0].name)
  console.log('id', potions[0].id)
  console.log('ingredients', potions[0].ingredients)
  console.log('instructions', potions[0].instructions)

  return (
    <div className="section">
      <div className="container">
        { 
          potions &&
            <div className="columns is-multiline">
              { potions.map( (potion, i) => (
                <SinglePotion key={i} {...potion} />
              ))
              }
            </div>
        }
      </div>
    </div>
  )
}

export default PotionIndex