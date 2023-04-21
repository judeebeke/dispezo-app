import React from 'react'

const Button = (props) => {
  return (
    <button className={`btn ${props.styles}`} type={props.type} onClick={props.onSignIn}>
      {props.text}{props.children}
    </button>
  )
}

export default Button
