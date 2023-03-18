import {useContext} from 'react';
import CartContext from '../../store/cart-context';
import Button from '../UI/Button';
import {btnStyles} from '../../style'

const ChatRoom = () => {
    const {logginHandler, setCreateRoom} = useContext(CartContext);

    const logOutHandler = () => {
        setCreateRoom(prev => !prev)
        logginHandler(false)
    }

    return(
        <main>
            <h2>This is the Chat Room, Coming Soon</h2>
            <Button styles={btnStyles} text='Logout' onSignIn={logOutHandler} />
        </main>
    )
}

export default ChatRoom;