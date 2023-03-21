import {useState} from 'react';

import CartContext from './cart-context';

const CartProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isCreateRoom, setIsCreateRoom] = useState(false);
    const [isJoinRoom, setIsJoinRoom] = useState(false);
    
    const setIsLoggedInHandler = (bool) => {
        setIsLoggedIn(bool)
    }

    const setIsSignUpHandler = (bool) => {
        setIsSignUp(bool)
    }

    const setisCreateRoomHandler = (bool) => {
        setIsCreateRoom(bool)
    }

    const setIsJoinRoomHandler = (bool) => {
        setIsJoinRoom(bool)
    }

    const chatContext = {
        loggin: isLoggedIn,
        logginHandler: setIsLoggedInHandler,
        createRoom: isCreateRoom,
        setCreateRoom: setisCreateRoomHandler,
        joinRoom: isJoinRoom,
        setJoinRoom: setIsJoinRoomHandler,
        createsRoom: isSignUp, 
        setSignUpPage: setIsSignUpHandler,
    }

    return (
        <CartContext.Provider value={chatContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;