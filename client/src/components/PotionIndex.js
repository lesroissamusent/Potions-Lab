/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import { getPayloadFromToken } from '../auth/auth'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import axios from 'axios'
import SinglePotion from './SinglePotion'
import '../styles/main.scss'
import '../styles/potions.scss'


const PotionIndex = () => {

  const [potions, setPotions] = useState(null)
  const [filteredPotions, setFilteredPotions] = useState([])
  const [ingredients, setIngredients] = useState(null)

  const userID = getPayloadFromToken().sub 

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/potions')
      setPotions(response.data)
      console.log('RESPONSE.DATA', response.data)
    }
    getData()
  }, [])

  const filterPotions = (selected) => {
    
    //* Tried to filter by multiple options but could not get it to work.
    /*
    the ingredient 'View All' has a value of 'all' which does not appear
    in the ingredients. this makes the filteredArray.length 0 which runs 
    the conditional render in the return to 
    display potions instead of filtered potions
    */
    // const values = selected ? selected.map(item => item.value) : []
    // console.log('values', values)
    // setFilteredPotions(potions)
    // const multipleFilters = potions.filter(potion => {
    //   /**
    //    * ? filter the potions based on a n array of numbers instead of 
    //    * ? just one number
    //    */

    //   let filteredPotionIngredients = []
    //   for (let i = 0; i < values.length; i++) {
    //     filteredPotionIngredients = potion.ingredients.filter(ingredient => ingredient.id === values[i]) 
    //   }
    //   return filteredPotionIngredients.length > 0 
    // })
    // console.log('whatever you want', multipleFilters)


    const ingredientToFilter = selected.value
    const filteredArray = potions.filter(potion => {
      
      const filteredPotionIngredients = potion.ingredients.filter(item => item.id === ingredientToFilter)
      return filteredPotionIngredients.length > 0

    })
    // console.log('filtered array', filteredArray)
    setFilteredPotions(filteredArray)
  }

  useEffect(() => {
    const getIngredients = async () => {
      const response = await axios.get('/api/ingredients/')
      setIngredients(response.data)
    }
    getIngredients()
    console.log('get ingredients ->', ingredients)
  }, [])

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#33A58B' : 'black',
      background: 'white',
      padding: 20,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'
  
      return { ...provided, opacity, transition }
    },
  }

  if ( !potions || !ingredients) return null

  const ingredientsOptions = ingredients.map(ingredient => {
    const { id, name } = ingredient
    return { value: id, label: name }
  })

  ingredientsOptions.unshift({ value: 'all', label: 'View All' })

  return (
    <>
      <h1 className="potions-page-title">Potions</h1>
      <form className="form is-centered">
        <div className="field">
          <label className="label">Ingredients:</label>
          <div className="control">
            <Select
              name="ingredients"
              options={ingredientsOptions}
              components={makeAnimated()}
              onChange={(selected) => filterPotions(selected, 'ingredients')}
              styles={customStyles}
            />
          </div>
        </div>  
      </form>
      <div className="columns is-multiline">
        { getPayloadFromToken(userID) &&
            <>
              <div className="create-button">
                <Link to={'/makepotion'} className="button">Create a Potion</Link>
              </div>
            </>
        }
      </div>
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
    </>
  )
}
export default PotionIndex