import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory, Link } from 'react-router-dom' 
import { getPayloadFromToken, getTokenFromLocalStorage } from '../auth/auth'

import '../styles/singlePotion.scss'


const SinglePotionShow = () => { 
  const params = useParams()
  const history = useHistory()
  const userID = getPayloadFromToken().sub 

  const [potion, setPotion] = useState(null)
  const [user, setUser] = useState(null)

  const [isModalActive, setIsModalActive] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/potions/${params.id}`)
      setPotion(response.data)
      console.log('Single potion RESPONSE.DATA', response.data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get(`/api/auth/user/${userID}`)
      setUser(response.data)
      console.log('Single potion RESPONSE.DATA', response.data)
    }
    getUserData()
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


  if ( !potion || !user ) return null
  // if (  ) return null || !ingredients

  console.log('potion', `potions/${params.id}`)
  // console.log('name', potions[0].name)
  console.log('id', potion.name)





  const { image, ingredients, instructions, name, id } = potion 


  return (
    <>
      <div className="title">{name} <span className="username">by {user.username}</span></div>
      <div className="columns potion">
        <div className="column is-one-third-desktop is-one-third-tablet column is-multiline">
          <div className="card-image">
            <figure className="image">
              <img src={`../../assets/${ image }`} alt={`${name}`} />
            </figure>
          </div>
        </div>
        <div className="column is-one-third-desktop is-one-third-tablet column is-multiline">
          <div className="card-content info">
            <h3 className="card-header">Ingredients :</h3>
            { ingredients.map((ingredient, i) => {
              return <h4 key={i}>{`${ingredient.name}: ${ingredient.uses}`}</h4>
            })}  
          </div>
        </div>                    
        <div className="column is-one-third-desktop is-one-third-tablet column is-multiline">
          <div className="card-content info">
            <h3 className="card-header">Instructions:</h3>
            { instructions.map((instruction, i) => {
              return <ol key={i}>
                <li>{instruction.description}</li>
              </ol>
            })}
          </div> 
        </div>
      </div>
      <div className="columns is-multiline">
        { getPayloadFromToken(userID) &&
            <>
              <div className="buttons">
                <Link to={`/potions/${id}/editpotion`} className="button single">Edit</Link>
                <button onClick={triggerModal} className="button single">Delete</button>
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
    </>
  )
}

export default SinglePotionShow