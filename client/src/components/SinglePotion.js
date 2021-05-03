import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/singlePotion.scss'


const SinglePotion = ({ id, name, image, ingredients }) => { 
  // console.log('ingredients', ingredients)

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
              <h3 className="card-title">Ingredients :</h3>
              { ingredients.map((ingredient, i) => {
                return <h5 key={i} className="tooltip">{ingredient.name}<span className="tooltiptext">{ingredient.uses}</span></h5>
              })} 
              
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default SinglePotion