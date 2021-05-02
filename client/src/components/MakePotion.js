import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import axios from 'axios'

import { getPayloadFromToken, getTokenFromLocalStorage } from '../auth/auth'

import PotionForm from './PotionForm'

const MakePotion = () => {

  const [ingredients, setIngredients] = useState(null)
  const [instructions, setInstructions] = useState(null)
  const userID = getPayloadFromToken().sub 
  
  const [formData, setFormData] = useState({
    name: '',
    image: '../assets/Memory.png',
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
  console.log('form data', formData)


  const handleIngredientsSelect = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: [...values] })
    console.log('formdata >>>', formData)
  }

  const handleInstructionsSelect = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: [...values] })
  }

  const handleImageSelect = (selected, name) => {
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

  const imageOptions = [
    { value: 'potion1.png', label: 'medicine' }, 
    { value: 'potion2.png', label: 'physical effect' }
  ]

  return (
    <div className="container">
      <div className="columns">
        <PotionForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
          handleIngredientsSelect={handleIngredientsSelect}
          handleInstructionsSelect={handleInstructionsSelect}
          handleImageSelect={handleImageSelect}
          ingredientsOptions={ingredientsOptions}
          instructionsOptions={instructionsOptions}
          imageOptions={imageOptions}
        />
      </div>
    </div>
  )
}

export default MakePotion