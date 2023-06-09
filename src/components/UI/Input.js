import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  return (
      <div className={classes.input}>
          <label htmlFor={props.inputFor}>{props.label}</label>
          <input ref={ref} {...props.input} className={props.inputStyle} />
    </div>
  )
})

export default Input