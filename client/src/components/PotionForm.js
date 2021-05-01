/*eslint-disable no-unused-vars*/

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { getPayloadFromToken, getTokenFromLocalStorage } from '../auth/auth'



const PotionForm = () => {

  const [ingredients, setIngredients] = useState(null)
  const [instructions, setInstructions] = useState(null)
  const userID = getPayloadFromToken().sub 
  
  const [formData, setFormData] = useState({
    name: '',
    image: 'img.jpeg',
    owner: userID,
    ingredients: [],
    instructions: [],
  })

  useEffect(() => {
    const getIngredients = async () => {
      const response = await axios.get('/api/ingredients/')
      setIngredients(response.data)
      // setFormData(response.data)
    }
    getIngredients()
    console.log('get ingredients ->', ingredients)
  }, [])

  useEffect(() => {
    const getInstructions = async () => {
      const response = await axios.get('/api/instructions/')
      setInstructions(response.data)
      // setFormData(response.data)
    }
    getInstructions()
    console.log('get instructions ->', instructions)
  }, []) 
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    window.alert(`Submitting ${JSON.stringify(formData, null, 2)}`)
    await axios.post('/api/potions/', formData, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } } )
    // history.push(`/profile/${userID}`)
  }

  if (!instructions || !ingredients) return null 
  console.log('instructions', instructions)
  console.log('ingredients', ingredients)

  const handleIngredientsSelect = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: [...values] })
    console.log('formdata >>>', formData)
  }

  const handleInstructionsSelect = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: [...values] })
  }

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const ingredientsOptions = ingredients.map(ingredient => {
    const { id, name } = ingredient
    return { value: id, label: name }
  })

  const instructionsOptions = instructions.map(instruction => {
    const { id, description } = instruction
    return { value: id, label: description }
  })




  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Ingredients:</label>
          <div className="control">
            <Select
              name="ingredients"
              options={ingredientsOptions}
              components={makeAnimated()}
              onChange={(selected) => handleIngredientsSelect(selected, 'ingredients')}
              isMulti
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Instructions:</label>
          <div className="control">
            <Select
              name="instructions"
              options={instructionsOptions}
              components={makeAnimated()}
              onChange={(selected) => handleInstructionsSelect(selected, 'instructions')}
              isMulti
            />
          </div>
        </div>
        <div className="field">
          <button className="button is-fullwidth is-dark" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default PotionForm
