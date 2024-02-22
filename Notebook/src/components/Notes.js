
import noteContext from '../context/notes/noteContext';
import { useContext, React, useEffect, useRef ,useState} from 'react';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
    const context = useContext(noteContext)
    let navigate = useNavigate()
    const { notes, getNotes ,editNote} = context
    const [note,setNote] =useState({id:"", etitle:"",edescription:"",etag:"Default"})
    useEffect(() => {
        if(localStorage.getItem('token')){

            getNotes()
        }
        else{
           navigate('/login')
        }
        //  eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
        
        // console.log("clicked");
        // const modalbtn = ref.current;
        // if(modalbtn){
        //     // console.log("cli");
        //     modalbtn.click()
        //     // alert('hekllo')
        // }
    }

    const handleClick = (e) => {
        // console.log("updating the note ",note);/
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click()
        props.showalert("Updated Successfully","success")

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const ref = useRef(null)
    const refClose = useRef(null)
    return (
        <>
            <AddNote showalert={props.showalert}/>




            <button ref={ref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" style={{ display: 'none' }}>
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Your Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">


                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text"
                                        className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp"
                                        value={note.etitle}
                                        onChange={onChange} />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription'
                                        value={note.edescription}
                                        onChange={onChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag'
                                       value={note.etag}
                                       onChange={onChange} />
                                </div>

                                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Save Note</button> */}
                            </form>


                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className='row my-3'>
                <h2 className='container mx-2'>Your Note</h2>
                <div className='container mx-3' style={{color:'red'}}>
                    {notes.length===0 && 'Please Add Your Note'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showalert={props.showalert}/>
                })}
            </div>
        </>
    )
}
