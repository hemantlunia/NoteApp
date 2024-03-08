import React,{useEffect} from 'react'
import {
    Link,useLocation, useNavigate
  } from 'react-router-dom';

export default function Navbar() {
    let navigate = useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }

    let location = useLocation();
    useEffect(()=>{
        // console.log(location.pathname);
    },[location])
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" >Cloud-Notes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} aria-current="page" to="/about">About</Link>
                            </li>
                           
                        </ul>
                      {!localStorage.getItem('token')?<form className='d-flex'>
                        <Link className='bn6324-hover bn234 mx-2' to='/login'><strong>Login</strong></Link>
                        <Link className='signup-hovor signup mx-2' to='signup'><strong>SignUp</strong></Link>
                      </form>:<button onClick={handleLogout} className='bn632-hover logout'><strong>Logout</strong></button>}
                    </div>
                </div>
            </nav>
        </>
    )
}
