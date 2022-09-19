import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/LandingPage.css'
const LandingPage = () => {
  const navigation = useRef()
  const menuToggle = useRef()
  const toggled = () => {
    menuToggle.current.classList.toggle('active')
    navigation.current.classList.toggle('active')
  }
  return (
    <>
      <div className="contain">
        <header>
          <Link to="/" className="logo">QUIZ ARENA<i class="fa fa-question" aria-hidden="true"></i></Link>
          <div class="toggle" id="toggle" ref={menuToggle} onClick={toggled}></div>
          <ul class="navigationLp" ref={navigation}>
            <li><Link className='a active' to="/">Home</Link></li>
            <li><Link className='a' to="/signup">Sign Up</Link></li>
            <li><Link className='a' to="/login">Login</Link></li>
            <li><Link className='a' to="/contact">Contact</Link></li>
          </ul>
        </header>
        <div className="container">
          <div id="text">
            <span data-text="Q" style={{"--clr":"#FD0592"}} className="span">Q</span>
            <span data-text="U" style={{"--clr":"#FFB001"}} className="span">U</span>
          <span data-text="I" style={{"--clr":"#FE1E4C"}} className="span">I</span>
            <span data-text="Z" style={{"--clr":"#00A689"}} className="span">Z</span>
          </div>
          <h4 className='timed'>TIME</h4>
        </div>
      </div>

    </>
  )
}
export default LandingPage