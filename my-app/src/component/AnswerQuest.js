import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import arrayShuffle from 'array-shuffle';
import { useNavigate } from 'react-router-dom';

const AnswerQuest = () => {
  const [Quest, setQuest] = useState({})
  const [answerArray, setanswerArray] = useState([])
  const [allQuests, setallQuests] = useState([])
  const [user, setuser] = useState([])
  const [userId, setuserId] = useState('')
  const [message, setmessage] = useState('');
  const [isLoading, setisLoading] = useState(true)
  const preloader = useRef()
  const popup = useRef()
  const ref = useRef()
  const [timer, setTimer] = useState(3000);
  const id = useRef(null);
  const navigate = useNavigate()
  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1)
    }, 1000)
    return () => clear();
  }, [])
  useEffect(() => {
    if (timer === 0) {
      clear()
      // setmessage('Timeout! Timeout!!')
      // pop()
    }
  }, [timer])
  const clear = () => {
    window.clearInterval(id.current)
  }
  const pop = () => {

  }
  useEffect(() => {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user)
      setuser(user)
      setuserId(user[0]._id)
      let cat = JSON.parse(localStorage.category)
      let { catNo, catAmount } = cat
      const url = `https://opentdb.com/api.php?amount=${catAmount}&category=${catNo}&difficulty=hard&type=multiple`
      axios.get(url).then((data) => {
        setallQuests(data.data.results)
        let questArray = arrayShuffle([...(data.data.results)])
        setQuest(questArray[0]);
        let answers = arrayShuffle([...(questArray[0].incorrect_answers), (questArray[0].correct_answer)])
        setanswerArray(answers);
        window.addEventListener('load', function () {
          preloader.current.classList.add('complete')
        })
        setisLoading(false)
      })
    }
    else {
      navigate('/login')
    }
  }, [])
  const getAnswer = (answer) => {

  }
  return (
    <>
      {isLoading ?
        <div className="preloader" ref={preloader}>
          <div class="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        : user ?
          <div>
            <div className="Qbody" ref={ref}>
              <div className="entire">
                <div className="title">
                  <h3>Attend the Quest Session</h3>
                </div>
                <div className="question">
                  <h4>Category - {Quest.category}</h4>
                  <div className='time'>
                    <div>Time left : {timer} </div>
                  </div>
                  <div className="showQuest">
                    <h3 className="center"
                      dangerouslySetInnerHTML={{ __html: Quest.question }} />
                    <div className="option">
                      {answerArray.map((answer, ind) => (
                        <div key={ind}>
                          <div>
                            <label htmlFor="" onClick={() => getAnswer(answer)}>
                              <input type="radio" name="option" id="" />
                              <span dangerouslySetInnerHTML={{ __html: answer }} />
                            </label>
                          </div>
                        </div>
                      ))}
                      <span>Prev</span>
                      <span>Next</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div id='popup' ref={popup} className="form">
                        <p className='message'>{message}</p>
                        <button className="upload" onClick={goToDashboard}>Go Home</button>
                    </div> */}
          </div>
          : <div className="alert">Are you trying to jump in?</div>
      }
    </>
  )
}
export default AnswerQuest