import React from 'react'
import aeroplane from '../assets/img/aeroplane.png'
import {Link} from 'react-router-dom'
import "../styles/Page404.css"
const Page404 = () => {
  return (
    <>
    <div className="error-container">
    <div class="error">
        <div class="sky">
            <h2><span>4</span><span>0</span><span>4</span></h2>
            <div class="grass"></div>
            <img src={aeroplane} alt="" class="plane"/>
        </div>
        <div class="field">
            <h2>Opps...looks like you got lost.</h2>
            <Link to='/'>Back To Home</Link>
        </div>
    </div>
    </div>
    </>
  )
}

export default Page404