import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import arrayShuffle from 'array-shuffle';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AnswerQuest.css'

const AnswerQuest = () => {
  const [Quest, setQuest] = useState({})
  const [answerArray, setanswerArray] = useState([])
  const [allQuests, setallQuests] = useState([])
  const [answer, setanswer] = useState('')
  const [user, setuser] = useState([])
  const [userId, setuserId] = useState('');
  const [theC, settheC] = useState("")
  const [index, setindex] = useState(0)
  const [isLoading, setisLoading] = useState(true)
  const preloader = useRef()
  const refIndex = useRef({})
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
      pop()
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
      setTimer((30*Number(catAmount)))
      const url = `https://opentdb.com/api.php?amount=${catAmount}&category=${catNo}&difficulty=hard&type=multiple`
      axios.get(url).then((data) => {
        setallQuests(data.data.results)
        let questArray = arrayShuffle([...(data.data.results)])
        setanswer((questArray[index].correct_answer))
        setQuest(questArray[index]);
        let answers = arrayShuffle([...(questArray[index].incorrect_answers), (questArray[index].correct_answer)])
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
  const getAnswer = (ans, ind) => {
    console.log(answer, userId);
    settheC(ind)
  }
  const next = () => {
    refIndex.current[theC].checked = false;
    if (index !== allQuests.length) {
      setindex(index + 1)
      setQuest(allQuests[index]);
      setanswer((allQuests[index].correct_answer))
      let answers = arrayShuffle([...(allQuests[index].incorrect_answers), (allQuests[index].correct_answer)])
      setanswerArray(answers);
    }
    else {
      console.log("danger", index, allQuests.length);
    }
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
          <div className='EAPbody'>
            <div className="APbody" ref={ref}>
              <div className="APcentre">
                <div className="entire">
                    <div className='timeleft'>
                      <div> Time left : <span>{timer}</span></div>
                    </div>
                  <div className="title">
                    <h3>Attend the Quest Session</h3>
                  </div>
                  <div className="question">
                    <h4>Category - {Quest.category}</h4>
                    <div className="showQuest">
                      <div className="que">
                        <h3>{index + 1}</h3>
                        <h3 className="center"
                          dangerouslySetInnerHTML={{ __html: Quest.question }} />
                      </div>
                      <div className="option">
                        {answerArray.map((answer, ind) => (
                          <div key={ind}>
                            <div>
                              <label htmlFor="" onClick={() => getAnswer(answer, ind)}>
                                <input type="radio" ref={ref => { refIndex.current[ind] = ref }} name="option" />
                                <span dangerouslySetInnerHTML={{ __html: answer }} className="span" />
                              </label>
                            </div>
                          </div>
                        ))}
                        <div onClick={next} class="btnLink">Swipe Next<span><i class="fa fa-arrow-right" aria-hidden="true"></i></span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="scoreBoard">
                <div className="sheet">
                  <div className="sheetBx">
                    <Link to="#" style={{ "--clr": "#e91e63" }} className='sheetLink'>$1 000 000</Link>
                    <Link to="#" style={{ "--clr": "#04fe4d" }} className='sheetLink'>$500 000</Link>
                    <Link to="#" style={{ "--clr": "#fc5f9b" }} className='sheetLink'>$100 000</Link>
                    <Link to="#" style={{ "--clr": "#a362ea" }} className='sheetLink'>$50 000</Link>
                    <Link to="#" style={{ "--clr": "#0ed095" }} className='sheetLink'>$25 000</Link>
                    <Link to="#" style={{ "--clr": "#DC143C" }} className='sheetLink'>$10 000</Link>
                    <Link to="#" style={{ "--clr": "#8B008B" }} className='sheetLink'>$5 000</Link>
                    <Link to="#" style={{ "--clr": "#FF1493" }} className='sheetLink'>$1 000</Link>
                    <Link to="#" style={{ "--clr": "#228B22" }} className='sheetLink'>$500</Link>
                    <Link to="#" style={{ "--clr": "#4B0082" }} className='sheetLink'>$100</Link>
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