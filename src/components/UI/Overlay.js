import React, {useContext} from 'react';
import classes from './Overlay.module.css';
import CartContext from "../../store/cart-context"


const Overlay = (props) => {
    const { isMenu } = useContext(CartContext)

    const menuHandle = () => {
       props.onRun(prev => {
           return ( !prev )
       })
     };

  return (
    <>
        <div className={isMenu ? classes.overlay : classes.removeOverlay} onClick={menuHandle}></div>
      {props.children}
    </>
  )
}

export default Overlay
