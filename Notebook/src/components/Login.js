import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login(props) {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // redirect
            localStorage.setItem('token', json.authtoken)
            props.showalert("Successfully logged-in", "success")
            navigate('/home')
        }
        else {
            props.showalert("Invalid details", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const togglePassword=()=> {
        let passwordField = document.getElementById("password");
        if (passwordField.type === "password") {
            passwordField.type = "text";
        } else {
            passwordField.type = "password";
        }
    }
        

    return (
        <>
            <div className="container">
                <div className="container1">
                    <h1 className='title'><strong style={{textDecoration:'underline',color:'#31ff00'}}>Login Page</strong></h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                value={credentials.email}
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                onChange={onChange}
                                name='email' />
                            <div id="emailHelp" name="email" className="form-text"
                            ></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password"
                                className="form-control"
                                value={credentials.password}
                                id="password" name="password"
                                onChange={onChange} />

                            <span className='password-toggle' onClick={togglePassword}><strong>Show/Hide</strong> </span>
                        </div>

                        {/* <button type="submit" className="btn btn-primary" >Submit</button> */}
                        <button type='submit' className="btn"><strong>Submit</strong></button>
                    </form>
                </div>
            </div>
        </>
    )
}
//   69