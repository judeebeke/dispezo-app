import {useContext} from 'react';
import CartContext from '../../store/cart-context';
import Button from '../UI/Button';
import {btnStyles} from '../../style'

const ChatRoom = () => {
    const {logginHandler, setCreateRoom, setJoinRoom, setSignUpPage} = useContext(CartContext);

    const logOutHandler = () => {
        setCreateRoom(false)
        logginHandler(false)
        setJoinRoom(false)
        setSignUpPage(false)
    }

    return(
        <main>
            <h2>This is the Chat Room, Coming Soon</h2>
            <Button styles={btnStyles} text='Logout' onSignIn={logOutHandler} />
        </main>
    )
}

export default ChatRoom;