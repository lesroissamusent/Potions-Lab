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
    /** 
    * * the ingredient 'View All' has a value of 'all' which does not appear
    * * in the ingredients. this makes the filteredArray.length 0 which runs 
    * * the conditional render in the return to 
    * * display potions instead of filtered potions
    */
    setFilteredPotions(potions)
    console.log('selected.value',selected.value)
    const ingredientToFilter = selected.value
    const filteredArray = potions.filter(potion => {
      /** 
       * ? potions.ingredients["id"] returns an array of ingredients objects for the potion
       * ? id: 12, name: "Rat Tails"
       * ? if ingredients array INCLUDES rat tails [i].id === 12
       * ? 
       *  */ 

      const something = potion.ingredients.filter(item => item.id === ingredientToFilter)
      console.log('something', something)

      return something.length > 0

    })
    console.log('filtered array', filteredArray)

    setFilteredPotions(filteredArray)
  }

  useEffect(() => {
    const getIngredients = async () => {
      const response = await axios.get('/api/ingredients/')
      setIngredients(response.data)
      // setFormData(response.data)
    }
    getIngredients()
    console.log('get ingredients ->', ingredients)
  }, [])

  if ( !potions || !ingredients ) return null

  const ingredientsOptions = ingredients.map(ingredient => {
    const { id, name } = ingredient
    return { value: id, label: name }
  })

  ingredientsOptions.unshift({ value: 'all', label: 'View All' })


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
              isMulti
            />
          </div>
        </div>  
      </form>
      <div className="section">
        <div className="container">
          { //? onclick of filter button, change potions to filteredPotions
            filteredPotions.length === 0 ?
              <div className="columns is-multiline">
                { potions.map((potion, i) => (
                  <SinglePotion key={i} {...potion} />
                ))
                }
              </div>
              :
              <div className="columns is-multiline">
                { filteredPotions.map((potion, i) => (
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