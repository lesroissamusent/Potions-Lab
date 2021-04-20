
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/NavBar'
import Lab from './components/Lab'
import Login from './auth/login'
import Register from './auth/register'




const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Lab />
          </Route>
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
