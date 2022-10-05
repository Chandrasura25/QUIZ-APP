import React, { useRef, useState } from 'react'
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup';
import axios from 'axios';

const Login = () => {
    const [errMessage, seterrMessage] = useState('')
    const password = useRef();
    const toggle = useRef();
    const i = useRef()
    const navigate = useNavigate();
    const url = 'http://localhost:2030/login'
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
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            console.log(values)
            axios.post(url, values).then((res) => {
                seterrMessage(res.data.message)
                localStorage.token = (res.data.myToken)
                navigate('/dashboard')
            }).catch((err) => {
                console.log(err);
            })
        },
        validationSchema: yup.object({
            email: yup.string().email("Must be an email").required("This field must be filled").min(8),
            password: yup.string().matches(/^[\w]{5,}$/, "Must be greater than five characters").required("This field is required")
        })
    });
    return (
        <>
            <div className="body">
                <div class="popup" id="popup-1">
                    <form onSubmit={formik.handleSubmit}>
                        <div class="content">
                            {errMessage ? <p>{errMessage}</p> : null}
                            <h1>Sign in</h1>
                            <div class="input-field">
                                <input type="email" onChange={formik.handleChange} name="email" onBlur={formik.handleBlur} value={formik.values.email} placeholder="Email Address" id="" className={formik.errors.email && formik.touched.email ? 'validate is-invalid' : 'validate'} />

                                {formik.touched.email && <span className='text-danger'>{formik.errors.email}</span>}
                            </div>

                            <div class="input-field">
                                <input type="password" onChange={formik.handleChange} name="password" onBlur={formik.handleBlur} value={formik.values.password} placeholder="Password" className={formik.errors.password && formik.touched.password ? 'validate is-invalid' : 'validate'} id="" ref={password} />
                                <div id="toggle" onClick={showHide} ref={toggle}><i ref={i} class="fa fa-eye" aria-hidden="true"></i></div>

                                {formik.touched.password && <span className='text-danger'>{formik.errors.password}</span>}
                            </div>
                            <button class="second-btn">Sign in</button>
                            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login