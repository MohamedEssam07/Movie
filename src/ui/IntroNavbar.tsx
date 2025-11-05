import {
    Box,
    Flex,
    HStack,
    Text,
    IconButton,
    Image,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

import bLogo from "../assets/BLogo.svg"
const IntroNavbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box bg={"transparent"} px={6} py={3} position="sticky" top="0" zIndex="1000">
            <Flex justify={{ base: "space-between", md: "space-around" }} align="center">
                {/* Logo */}
                <HStack spacing={2}>
                    <Image src={bLogo} alt="Logo" h="30px" w="30px" borderRadius="full" />
                    <Text fontSize="lg" fontWeight="bold">Kino</Text>
                </HStack>

                {/* Desktop Links */}
                <HStack spacing={10} display={{ base: "none", md: "flex" }}>
                    <Text as={NavLink} to="/home" cursor="pointer" _hover={{ color: "teal.400" }}>Home</Text>
                    <Text as={NavLink} to="/movies" cursor="pointer" _hover={{ color: "teal.400" }}>Movies</Text>
                    <Text as={NavLink} to="/tv" cursor="pointer" _hover={{ color: "teal.400" }}>TV Shows</Text>
                    <Text as={NavLink} to="/topimdb" cursor="pointer" _hover={{ color: "teal.400" }}>Top IMDB</Text>
                </HStack>

                {/* Mobile Hamburger */}
                <IconButton
                    display={{ base: "flex", md: "none" }}
                    icon={<HamburgerIcon />}
                    aria-label="Open Menu"
                    onClick={onOpen}
                />
            </Flex>

            {/* Drawer for Mobile */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <VStack spacing={4} mt={10}>
                            <Text as={NavLink} to="/home" onClick={onClose}>Home</Text>
                            <Text as={NavLink} to="/movies" onClick={onClose}>Movies</Text>
                            <Text as={NavLink} to="/tv" onClick={onClose}>TV Shows</Text>
                            <Text as={NavLink} to="/topimdb" onClick={onClose}>Top IMDB</Text>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default IntroNavbar;
