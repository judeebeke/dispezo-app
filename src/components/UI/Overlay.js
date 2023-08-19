import { uiActions } from '../../store/ui-slice';
import classes from './Overlay.module.css';
import {  useDispatch, useSelector } from "react-redux";


const Overlay = (props) => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(state => state.ui.isMenuOpen)

    const menuHandle = () => {
       dispatch(uiActions.setMenuOpen());
     };

  return (
    <>
        <div className={`${classes.overlay} ${!isMenuOpen && "hidden"}`} onClick={menuHandle}></div>
      {props.children}
    </>
  )
}

export default Overlay
