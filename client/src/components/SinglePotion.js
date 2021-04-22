import React from 'react'
import { Link } from 'react-router-dom'

const SinglePotion = ({ id, name, image, ingredients, instructions }) => {
  console.log('ingredients', ingredients)
  console.log('instructions', instructions)

  return (
    <div key={id} className="column is-one-quarter-desktop is-one-third-tablet">
      <Link to={`/potions/${id}`}>
        <div className="card potion">
          <div className="card-header">
            <div className="card-header-title">{name}</div>
          </div>
          <div className="card-image">
            <figure className="image image-is-1by1">
              <img src={`../../assets/${ image }`} alt={`${name}`} />
            </figure>
          </div>
          <div className="card-content">
            <div className="columns is-multiline">
              <h3 className="card-title">Ingredients:</h3>
              { ingredients.map((ingredient, i) => {
                return <h5 key={i}>{ingredient.name}</h5>
              })} 
            </div>
            {/* <div className="columns is-multiline">
              { instructions.map((instruction, i) => {
                return <h5 key={i}>{instruction.description}</h5>
              })} 
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  )
}
export default SinglePotion