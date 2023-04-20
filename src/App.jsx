import React, { Fragment, useContext } from "react";
import Pages from "./components/pages";
import Auth from "./components/Auth";
import CartContext from './store/cart-context';




const App = () => {
    const {isAuth, setAuth} =  useContext(CartContext);

  return (
    <Fragment>{!isAuth ? <Auth setIsAuth={setAuth} /> : <Pages setIsAuth={setAuth} /> }</Fragment>
  );
};

export default App;
