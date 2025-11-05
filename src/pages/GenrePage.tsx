import { Outlet } from "react-router";
import GenreMenu from "../ui/GenreMenu";
import { Box, Flex } from "@chakra-ui/react";

interface IProps {

}
const GenrePage = ({ }: IProps) => {
    return (
        <Box  >
            <Flex
                display={{ base: "flex", md: "none" }}
                w="100%"
                justifyContent="center"
                position="relative"
                zIndex={9999}
            >
                <Box position="fixed" top="20px" left="50%" transform="translateX(-50%)" zIndex={99999}>
                    <GenreMenu />
                </Box>
            </Flex>
            <Outlet />
        </Box>
    );
};

export default GenrePage;