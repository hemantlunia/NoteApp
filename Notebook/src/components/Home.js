import React from 'react';
// import AddNote from './AddNote';
import Notes from './Notes';




export default function Home(props) {
  const {showalert} = props
  return (
    <>
     {/* <AddNote/> */}
     <Notes showalert={showalert} />
     

    </>
  )
}
