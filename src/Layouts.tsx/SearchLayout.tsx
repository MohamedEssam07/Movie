import { Outlet } from "react-router";
import Navbar from "../ui/Navbar";
import { Box } from "@chakra-ui/react";

interface IProps {

}
const SearchLayout = ({ }: IProps) => {

    return (
        <Box py={"100px"}>
            <Navbar />
            <Outlet />
        </Box>
    );
};

export default SearchLayout;