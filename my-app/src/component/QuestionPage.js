import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/QuestionPage.css';
const QuestionPage = () => {
    const navigate = useNavigate()
    const [result, setresult] = useState([])
    const [message, setmessage] = useState('')
    const getQuest = 'https://quiz-with-asura.herokuapp.com/getquest';
    const popup = useRef()

    useEffect(() => {
        if (localStorage.user) {
            let user = JSON.parse(localStorage.user)
            let id = user[0]._id
            axios.post(getQuest, { id }).then((res) => {
                if (res.data.result.length > 0) {
                    setresult(res.data.result)
                    console.log(res.data.result);
                }
                else {
                    pop()
                    setmessage('Please go to the Quest Page and add a quest')
                }
            })
        }
        else {
            navigate('/login')
        }
    }, [])
    const pop = () => {
        pop.current.classList.toggle('active')
    }
    const goToQuest = () => {
        navigate('/addQuest')
    }
    return (
        <>
            <div>
                {result.length > 0 ?
                    <div>
                        <div className='QPbody'>
                            <div class="QPContainer">
                                <h3>List of Your Questions</h3>
                                {result.map((quest, index) => (
                                    <div key={index}>
                                        <div class="list">
                                            <div class="rank"><span>{index+1}</span></div>
                                            <div class="creator">
                                                <h4>{quest.question}</h4>
                                                <p>{quest.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    : <div>
                        <div id='popup' ref={popup} className="form">
                            <p className='message'>{message}</p>
                            <button className="upload" onClick={goToQuest}>Go Back</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default QuestionPage