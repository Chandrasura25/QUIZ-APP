import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/QuestCategory.css"
const QuestCategory = () => {
  const navigate=useNavigate()
  const cat=(catno,catamount)=>{
     let category = {catNo:catno,catAmount:catamount}
     localStorage.category = JSON.stringify(category)
     navigate('/answerQuest');
  }
  return (
    <>
      <div>
        <div className='QCbody'>
          <div class="QCcontainer">
            <h2>Category of Quest</h2>
            <div class="box" style={{ "--clr": "#fc5f9b" }} onClick={()=>{cat("9","15")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-list" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>General Knowledge</h3>
                  <p>15 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#a362ea" }} onClick={()=>{cat("10","20")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-book" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Entertainment: Books</h3>
                  <p>20 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#0ed095" }} onClick={()=>{cat("11","12")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-file-movie-o" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Entertainment: Film</h3>
                  <p>12 projects</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#DC143C" }} onClick={()=>{cat("12","15")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-music" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Entertainment: Music</h3>
                  <p>15 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#8B008B" }} onClick={()=>{cat("13","16")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-opera" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Entertainment: Musicals & Theatres</h3>
                  <p>16 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#FF1493" }} onClick={()=>{cat("15","20")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-gamepad" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Entertainment: Video Games</h3>
                  <p>20 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#228B22" }} onClick={()=>{cat("17","15")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-tree" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Science and Nature</h3>
                  <p>15 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#4B0082" }} onClick={()=>{cat("18","25")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-desktop" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Science: Computers</h3>
                  <p>25 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#FFA500" }} onClick={()=>{cat("19","15")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-calculator" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Science: Mathematics</h3>
                  <p>15 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#ff0000" }} onClick={()=>{cat("20","20")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-history" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Mythology</h3>
                  <p>20 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#800080" }} onClick={()=>{cat("21",30)}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-soccer-ball-o" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Sports</h3>
                  <p>30 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#FFD700" }} onClick={()=>{cat("22","25")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-tree" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Geography</h3>
                  <p>25 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#708090" }} onClick={()=>{cat("23","25")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-globe" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>History</h3>
                  <p>25 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#ff0000" }} onClick={()=>{cat("24","20")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-balance-scale" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Politics</h3>
                  <p>20 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#BC8F8F" }} onClick={()=>{cat("25","20")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-paint-brush" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Arts</h3>
                  <p>20 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#FF7F50" }} onClick={()=>{cat("26","30")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-beer" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Celebrities</h3>
                  <p>30 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#00008B" }} onClick={()=>{cat("27","15")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-snapchat-ghost" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Animals</h3>
                  <p>15 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#00FF7F" }} onClick={()=>{cat("28","20")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-bus" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Vehicles</h3>
                  <p>20 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#9932CC" }} onClick={()=>{cat("30","15")}}>
              <div class="content">
                <div class="icon">
                  <i class="fa fa-android" aria-hidden="true"></i> 
                </div>
                <div class="text">
                  <h3>Science: Gadgets</h3>
                  <p>15 Quests</p>
                </div>
              </div>
            </div>
            <div class="box" style={{ "--clr": "#FF1493" }} onClick={()=>{cat("32","20")}}>
              <div class="content">
                <div class="icon"> 
                  <i class="fa fa-child" aria-hidden="true"></i>
                </div>
                <div class="text">
                  <h3>Entertainment: Cartoon & Animations</h3>
                  <p>20 Quests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestCategory