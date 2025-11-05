import { Box, Image, Text, VStack, Progress } from "@chakra-ui/react";
import Logo from "../assets/BLogo.svg"


import "nprogress/nprogress.css";
interface IProps {

}
const Loader = ({ }: IProps) => {


    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            w="100vw"
            h="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="black"
            color="white"
            zIndex="9999"
            flexDir="column"
            gap={6}
        >
            <VStack spacing={5}>
                <Image
                    src={Logo}
                    alt="App Logo"
                    boxSize={{ base: "120px", md: "150px" }}

                    objectFit="contain"
                />
                <Text fontSize="xl" fontWeight="bold">
                    Loading...
                </Text>
                <Progress
                    w="200px"
                    size="xs"
                    isIndeterminate
                    colorScheme="red"
                    borderRadius="full"
                />
            </VStack>
        </Box>
    );
};

export default Loader;