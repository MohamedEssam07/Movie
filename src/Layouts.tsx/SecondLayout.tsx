import { Outlet, useLocation } from "react-router";

import Filter from "../ui/Filter";
import { Box, useBreakpointValue } from "@chakra-ui/react";

import SearchNavbar from "../ui/SearchNavbar";
import ScrollToTopButton from "../ui/ScrollToUpButton";


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
            {/* Filter moved into individual pages to sit beside the sort Select */}
            <Box>
                <ScrollToTopButton windowScrollY={windowScrollY} top={20} bottom={0} right={"5px"} />
            </Box>
            <Outlet />
        </Box>
    );
};

export default SecondLayout;