
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/NavBar'
import Lab from './components/Lab'
import PotionIndex from './components/PotionIndex'
// import PotionShow from './components/PotionShow'
import Login from './auth/login'
import Register from './auth/register'




const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/lab">
            <Lab />
          </Route>
          <Route path="/potions">
            <PotionIndex />
          </Route>
          {/* <Route path="/potions:id">
            <PotionShow />
          </Route> */}
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
