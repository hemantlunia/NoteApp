import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
export default function Noteitem(props) {
    const context = useContext(noteContext)
    const {deleteNote} = context
    const { note ,updateNote } = props;
    return (
        <>
            <div className='col-md-3'>
                {/* {note.title}
                {note.description} */}
                <div className="card my-3">
                    <img src="https://source.unsplash.com/random/520x600/?pen/paper" class="card-img-top" alt="..." style={{border:'2px solid red'}}/>
                        <div className="card-body" style={{border:'2px solid #ff00ec'}}>
                            <h2 className="card-title"><strong>Title : - </strong>{note.title}</h2>
                            <p className="card-text"><strong>Description : - </strong>{note.description}</p>
                            <p className="card-text"><strong>Tag : - </strong>{note.tag}</p>
                            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);props.showalert("Deleted Successfully","success")}}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=> {updateNote(note)}}></i>
                            {/* <a to="/" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                </div>
            </div>
        </>
    )
}
