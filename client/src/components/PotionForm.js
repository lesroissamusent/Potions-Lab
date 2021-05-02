/*eslint-disable no-unused-vars*/

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { getPayloadFromToken, getTokenFromLocalStorage } from '../auth/auth'



const PotionForm = ({ handleChange, handleSubmit, formData, handleIngredientsSelect, handleInstructionsSelect, handleImageSelect, ingredientsOptions, instructionsOptions, popIngredients, popInstructions }) => {


  const imageOptions = [
    { value: '../assets/Garrotting.png', label: 'medicine' }, 
    { value: 'potion2.png', label: 'physical effect' }
  ]

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
          <label className="label">Image:</label>
          <div className="control">
            <Select
              name="image"
              // defaultValue={imageOptions[0]}
              options={imageOptions}
              components={makeAnimated()}
              onChange={(selected) => handleImageSelect(selected, 'image')}            />
          </div>
        </div>
        <div className="field">
          <label className="label">Ingredients:</label>
          <div className="control">
            <Select
              name="ingredients"
              defaultValue={popIngredients}
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
              defaultValue={popInstructions}
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
