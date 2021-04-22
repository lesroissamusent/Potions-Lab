import React, { useState } from 'react'
import axios from 'axios'
import '../styles/register.scss'
import '../styles/main.scss'
import seal from '../assets/hogwarts-seal.png'


const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    first_name: 'user',
    last_name: 'user',
    profile_image: 'image.jpg',
  })
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  console.log(errors, setErrors)
  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log('newFormData', newFormData)
    setFormData(newFormData)
  }
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/register/', formData)
      console.log(response)
    } catch (err) {
      console.log(err.response)
      setErrors(err.response.data)
    }
  }
  // if ( !errors ) return null
  console.log('ERRORS', errors)
  return (
    <section className="main has-text-centered">
      <div className="container">
        <div className="columns">
          <form className="column is-half is-offset-one-quarter box" onSubmit={handleSubmit}>
            <div className="seal">
              <img src={ seal } />
            </div>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className={`input ${errors && errors.username ? 'is-danger' : ''}`}
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              { errors.username && <p className="help is-danger">{errors.username}</p> }
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className={`input ${errors.email ? 'is-danger' : ''}`}
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              { errors.email && <p className="help is-danger">{errors.email}</p> }
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className={`input ${errors.password ? 'is-danger' : ''}`}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              { errors.password && <p className="help is-danger">{errors.password}</p> }
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input
                  className={`input ${errors.password_confirmation ? 'is-danger' : ''}`}
                  type="password"
                  placeholder="Password Confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                />
              </div>
              { errors.password_confirmation && <p className="help is-danger">{errors.password_confirmation}</p> }
            </div>
            <div className="field">
              <button type="submit" className="button is-fullwidth">Register</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
export default Register