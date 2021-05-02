import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

import { getPayloadFromToken, getTokenFromLocalStorage } from '../auth/auth'

import PotionForm from './PotionForm'

const EditPotion = () => {

  const [ingredients, setIngredients] = useState(null)
  const [popIngredients, setPopIngredients] = useState(null)
  const [instructions, setInstructions] = useState(null)
  const [popInstructions, setPopInstructions] = useState(null)

  // const [potion, setPotion] = useState(null)

  const userID = getPayloadFromToken().sub 
  const params = useParams()
  console.log('PARAMS.ID', params.id)
  const history = useHistory()

  
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    owner: '',
    ingredients: [],
    instructions: [],
  })
  
  useEffect(() => {
    const getPotion = async () => {
      const response = await axios.get(`/api/potions/${params.id}`)
      // setFormData(response.data)
      const ingredientsMap = response.data.ingredients.map(ingredient => {
        const { id, name } = ingredient
        return { value: id, label: name }
      })
      setPopIngredients(ingredientsMap)
      const instructionsMap = response.data.instructions.map(instruction => {
        const { id, description } = instruction
        return { value: id, label: description }
      })
      console.log('response.data', response.data)

      setPopInstructions(instructionsMap)
      const { data } = response
      const newFormData = {
        name: data.name,
        owner: userID,
        image: data.image,
        ingredients: ingredientsMap.map(item => item.value),
        instructions: instructionsMap.map(item => item.value),
      }
      setFormData(newFormData)
      console.log('ingredients.map', ingredientsMap)
    }
    getPotion()
  }, [])

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
    console.log(`Submitting ${JSON.stringify(formData, null, 2)}`)
    await axios.put(`/api/potions/${params.id}/`, formData, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } } )
    history.push(`/potions/${params.id}`)
  }

  if (!instructions || !ingredients || !popIngredients) return null // !potion || 
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
    const selection = selected.value
    setFormData({ ...formData, [name]: selection })
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
    <div className="container">
      <div className="columns">
        <PotionForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          popIngredients={popIngredients}
          popInstructions={popInstructions}
          formData={formData}
          handleIngredientsSelect={handleIngredientsSelect}
          handleInstructionsSelect={handleInstructionsSelect}
          handleImageSelect={handleImageSelect}
          ingredientsOptions={ingredientsOptions}
          instructionsOptions={instructionsOptions}
          // imageOptions={imageOptions}
        />
      </div>
    </div>
  )
}

export default EditPotion
