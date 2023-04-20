import React from 'react'

const Button = (props) => {
  return (
    <button className={`btn ${props.styles}`} type={props.type} onClick={props.onSignIn}>
      {props.text}
    </button>
  )
}

export default Button
