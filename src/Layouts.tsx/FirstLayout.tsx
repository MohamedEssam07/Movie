import { Outlet } from "react-router";
import IntroNavbar from "../ui/IntroNavbar";

interface IProps {

}
const FirstLayout = ({ }: IProps) => {
    return (
        <>

            <Outlet />
        </>
    );
};

export default FirstLayout;