import { Outlet,  useNavigation } from "react-router-dom";
import Loader from "./UI/Loader";

const Root = () => {
    const navigation = useNavigation();
    return (
    <>
         {navigation.state === "loading" && <Loader />}
        <Outlet />
    </>
    )
}

export default Root;