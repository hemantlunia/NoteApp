import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [
    // {
    //   "_id": "6559a839ffc7b439b05af0rewd9",
    //   "user": "65589976c61acd3d8313534d",
    //   "title": "my title1",
    //   "description": "my first title ok ok1 ",
    //   "tag": "personal",
    //   "data": "2023-11-19T06:16:25.704Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "655b28e3115we7558dc8837d149",
    //   "user": "65589976c61acd3d8313534d",
    //   "title": "hemant",
    //   "description": "first cloud notes app ",
    //   "tag": "personal",
    //   "data": "2023-11-20T09:37:37.465Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "655b28e1157rwe558dc84837d149",
    //   "user": "65589976c61acd3d8313534d",
    //   "title": "hemant",
    //   "description": "first cloud notes app ",
    //   "tag": "personal",
    //   "data": "2023-11-20T09:37:37.465Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "655b28e11575458dcr38837d149",
    //   "user": "65589976c61acd3d8313534d",
    //   "title": "hemant",
    //   "description": "first cloud notes app ",
    //   "tag": "personal",
    //   "data": "2023-11-20T09:37:37.465Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "655b28e115fsf7558dc28837d149",
    //   "user": "65589976c61acd3d8313534d",
    //   "title": "hemant",
    //   "description": "first cloud notes app ",
    //   "tag": "personal",
    //   "data": "2023-11-20T09:37:37.465Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "655b28e1157558dc883fef37d149",
    //   "user": "65589976c61acd3d8313534d",
    //   "title": "hemant",
    //   "description": "first cloud notes app ",
    //   "tag": "personal",
    //   "data": "2023-11-20T09:37:37.465Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "655b28e11fefe57558dc83837d149",
    //   "user": "65589976c61acd3d8313534d",
    //   "title": "hemant",
    //   "description": "first cloud notes app ",
    //   "tag": "personal",
    //   "data": "2023-11-20T09:37:37.465Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "655b28e1157558dc8egfer837d1493",
    //   "user": "65589976c61acd3d8313534d",
    //   "title": "hemant",
    //   "description": "first cloud notes app ",
    //   "tag": "personal",
    //   "data": "2023-11-20T09:37:37.465Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "655b28e1315fef37558dc8837d149",
    //   "user": "65589976c61acd3d8313534d",
    //   "title": "hemant",
    //   "description": "first cloud notes app ",
    //   "tag": "personal",
    //   "data": "2023-11-20T09:37:37.465Z",
    //   "__v": 0
    // },
  ]

  const [notes, setNotes] = useState(notesInitial)

  // Getting all note

  const getNotes = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      // body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json)
  }




  //   add a note
  const addNote = async (title, description, tag) => {
    // todo api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const newNote = await response.json()
    // console.log(newNote);

    // console.log("adding a new note");
    // const note = {
    //   "_id": "655b28e1315fef37558dc8jd837d149",
    //   "user": "65589976c61acd3d831d3534d",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "data": "2023-11-20T09:37:37.465Z",
    //   "__v": 0
    // }
    // setNotes(notes.concat(note))
    setNotes([...notes,newNote])
  }

  // delete a note
  const deleteNote = async(id) => {
    // todo api call
     await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    // const json = await response.json()
    // console.table(json);

    // console.log("delete " + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  // edit a note
  const editNote = async (id, title, description, tag) => {
    // api call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json()
    console.log("editing note ", json);


    // logic to edit in client
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     element.title = title;
    //     element.description = description;
    //     element.tag = tag;
    //   }

    // }
    setNotes(notes.map(note => note._id === id ? { ...note, title, description, tag } : note));
  }



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;