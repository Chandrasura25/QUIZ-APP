import React, { useState, useEffect,useRef } from 'react'
import "../styles/AddQuestion.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddQuestion = () => {
    const [question, setquestion] = useState('')
    const [optA, setoptA] = useState('')
    const [optB, setoptB] = useState('')
    const [optC, setoptC] = useState('')
    const [optD, setoptD] = useState('')
    const [err, seterr] = useState('')
    const [answer, setanswer] = useState('')
    const [result, setresult] = useState([])
    const [userId, setuserId] = useState('')
    const navigate = useNavigate()
    const popup = useRef()
    const ref = useRef()
    const url = 'https://quiz-with-asura.herokuapp.com/addquest' 
    const getQuest = 'https://quiz-with-asura.herokuapp.com/getquest'; 
    useEffect(() => {
        if (localStorage.user) {
            let user = JSON.parse(localStorage.user)
            setuserId(user[0]._id)
            let id =user[0]._id
            axios.post(getQuest,{id}).then((res)=>{
                setresult(res.data.result)
                console.log(res.data);
            })
        }
        else {
            navigate('/login')
        }
    }, [])
    const addQuest = () => {
        if (question !== '' && answer !== '' && optA !== '' && optB !== '' && optC !== '' && optD !== '') {
            const point = 10;
            let quest = { question, optA, optB, optC, optD, answer, userId, point }
            console.log(quest);
            axios.post(url, quest).then((res) => {
                if (res.data) {
                    seterr(res.data.message)
                    pop()
                  window.location.reload()
                }
            }).catch((err)=>{
                seterr(err)
                pop()
            })
        }
        else {
            seterr('One or some of the field is missing a value')
            pop()
        }
    }
    const pop=()=>{
        ref.current.classList.toggle('active')
        popup.current.classList.toggle('active')   
      }
    const goToDashboard =()=>{
        navigate('/dashboard')
    } 
    const questPage=()=>{
        navigate('/getquest')
    }
    return (
        <>
            <div>
            <div className="questBody" ref={ref}>
                <div className="questBod">
                    <div className="quest">
                        <h4>Add Questions to Your Collection</h4>
                        <div class="form_group">
                            <input type="input" placeholder="Question" class="form_field" onChange={(e) => setquestion(e.target.value)} />
                            <label for="question" class="form_label">Question</label>
                        </div>
                        <div class="form_group">
                            <input type="input" placeholder="Option A" class="form_field" onChange={(e) => setoptA(e.target.value)} />
                            <label for="name" class="form_label">Option A</label>
                        </div>
                        <div class="form_group">
                            <input type="input" placeholder="Option B" class="form_field" onChange={(e) => setoptB(e.target.value)} />
                            <label for="name" class="form_label">Option B</label>
                        </div>
                        <div class="form_group">
                            <input type="input" placeholder="Option C" class="form_field" onChange={(e) => setoptC(e.target.value)} />
                            <label for="name" class="form_label">Option C</label>
                        </div>
                        <div class="form_group">
                            <input type="input" placeholder="Option D" class="form_field" onChange={(e) => setoptD(e.target.value)} />
                            <label for="name" class="form_label">Option D</label>
                        </div>
                        <div class="form_group">
                            <input type="input" placeholder="Answer" class="form_field" onChange={(e) => setanswer(e.target.value)} />
                            <label for="question" class="form_label">Answer</label>
                        </div>
                        <button className="addQ" onClick={addQuest}>Add Quest</button>
                    </div>
                    <div className="showQ">
                        {result?
                            <div className="boxquest" onClick={questPage}>
                                <div>
                                    <h5>Question Added</h5>
                                    <div>{result.length}</div>
                                </div>
                            </div>
                         :null}   
                    </div>
                </div>
                <button className="addQ" onClick={goToDashboard}>Back To Dashboard</button>
            </div>
            <div id='popup' ref={popup} className="form">
                <p className='message err'>{err}</p>
                <button className="upload" onClick={pop}>Okay</button>
            </div>
            </div>
        </>
    )
}

export default AddQuestion