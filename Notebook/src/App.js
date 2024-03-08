
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert,setAlert] = useState(null)
  const showalert = (msg,type) => {
    setAlert({
      msg:msg,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>
        <Alert alert={alert} />
        <div className="container">

        <Routes>
          <Route path='/home' element= {<Home showalert={showalert}/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/login' element={<Login showalert={showalert}/>}/>
          <Route path='/signup' element={<Signup showalert={showalert}/>}/>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
