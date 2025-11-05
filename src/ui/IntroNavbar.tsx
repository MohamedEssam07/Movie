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
    useColorMode,
    Button,
    Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";

import bLogo from "../assets/BLogo.svg"
import { MoonIcon, SunIcon } from "lucide-react";
import CookieService from "../services/CookieService";
const links = [
    { name: "Home", to: "/home" },
    { name: "Movies", to: "/movies" },
    { name: "Series", to: "/tv" },
    { name: "Top IMDB", to: "/topimdb" },
];
const IntroNavbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const token = CookieService.get("jwt")
    const user = CookieService.get("user")
    const nav = useNavigate()

    return (
        <Box bg={"transparent"} px={6} py={3} position="sticky" top="0" zIndex="1000">
            <Flex justify={{ base: "space-between", md: "space-around" }} align="center">
                {/* Logo */}
                <HStack spacing={2}>
                    <Image src={bLogo} alt="Logo" h="30px" w="30px" borderRadius="full" />
                    <Text fontSize="lg" color={colorMode === "light" ? "blue.500" : ""} fontWeight="bold">Kino</Text>
                </HStack>

                {/* Desktop Links */}
                <HStack spacing={10} display={{ base: "none", md: "flex" }} color={colorMode === "light" ? "blue.500" : ""} >
                    <Text as={NavLink} to="/home" cursor="pointer" _hover={{ color: colorMode === "light" ? "white" : "teal.400", transition: "all 0.3s ease-in-out" }}>Home</Text>
                    <Text as={NavLink} to="/movies" cursor="pointer" _hover={{ color: colorMode === "light" ? "white" : "teal.400", transition: "all 0.3s ease-in-out" }}>Movies</Text>
                    <Text as={NavLink} to="/tv" cursor="pointer" _hover={{ color: colorMode === "light" ? "white" : "teal.400", transition: "all 0.3s ease-in-out" }}>TV Shows</Text>
                    <Text as={NavLink} to="/topimdb" cursor="pointer" _hover={{ color: colorMode === "light" ? "white" : "teal.400", transition: "all 0.3s ease-in-out" }}>Top IMDB</Text>
                </HStack>

                {/* Mobile Hamburger */}
                <IconButton
                    display={{ base: "flex", md: "none" }}
                    icon={<HamburgerIcon boxSize={6} />}
                    aria-label="Open Menu"
                    onClick={onOpen}
                    bg={colorMode === "light" ? "gray.800" : "transparent"}
                    color={colorMode === "light" ? "blue.600" : "blue.500"}
                    _hover={{
                        bg: colorMode === "light" ? "gray.900" : "gray.600",
                    }}
                    _active={{
                        bg: colorMode === "light" ? "gray.400" : "gray.500",
                    }}
                    p={2.5}
                    borderRadius="lg"
                    shadow="sm"
                />
            </Flex>

            {/* Drawer for Mobile */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent
                    bg="rgba(15, 15, 20, 0.65)"
                    backdropFilter="blur(10px) saturate(180%)"

                    border="1px solid rgba(255, 255, 255, 0.1)"
                    boxShadow="0 8px 32px rgba(0, 0, 0, 0.37)"
                    color="white"

                    transition="transform 0.1s ease-out, opacity 0.1s ease-out"
                >
                    <DrawerCloseButton />
                    <DrawerBody>
                        <VStack spacing={6} align="stretch" py={"50px"}>

                            {links.map((item: any) => (
                                <NavLink

                                    key={item.name}
                                    to={item.to}
                                    onClick={onClose}
                                    style={({ isActive }) => ({
                                        color: isActive ? "#63b3ed" : "rgba(255,255,255,0.9)",
                                        fontWeight: "500",
                                        textDecoration: "none",
                                    })}
                                >
                                    <Box mb={"10px"}>
                                        {item.name}
                                    </Box>
                                </NavLink>
                            ))}


                            {token ?
                                <Box display="flex" flexDir={"column"} alignItems="center" gap="2">
                                    <Avatar name={user?.username} size="lg" />
                                    <Text fontWeight="medium" fontSize="lg">👋 Hello, <Text as="span" color="blue.400" fontWeight={"bold"}>{user?.username}</Text>
                                    </Text>
                                </Box>
                                :
                                <Button
                                    bgGradient="linear(to-r, blue.400, blue.600)"
                                    _hover={{
                                        bgGradient: "linear(to-r, blue.500, blue.700)",
                                        transform: "scale(1.05)",
                                    }}
                                    variant="solid"
                                    size="sm"
                                    borderRadius="md"

                                >
                                    Login
                                </Button>
                            }


                            <Button
                                onClick={() => {
                                    nav("/favourites");
                                    onClose();
                                }}
                                variant="outline"
                                borderColor="cyan.400"
                                color="#63b3ed"
                                size="sm"
                                borderRadius="md"
                                py={"20px"}
                                fontWeight="semibold"
                                _hover={{
                                    bg: "yellow.400",
                                    transform: "translateY(-3px) scale(1.05)",
                                    boxShadow: "0px 0px 25px rgba(155, 250, 1, 0.8)",
                                    color: "white"
                                }}
                            >
                                Favourites
                            </Button>
                            <Button
                                w="full"
                                justifyContent="center"
                                rounded="md"
                                py={3}
                                bg="gray.800"
                                color="red.400"
                                fontWeight="semibold"
                                _hover={{
                                    bg: "red.600",
                                    color: "white",
                                    transform: "translateY(-2px)",
                                }}

                                transition="all 0.2s"
                                onClick={() => {
                                    CookieService.remove("jwt");
                                    window.location.reload();
                                }}
                            >
                                Logout
                            </Button>


                            <IconButton
                                aria-label="Toggle color mode"
                                onClick={toggleColorMode}
                                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                                size="sm"
                                color="cyan.300"
                                bg="transparent"
                                _hover={{ bg: "whiteAlpha.200", transform: "scale(1.1)" }}
                                transition="0.2s"
                            />
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default IntroNavbar;
