import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(props) {


  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password, cpassword } = credentials

    if (password !== cpassword) {
      // alert("password not match")
      props.showalert("Password Not Match", "danger")
      return;
    }
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({ name, email, password, cpassword })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // redirect
      localStorage.setItem('token', json.authtoken)
      navigate('/home')
      props.showalert("Account Created Successfully ", "success")
    }
    else {
      props.showalert("invalid information", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const togglePassword=(id1)=>{
    let passwordField = document.getElementById(id1)
        if (passwordField.type === "password") {
            passwordField.type = "text";
        } else {
            passwordField.type = "password";
        }
  }

  // const ctogglePassword=()=>{
  //   let passwordField = document.getElementById("cpassword")
  //       if (passwordField.type === "password") {
  //           passwordField.type = "text";
  //       } else {
  //           passwordField.type = "password";
  //       }
  // }

  return (
    < >
      <div className="container">

        <div className="container1">

          <h1 className='title' style={{textDecoration:'underline',color:'#ff00ec',fontWeight:'bolder'}}>Sign-Up Page</h1>

          <form onSubmit={handleSubmit} id='signup'>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Enter Your Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name='name'
                onChange={onChange}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" name="email" className="form-text"
              ></div>
            </div>


            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                onChange={onChange}
                aria-describedby="emailHelp"

                name='email' />
              <div id="emailHelp" name="email" className="form-text"
              ></div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password"
                className="form-control togglepass"
                id="password"
                name="password"
                onChange={onChange}
                minLength={5} required
              />
               <span className='password-toggle' onClick={()=>{togglePassword('password')}}><strong>Show/Hide</strong> </span>
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input type="password"
                className="form-control togglepass"
                id="cpassword"
                name="cpassword"
                minLength={5} required
                onChange={onChange}
                />
                 <span className='password-toggle' onClick={()=>{togglePassword('cpassword')}}><strong>Show/Hide</strong> </span>
            </div>

            {/* <button type="submit" className="btn btn-primary" >Submit</button> */}
            <button type='submit' className="bn632-hover bn24"><strong>Sign Up</strong></button>
          </form>
        </div>
      </div>
    </>
  )
}









