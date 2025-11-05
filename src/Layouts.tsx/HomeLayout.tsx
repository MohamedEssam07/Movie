import { Outlet } from "react-router";
import Navbar from "../ui/Navbar";
import ScrollToTopButton from "../ui/ScrollToUpButton";
import { Box, useBreakpointValue } from "@chakra-ui/react";


interface IProps {

}
const HomeLayout = ({ }: IProps) => {
    const windowScrollY = useBreakpointValue({ base: 4000 }) ?? 0;


    return (
        <>
            <Navbar />

            <Outlet />
            <Box >
                <ScrollToTopButton windowScrollY={windowScrollY} bottom={0} top={0} right={"5px"} />
            </Box>
        </>
    );
};

export default HomeLayout;