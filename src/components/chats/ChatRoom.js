import {useContext} from 'react';
import CartContext from '../../store/cart-context';
import Button from '../UI/Button';
import {btnStyles} from '../../style'

const ChatRoom = () => {
    const {setCreateRoom} = useContext(CartContext)
    return(
        <main>
            <h2>This is the Chat Room, Coming Soon</h2>
            <Button styles={btnStyles} text='Logout' onSignIn={()=>{setCreateRoom(prev => !prev)}} />
        </main>
    )
}

export default ChatRoom;