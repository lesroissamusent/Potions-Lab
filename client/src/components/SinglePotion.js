import React from 'react'
import { Link } from 'react-router-dom'

const SinglePotion = ({ id, name, image, ingredients, instructions }) => {
  // console.log('name', { name })
  // console.log('id', { id })
  console.log('ingredients', { ingredients })
  // console.log('instructions', { instructions })


  
  return (
    <div key={id} className="column is-one-quarter-desktop is-one-third-tablet">
      {name}
      <Link to={`/potions/${id}`}>
        <div className="card">›
          <div className="card-header">
            <div className="card-header-title">{name}</div>
          </div>
          <div className="card-image">
            <figure className="image image-is-1by1">
              <img src={image} alt={`${name}`} />
            </figure>
          </div>
          <div className="card-content">
            <h5>{ingredients}</h5>
            {/* <div className="columns is-multiline">
              { ingredients.map((ingredient, i) => {
                return <h5 key={i}>{ ingredient }</h5>
              })}
            </div> */}
            <h5>{instructions}</h5>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SinglePotion