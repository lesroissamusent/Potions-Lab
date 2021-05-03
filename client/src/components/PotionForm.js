/*eslint-disable no-unused-vars*/

import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import '../styles/potionForm.scss'


const PotionForm = ({ handleChange, handleSubmit, formData, handleIngredientsSelect, handleInstructionsSelect, handleImageSelect, ingredientsOptions, instructionsOptions, popIngredients, popInstructions }) => {

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

  const imageOptions = [
    { value: '../assets/Garrotting.png', label: 'Medicinal' }, 
    { value: '../assets/polyjuice.png', label: 'Transfigurative' },
    { value: '../assets/Pepperup.png', label: 'Poisonous' }, 
    { value: '../assets/Regerminating.png', label: 'Herbological' }, 
    { value: '../assets/Scintillation.png', label: 'Mystery' }, 
    { value: '../assets/Wiggenweld.png', label: 'Dark Arts' } 
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
          <label className="label">Potion Type:</label>
          <div className="control">
            <Select
              name="image"
              options={imageOptions}
              components={makeAnimated()}
              onChange={(selected) => handleImageSelect(selected, 'image')}
              styles={customStyles}
            />
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
              styles={customStyles}
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
              styles={customStyles}
            />
          </div>
        </div>
        <div className="field">
          <button className="button submit is-fullwidth" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default PotionForm
