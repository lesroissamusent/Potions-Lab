import React, { useState } from 'react'
import axios from 'axios'
import '../styles/main.scss'


const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  console.log(errors, setErrors)

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/login')
      console.log(response)
    } catch (err) {
      console.log(err.response)
      setErrors(err.response.data.errors)
    }
  }

  // if ( !errors ) return null
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form className="column is-half is-offset-one-quarter box" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className={`input ${errors.username ? 'is-danger' : ''}`}
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
                  className={`input ${errors.passwordConfirmation ? 'is-danger' : ''}`}
                  type="password"
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                />
              </div>
              { errors.passwordConfirmation && <p className="help is-danger">{errors.passwordConfirmation}</p> }
            </div>
            <div className="field">
              <button type="submit" className="button is-fullwidth is-warning">Register</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Register