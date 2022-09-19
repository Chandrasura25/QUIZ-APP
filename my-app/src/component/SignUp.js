import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import axios from 'axios'
import '../styles/SignUp.css'
const SignUp = () => {
    const navigate = useNavigate()
    const password = useRef();
    const toggle = useRef();
    const i = useRef()
    const [errMessage, seterrMessage] = useState('')
    const showHide = () => {
        if (password.current.type === 'password') {
            password.current.setAttribute('type', 'text');
            toggle.current.classList.add('hide');
            i.current.classList = "fa fa-eye-slash"
        }
        else {
            password.current.setAttribute('type', 'password');
            i.current.classList = "fa fa-eye"
            toggle.current.classList.remove('hide')
        }
    }
    const url = 'http://localhost:2030/signup'
    const formik = useFormik({
        initialValues: {
            fullname: "",
            username: "",
            email: "",
            password: "",
            points: 0,
            imageUrl:'',
            status:false
        },
        onSubmit: (values) => {
            console.log(values);
            axios.post(url, values).then((res) => {
                console.log(res);
                seterrMessage(res.data.message)
                navigate('/login')
            }).catch((err) => {
                console.log(err);
            })
        },
        validate: (values) => {
            let regexForfullName = /^[\w]{5,}$/
            const length = new RegExp('(?=.{8,})')
            let errors = {};
            if (values.fullname === "") {
                errors.fullname = "This field is required"
            }
            else if (!regexForfullName.test(values.fullname)) {
                errors.fullname = "fullname must be greater than five"
            }
            if (values.username === "") {
                errors.username = "This field is required"
            }
            if (values.email === "") {
                errors.email = "This field is required"
            }
            if (values.password === "") {
                errors.password = "This field is required"
            }
            else if(!length.test(values.password)){
                errors.password = "password must be greater than five"
            }
            return errors;
        }
    });
    console.log(formik.errors)
    return (
        <>
            <div className="body">
                <div class="popup" id="popup-1">
                    <form onSubmit={formik.handleSubmit}>
                        <div class="content">
                            {errMessage ? <p>{errMessage}</p> : null}
                            <h1>Sign Up</h1>
                            <div class="input-field">
                                <input type="text" name="fullname" placeholder="Fullname" className={formik.errors.fullname && formik.touched.fullname ? 'validate is-invalid' : 'validate'} id="" onChange={formik.handleChange} value={formik.values.fullname} onBlur={formik.handleBlur} />

                                {formik.touched.fullname && <span className='text-danger'>{formik.errors.fullname}</span>}
                            </div>
                            <div class="input-field">
                                <input type="text" name="username" placeholder="Username" id="" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} className={formik.errors.username && formik.touched.username ? 'validate is-invalid' : 'validate'} />

                                {formik.touched.username && <span className='text-danger'>{formik.errors.username}</span>}

                            </div>

                            <div class="input-field">
                                <input type="email" onChange={formik.handleChange} name="email" onBlur={formik.handleBlur} value={formik.values.email} placeholder="Email Address" id="" className={formik.errors.email && formik.touched.email ? 'validate is-invalid' : 'validate'} />

                                {formik.touched.email && <span className='text-danger'>{formik.errors.email}</span>}
                            </div>

                            <div class="input-field">
                                <input type="password" onChange={formik.handleChange} name="password" onBlur={formik.handleBlur} value={formik.values.password} placeholder="Password" className={formik.errors.password && formik.touched.password ? 'validate is-invalid' : 'validate'} id="password" ref={password} />
                                <div id="toggle" ref={toggle} onClick={showHide}><i ref={i} class="fa fa-eye" aria-hidden="true"></i></div>

                                {formik.touched.password && <span className='text-danger'>{formik.errors.password}</span>}
                            </div>
                            <button class="second-btn" type='submit'>Sign Up</button>
                            <p>Already have an account? <Link to="/login">Sign In</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp