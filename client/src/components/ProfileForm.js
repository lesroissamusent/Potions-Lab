/*eslint-disable no-unused-vars*/
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { ImageUploadField } from '../extra/ImageUploadField'
// import '../../styles/componentStyles/profileForm.scss'
import axios from 'axios'
import { getTokenFromLocalStorage, getPayloadFromToken } from '../auth/auth'


//! Planned a Profile page but ultimately decided against it. 

const ProfileForm = () => {
  const userID = getPayloadFromToken().sub 
  console.log('USERID >>', userID)
  const [user, setUser] = useState(null)

  const [formData, setFormData] = useState({
    first_name: !user ? '' : user.first_name,
    last_name: !user ? '' : user.last_name,
    profile_image: !user ? '' : user.profile_image,
    // bio: '',
    email: !user ? '' : user.email,
    password: !user ? '' : user.password,
    password_confirmation: !user ? '' : user.password,
  })

  // const params = useParams()
  // console.log('params id', userID)
  const history = useHistory()

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get(`/api/auth/user/${userID}`)
      setUser(response.data)
      // setFormData(response.data)
    }
    getUserData()
    console.log('get user ->', user)
  }, [])

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    //setFormData({ ...formData, [event.target.name]: event.target.value })
    setFormData(newFormData)
  }

  const handleImageUrl = url => {
    setFormData({ ...formData, profile_image: url })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    window.alert(`Submitting ${JSON.stringify(formData, null, 2)}`)
    // ! put request for updated form data
    await axios.put(`/api/users/${userID}`, formData, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } } )
    history.push(`/profile/${userID}`)


    // console.log('handleSubmit', handleSubmit)// this line needs to change so that we submit to our db
  }

  //console.log('formdata', formData)
  if (!user) return null


  
  return (
    <main> 
      <>
        <div className="main-profile-form">

     
          <h1 className="form-title">Tell us a little bit about yourself</h1>
          <form
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">First Name:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Last Name:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <ImageUploadField
                name="profile_image"
                value={formData.profile_image}
                handleImageUrl={handleImageUrl}
              />
            </div>

            <div className="field">
              <label className="label">Bio:</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <button className="button is-fullwidth is-dark" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </>
      
    </main>  
  )
}

export default ProfileForm