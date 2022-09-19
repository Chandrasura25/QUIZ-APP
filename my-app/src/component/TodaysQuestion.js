import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import arrayShuffle from 'array-shuffle';
import "../styles/TodaysQ.css"

const TodaysQuestion = () => {
    const navigate = useNavigate()
    const [question, setquestion] = useState([])
    const [shuffled, setshuffled] = useState([])
    const [Pick, setPick] = useState('')
    const [message, setmessage] = useState('');
    const [verify, setverify] = useState(true)
    const [user, setuser] = useState([])
    const [userId, setuserId] = useState('')
    const [isLoading, setisLoading] = useState(true)
    const preloader = useRef()
    const popup = useRef()
    const ref = useRef()
    const url = 'https://opentdb.com/api.php?amount=1&type=multiple';
    const endpoint = 'http://localhost:2030/point'
    const [timer, setTimer] = useState(30);
    const id = useRef(null);
    useEffect(() => {
        id.current = window.setInterval(() => {
            setTimer((time) => time - 1)
        }, 1000)
        return () => clear();
    }, [])
    useEffect(() => {
        if (timer === 0) {
            clear()
            setmessage('Timeout! Timeout!!')
            pop()
        }
    }, [timer])
    const clear = () => {
        window.clearInterval(id.current)
    }
    useEffect(() => {
        if (localStorage.user) {
            let user = JSON.parse(localStorage.user)
            setuser(user)
            setuserId(user[0]._id)
            axios.get(url).then((res) => {
                setquestion(res.data.results);
                setPick(res.data.results[0].correct_answer);
                let answerArray =arrayShuffle([...(res.data.results[0].incorrect_answers), (res.data.results[0].correct_answer)])
                setshuffled(answerArray)
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
    console.log(shuffled);
    const getAnswer = (Input) => {
        if (Input === Pick) {
            setverify(true)
            const points = 100
            let status = false
            if (verify) {
                axios.post(endpoint, { points, userId, status }).then((res) => {
                    console.log(res.data)
                    if (res.data.message) {
                        setmessage(res.data.message)
                        pop()
                    }
                })
            }
        }
        else {
            setverify(false)
            setmessage('Sorry!! Wrong Choice')
            pop()
        }
    }
    const pop = () => {
        ref.current.classList.toggle('active')
        popup.current.classList.toggle('active')
    }
    const goToDashboard = () => {
        navigate('/dashboard')
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
                : user ? question.map((quest, index) => (
                    <div>
                        <div className="Qbody" ref={ref} key={index}>
                            <div className="entire">
                                <div className="title">
                                    <h3>Question of the Day</h3>
                                </div>
                                <div className="question">
                                    <h4>Category - {quest.category}</h4>
                                    <div className='time'>
                                        <div>Time left : {timer} </div>
                                    </div>
                                    <div className="showQuest">
                                        <h3 className="center"
                                        dangerouslySetInnerHTML={{__html:quest.question}}/>
                                        <div className="option">
                                            {shuffled.map((answer, ind) => (
                                                <div key={ind}>
                                                    <div>
                                                        <label htmlFor="" onClick={() => getAnswer(answer)}>
                                                            <input type="radio" name="option" id="" />
                                                            <span>{answer}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id='popup' ref={popup} className="form">
                            <p className='message'>{message}</p>
                            <button className="upload" onClick={goToDashboard}>Go Home</button>
                        </div>
                    </div>


                )) : <div className="alert">Are you trying to jump in?</div>
            }
        </>
    )
}

export default TodaysQuestion