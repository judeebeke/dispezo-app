import { Link } from "react-router-dom";

import dispezoLogo from "../../assets/dispezo-logo.png";
import Button from "./Button";
import { btnStyles } from "../../style";

const ErrorPage = () => {
 return (
    <main className="flex justify-center flex-col items-center text-center mx-auto app-container w-full h-full">
        <img src={dispezoLogo} alt="Dispezo PNG" className="w-2/4 md:w-56" />

        <h1 className="font-bold text-lg pt-20">Oops... Page Not Found. </h1>
        <Button
            type="Go to homepage"
            styles={`${btnStyles} mt-3`}
          >
            <Link to="/">Login</Link>
          </Button>
    </main>
 )
}

export default ErrorPage;