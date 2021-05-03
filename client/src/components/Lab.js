import React from 'react' //, { useEffect }
import { Link } from 'react-router-dom'

import '../styles/lab.scss'
import '../styles/main.scss'



const App = () => {
  


  return (
    <>
      <div className="container corridor">
        <h5 className="intro">It is often asked whether a Muggle could create a magic potion, given a Potions book and the right ingredients. The answer, fortunately, is yes. But beware Muggle, you enter at your own risk.</h5>
        <button className="button lab puff-out-ver"><Link to="/potions" className="enter-button">Enter</Link></button>

      </div>
    </>
  )


}

export default App