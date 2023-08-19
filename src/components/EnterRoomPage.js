import {useEffect} from "react"
import { useSelector } from "react-redux";
import Button from "./UI/Button";
import dispezoImage from '../assets/assest-image.png';
import { btnStyles } from "../style";
import { Link, useNavigate } from "react-router-dom";

const EnterRoomPage = () => {
  const currentUser = useSelector(state => state.ui.user)
  const navigate = useNavigate();

  useEffect(()=> {
    if(currentUser === null) {
      navigate('/')
    }
  })
  const  EnterRoomOption = <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
  <Button
    styles={btnStyles}> <Link to="/enter-room/createRoom">Create Room</Link></Button>
    <Button
    styles={btnStyles}> <Link to="/enter-room/joinRoom">Join Room</Link></Button>
    </div>

 return (
    <section className="flex flex-col items-center free-design-cont mt-24 gap-y-10">
        <img
          src={dispezoImage}
          alt="Dispezo UI"
          className="free-design"
        />
      <header className="mb-16">
        <h2 className="text-2xl text-main font-semibold">Dispezo Gen-Z</h2>
      </header>
      {EnterRoomOption}
    </section>
  );
};
export default EnterRoomPage;
