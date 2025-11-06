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
               
            >
                <Box position="absolute" top="20px" left="50%" zIndex={999} transform="translateX(-50%)" >
                    <GenreMenu />
                </Box>
            </Flex>
            <Outlet />
        </Box>
    );
};

export default GenrePage;