/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'
import SinglePotion from './SinglePotion'
import '../styles/login.scss'
import '../styles/potions.scss'



const PotionIndex = () => {
  const [potions, setPotions] = useState(null)
  const params = useParams()

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/potions')
      setPotions(response.data)
      console.log('RESPONSE.DATA', response.data)
    }
    getData()
  }, [])
  if ( !potions ) return null
  // console.log('potions', potions)
  // console.log('name', potions[0].name)
  // console.log('id', potions[0].id)
  // console.log('ingredients', potions[0].ingredients)
  // console.log('instructions', potions[0].instructions)
  // console.log('img', potions[0].image)


  return (
    <>
      <h1 className="potions-page-title">Potions</h1>
      <div className="section">
        <div className="container">
          { 
            potions &&
              <div className="columns is-multiline">
                { potions.map((potion, i) => (
                  <SinglePotion key={i} {...potion} />
                ))
                }
              </div>
          }
        </div>
      </div>
    </>
  )
}
export default PotionIndex