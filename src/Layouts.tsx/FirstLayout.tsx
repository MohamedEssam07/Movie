import { Outlet } from "react-router";


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