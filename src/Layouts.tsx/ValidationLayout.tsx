import { Outlet } from "react-router";
import Navbar from "../ui/Navbar";

import { Box } from "@chakra-ui/react";

interface IProps {

}
const ValidationLayout = ({ }: IProps) => {
    return (
        <Box >
            <Navbar />
            <Outlet />
        </Box>
    );
};

export default ValidationLayout;