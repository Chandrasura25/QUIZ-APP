import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Dashboard.css'
import axios from 'axios'

const Dashboard = () => {
  const [user, setuser] = useState([])
  const [userId, setuserId] = useState('')
  const [err, seterr] = useState('')
  const ref = useRef()
  const popup = useRef()
  const togup = useRef()
  const signout = useRef()
  const toggle = useRef()
  const navigation = useRef();
  const main = useRef()
  const url = 'http://localhost:2030/dashboard'
  const endpoint = 'http://localhost:2030/upload'
  const getStatus = 'http://localhost:2030/status'
  let token = localStorage.token;
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(url, {
      headers: {
        "Authorization": `Bearer ${token}`, 
        'Content-Type': "application/json",
        'Accept': "application/json"
      }
    }).then((res) => {
      if (!res.data.status) {
        localStorage.removeItem('token')
        navigate('/login')
      }
      else {
        setuser(res.data.result)
        localStorage.user = JSON.stringify(res.data.result)
        setuserId(res.data.result[0]._id)
      }
    })
  }, [])
  const [myFile, setmyFile] = useState('')
  const [myImage, setmyImage] = useState('')
  const base64 = (e) => {
    let myImage = e.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(myImage)
    reader.onload = () => {
      setmyFile(reader.result)
    }
  }
  const pop = () => {
    ref.current.classList.toggle('active')
    popup.current.classList.toggle('active')
  }
  const signOut = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  const sign =()=>{
    ref.current.classList.toggle('active')
    signout.current.classList.toggle('active')
  }
  const tog = () => {
    ref.current.classList.toggle('active')
    togup.current.classList.toggle('active')
  }
  const toggleMenu = () => {
    navigation.current.classList.toggle('active')
    toggle.current.classList.toggle('active')
    main.current.classList.toggle('active')
  }
  const uploadPic = () => {
    axios.post(endpoint, { myFile, userId }).then((response) => {
      if (response.data.status) {
        console.log(response.data);
        setmyImage(response.data.image)
        ref.current.classList.toggle('active')
        popup.current.classList.toggle('active')
        window.location.reload();
      }
    })
  }
  const todaysQuestion = () => {
    let date = new Date().getDate()
    let month = new Date().getMonth() + 1
    let year = new Date().getFullYear()
    let currentDate = `${date}-${month}-${year}`
    axios.post(getStatus,{userId,currentDate}).then((res)=>{
      if(res.data){
        let stat = ((res.data.user[0].status))
        console.log(stat);
        if (stat === false) {
          navigate('/todaysQ')
        }
        else {
          seterr("The quest is for the day")
          tog()
        }
      }
    })

  }
  const addQuestion = () => {
    navigate('/addQuest')
  }
  const answerQuest = () =>{
    navigate('/questCategory')
  }
  return (
    <>
      {
        user.map((user, index) => (
          <div key={index}>
            <div>
              <div className="dashboard-body" ref={ref}>
                <div className="dashboard-container">
                  <div className="sidebar">
                    <div class="navigation" ref={navigation}>
                      <ul>
                        <li>
                          <Link to="">
                            <span class="icon"><i class="fa fa-home" aria-hidden="true"></i></span>
                            <span class="title">Home</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="">
                            <span class="icon"><i class="fa fa-qrcode" aria-hidden="true"></i></span>
                            <span class="title">Points</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="">
                            <span class="icon"><i class="fa fa-comment" aria-hidden="true"></i></span>
                            <span class="title">Attend a Session</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/addQuest">
                            <span class="icon"><i class="fa fa-question" aria-hidden="true"></i></span>
                            <span class="title">Provide Questions</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="">
                            <span class="icon"><i class="fa fa-cog" aria-hidden="true"></i></span>
                            <span class="title">Setting</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="" onClick={pop}>
                            <span class="icon"><i class="fa fa-upload" aria-hidden="true"></i></span>
                            <span class="title">Upload Picture</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="" onClick={sign}>
                            <span class="icon"><i class="fa fa-sign-out" aria-hidden="true"></i></span>
                            <span class="title">Sign Out</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="main-container" ref={main}>
                    <div class="topbar">
                      <div class="">
                        <div class="toggled" ref={toggle} onClick={toggleMenu}></div>
                      </div>
                      <div class="search">
                        <label for="">
                          <input type="search" name="" placeholder="Search Here" id="" />
                          <i class="fa fa-search" aria-hidden="true"></i>
                        </label>
                      </div>
                      <div className="userCon">
                        <h4>{user.username}</h4>
                        <div class="user">
                          <img src={user.imageUrl ? user.imageUrl : myImage} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="mainCon">
                      <div className="box" style={{ "--clr": "#FD0592" }} onClick={todaysQuestion}>
                        <h2>Break The Day</h2>
                        <h5>Solve today's Question to add more points</h5>
                        <p>100 points</p>
                      </div>
                      <div className="box" style={{ "--clr": "#ccc" }} onClick={addQuestion}>
                        <h2>Question Arena</h2>
                        <h5>Add Questions to your Collections</h5>
                        <p>10 points</p>
                      </div>
                      <div className="box" style={{ "--clr": "#FE1E4C" }} onClick={answerQuest}>
                        <h2>Answer Barrier</h2>
                        <h5>Energize your Brain cells, More challenges they say enpowers the WILL</h5>
                      </div>
                      <div className="box" style={{ "--clr": "#00A689" }}>
                        <h2>Points Calculator</h2>
                        <h5 className='point'>{user.points}</h5>
                      </div>
                      <div className="box" style={{ "--clr": "#FFB001" }}>
                        <h2>Random Questions</h2>
                        <h5>Just a quick review! Try It</h5>
                      </div>
                      <div className="box" style={{ "--clr": "#6ce190" }}>
                        <h2>Group Work</h2>
                        <h5>Group work and co-operation, How motivated are you guys in working Together? </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div id='popup' ref={popup} className="form">
              <i class="fa fa-close" aria-hidden="true" onClick={pop}></i>
              <h3>Upload Your Profile Picture</h3>
              <input type="hidden" value={user._id} placeholder="Account Number" id="" className="form_field" />
              <div class="form_group">
                <input type="file" name="" placeholder="Amount" id="" className="form_field" onChange={(e) => base64(e)} accept="image/*" />
              </div>
              <button onClick={uploadPic} className="upload">upload</button>
            </div>

            <div id='popup' ref={togup} className="form">
              <p className='message err'>{err}</p>
              <button className="upload" onClick={tog}>Okay</button>
            </div>

            <div id='popup' ref={signout} className="form">
              <p className='message err'>Are you sure you want to sign out?</p>
              <button className="upload" onClick={tog}>No</button>
              <button className="upload" onClick={signOut}>Yes</button>
            </div>
        
          </div>
        ))}
    </>
  )
}

export default Dashboard