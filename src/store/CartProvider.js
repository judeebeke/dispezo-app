import {useState} from 'react';

import CartContext from './cart-context';

const CartProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCreateRoom, setIsCreateRoom] = useState(false);
    
    const setIsLoggedInHandler = () => {
        setIsLoggedIn(prev => {
            return (!prev)
        })
    }

    const chatContext = {
        loggin: isLoggedIn,
        logginHandler: setIsLoggedInHandler,
        createRoom: isCreateRoom,
        setCreateRoom: setIsCreateRoom,
    }

    return (
        <CartContext.Provider value={chatContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;