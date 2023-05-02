import { Outlet } from "react-router-dom";

const Pages = (props) => {
   return (
    <section className='w-screen h-screen app-container flex justify-center items-center'>
      <Outlet />
    </section>
  );
};

export default Pages;
