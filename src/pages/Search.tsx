import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";

const Search = () => {
    return (
        <Box mt="115px">
            <Outlet />
        </Box>
    );
};

export default Search;