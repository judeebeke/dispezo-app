import { useContext } from'react';
import SignUp from "./SignUp";
import CartContext from "../store/cart-context";
import ChatRoom from './chats/ChatRoom';

const Pages = () => {
    const {createRoom} = useContext(CartContext)
    return (
    <section className={`w-screen h-screen app-container flex justify-center`}>
           {!createRoom ? <SignUp /> : <ChatRoom />}
    </section>
    )
}

export default Pages;