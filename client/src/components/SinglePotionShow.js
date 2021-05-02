import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory, Link } from 'react-router-dom' //
import { getPayloadFromToken, getTokenFromLocalStorage } from '../auth/auth'




const SinglePotionShow = () => { //id, image  { ingredients }
  const params = useParams()
  const history = useHistory()
  const userID = getPayloadFromToken().sub 

  const [potion, setPotion] = useState(null)
  const [isModalActive, setIsModalActive] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/potions/${params.id}`)
      setPotion(response.data)
      console.log('Single potion RESPONSE.DATA', response.data)
    }
    getData()
  }, [])

  const handleDelete = async () => {
    await axios.delete(`/api/potions/${params.id}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    history.push('/potions')
  }

  const triggerModal = () => {
    setIsModalActive(!isModalActive)
  }


  if ( !potion ) return null
  // if (  ) return null || !ingredients

  console.log('potion', `potions/${params.id}`)
  // console.log('name', potions[0].name)
  console.log('id', potion.name)





  const { image, ingredients, instructions, name, id } = potion //, owner


  return (
    <div className="card potion">
      <div className="card-header">
        <div>{name}</div>
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
            return <h5 key={i}>{`${ingredient.name}: ${ingredient.uses}`}</h5>
          })}  
        </div>
        <div className="columns is-multiline">
          <h3 className="card-title">Instructions:</h3>
          
          { instructions.map((instruction, i) => {
            return <ol key={i}>
              <li>{instruction.description}</li>
            </ol>
          })} 
        </div>
        <div className="columns is-multiline">
          { getPayloadFromToken(userID) &&
          <>
            <div className="buttons">
              <Link to={`/potions/${id}/editpotion`} className="button">Edit</Link>
              <button onClick={triggerModal} className="button">Delete</button>
            </div>
            <div className= {isModalActive ? 'modal is-active' : 'modal' }>
              <div className="modal-background"></div>
              <div className="modal-content">
                <p>Are you sure??</p>
                <button onClick={handleDelete} className="button">Delete</button>
              </div>
              <button onClick={triggerModal} className="modal-close is-large" aria-label="close"></button>
            </div>
          </>
          }
        </div>
      </div>
    </div>

  )
}

export default SinglePotionShow