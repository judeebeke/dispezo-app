import {useState, useEffect} from "react";
import { Outlet } from "react-router-dom";
import {Link} from "react-router-dom";
import {AiOutlineArrowLeft} from 'react-icons/ai';

const Pages = (props) => {

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [])

   return (
    <section className='w-screen h-screen app-container flex justify-center items-center'>
      {(currentPath !== "/enter-room") && <Link
        to="/enter-room"
        className="text-xl flex justify-center items-center text-mildWhite bg-main rounded-lg h-9 w-7 absolute top-10 left-7"
      >
        <AiOutlineArrowLeft />
      </Link>}
      <Outlet />
    </section>
  );
};

export default Pages;
