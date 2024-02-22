import React from 'react'

export default function Alert(props) {
    let capital = (word)=>{
      if(word==="danger"){
        word="error"
      }
       let lower = word.toLowerCase()
       return lower.charAt(0).toUpperCase() + lower.slice(1)
    }
    return (
        <div className='container' style={{height:'50px'}}>
          { props.alert && <div className= {`container alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
              <strong>{capital(props.alert.type)}</strong>  :  {props.alert.msg}  
                
            </div>}
            </div>
    )
}
