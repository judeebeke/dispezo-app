import { FadeLoader } from "react-spinners";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={`${classes.loader} flex justify-center items-center`}>
      <div className="w-screen h-screen fixed z-30 bg-main"></div>
      <span className="z-40 fixed">
        <FadeLoader color="#DD8560" height={15} width={5} loading />
      </span>
    </div>
  );
};

export default Loader;
