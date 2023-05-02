import { Link } from "react-router-dom";

import dispezoLogo from "../../assets/dispezo-logo.png";
import Button from "../UI/Button";
import { btnStyles } from "../../style";

const ChatErrorPage = () => {
 return (
    <main className="flex justify-center flex-col items-center text-center mx-auto app-container w-full h-full">
        <img src={dispezoLogo} alt="Dispezo PNG" className="w-2/4 md:w-56" />

        <h1 className="font-bold text-lg pt-20">Oops... Page Error, Not Found. </h1>
        <Button
            type="button"
            styles={`${btnStyles} mt-3`}
          >
            <Link to="/enter-room">Back to Enter Room</Link>
          </Button>
          <Button
            type="button"
            styles={`${btnStyles} mt-3`}
          >
            <Link to="/chat">Refresh</Link>
          </Button>
    </main>
 )
}

export default ChatErrorPage;