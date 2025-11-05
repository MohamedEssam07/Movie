import { Outlet, useLocation } from "react-router";
import Navbar from "../ui/Navbar";
import Filter from "../ui/Filter";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import AutoSearch from "../ui/AutoSearch";
import SearchNavbar from "../ui/SearchNavbar";
import ScrollToTopButton from "../ui/ScrollToUpButton";
import { useEffect } from "react";

interface IProps {

}
const SecondLayout = ({ }: IProps) => {
    const { pathname } = useLocation()
    const showFilterRoutes = ["/movies", "/tv",];

    const shouldShowFilter = showFilterRoutes.some((path) =>
        pathname === (path)
    )


    const windowScrollY = useBreakpointValue({ base: 1000 }) ?? 0;


    return (
        <Box >
            <SearchNavbar />
            {shouldShowFilter && <Filter />}
            <Box>
                <ScrollToTopButton windowScrollY={windowScrollY} top={20} bottom={0} right={"5px"} />
            </Box>
            <Outlet />
        </Box>
    );
};

export default SecondLayout;