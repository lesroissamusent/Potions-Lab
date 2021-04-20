
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/NavBar'
import Lab from './components/Lab'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Lab />
          </Route>
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
