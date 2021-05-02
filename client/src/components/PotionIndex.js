/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import axios from 'axios'
import SinglePotion from './SinglePotion'
import '../styles/login.scss'
import '../styles/potions.scss'



const PotionIndex = () => {

  const [potions, setPotions] = useState(null)
  const [filteredPotions, setFilteredPotions] = useState([])
  const [ingredients, setIngredients] = useState(null)
  // const params = useParams()

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/potions')
      setPotions(response.data)
      console.log('RESPONSE.DATA', response.data)
    }
    getData()
  }, [])

  const filterPotions = (selected) => {
    console.log('selected.value',selected.value)
    const filteredArray = potions.filter(potion => {
      // return potion.ingredients === event.target.value
      console.log('potion.ingredients', potion.ingredients)
    })
    // setFilteredPotions(filteredArray)
  }

  

  // const handleImageSelect = (selected, name) => {
  //     const selection = selected.value
  //     setFormData({ ...formData, [name]: selection })
  //   }


  useEffect(() => {
    const getIngredients = async () => {
      const response = await axios.get('/api/ingredients/')
      setIngredients(response.data)
      // setFormData(response.data)
    }
    getIngredients()
    console.log('get ingredients ->', ingredients)
  }, [])

  //   const handleIngredientsSelect = (selected, name) => {
  //   const values = selected ? selected.map(item => item.value) : []
  //   setFormData({ ...formData, [name]: [...values] })
  //   console.log('formdata >>>', formData)
  // }



  if ( !potions || !ingredients ) return null

  const ingredientsOptions = ingredients.map(ingredient => {
    const { id, name } = ingredient
    return { value: id, label: name }
  })


  return (
    <>
      <h1 className="potions-page-title">Potions</h1>
      <form>
        <div className="field">
          <label className="label">Ingredients:</label>
          <div className="control">
            <Select
              name="ingredients"
              options={ingredientsOptions}
              components={makeAnimated()}
              onChange={(selected) => filterPotions(selected, 'ingredients')}
            />
          </div>
        </div>  
      </form>
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