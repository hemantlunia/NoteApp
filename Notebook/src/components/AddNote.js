import React, { useContext, useState } from 'react'
// import Notes from './Notes'
import noteContext from '../context/notes/noteContext'

export default function AddNote(props) {
    const context = useContext(noteContext)
    const {addNote} = context
    const [note,setNote] =useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
          e.preventDefault()
          addNote(note.title,note.description,note.tag)
          setNote({title:"",description:"",tag:""})
          props.showalert("Added Successfully","success")
    }
    const onChange=(e)=>{
          setNote({...note,[e.target.name]: e.target.value})
    }
    return (
        <>
            <div className="container my-3" >
                <h1 style={{textDecoration:'underline',fontWeight:'bold',color:'black',marginBottom:'15px'}}>Add Your Notes Here...</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">NoteTitle</label>
                        <input type="text" 
                        className="form-control" id="title" name="title" 
                        style={{width:'100%'}}
                        value={note.title}
                        aria-describedby="emailHelp" onChange={onChange} />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description of note-</label>
                        <textarea type="text" className="form-control" id="description" name='description' rows={8} 
                        style={{border:'2px solid blue',color:'blue',fontWeight:'bold',width:'100%'}}
                        value={note.description}
                        onChange={onChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag'
                        style={{width:'100%'}}
                        value={note.tag}
                        onChange={onChange}/>
                    </div>
                 
                    <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn" style={{width:'100%',color:'#8eff00',fontWeight:'bold'}} onClick={handleClick}>Save Note</button>
                </form>

            </div>
            
        </>
    )
}
