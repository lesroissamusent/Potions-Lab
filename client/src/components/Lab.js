import React from 'react' //, { useEffect }
import { Link } from 'react-router-dom'

import '../styles/lab.scss'
import '../styles/main.scss'



const App = () => {
  


  return (
    <>
      <div className="container corridor">
        <h5 className="intro">It is often asked whether a Muggle could create a magic potion, given a Potions book and the right ingredients. The answer, unfortunately, is no. As such, dear Muggle, your only hope is to look through the potions cupboard and see if we have already made something of interest to you. Go ahead.</h5>
        <button className="button lab puff-out-ver"><Link to="/potions" className="enter-button">Enter</Link></button>

      </div>
    </>
  )


}

export default App