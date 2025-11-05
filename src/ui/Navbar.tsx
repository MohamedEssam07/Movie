import {
    Box,
    Flex,
    HStack,
    Text,
    Button,
    IconButton,
    useColorMode,

    Image,

    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    VStack,
    DrawerCloseButton,
    Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, NavLink, useNavigate } from "react-router";
import GenreMenu from "./GenreMenu";

import bLogo from "../assets/BLogo.svg"
import { memo, useEffect, useState } from "react";

import CookieService from "../services/CookieService";
import ProfileMenu from "./ProfileModal";

const links = [
    { name: "Home", to: "/home" },
    { name: "Genre", to: "/genre/12", custom: <GenreMenu /> },
    { name: "Movies", to: "/movies" },
    { name: "Trending", to: "/trending" },
    { name: "Top IMDB", to: "/topimdb" },
    { name: "Series", to: "/tv" },
];
const Navbar = () => {
    const token = CookieService.get("jwt")
    const user = CookieService.get("user")
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const nav = useNavigate()
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <Box
            position="fixed"
            top="0"
            w="100%"
            zIndex="1000"
            transition="0.3s"
            backdropFilter={scrolled ? "blur(10px)" : "none"}
            bg={"transparent"}
            boxShadow={scrolled ? "0 2px 15px rgba(0,0,0,0.5)" : "none"}
        >
            <Flex
                maxW="1200px"
                mx="auto"
                py={3}
                px={6}
                justify="space-between"
                align="center"
            >
                {/* Left side - Logo */}
                <HStack spacing={2}>
                    <Link to={"/"}>
                        <Image


                            src={bLogo}
                            alt="Logo"
                            h="35px"
                            w="35px"
                            borderRadius="full"
                        />
                    </Link>
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color="blue.400"
                        letterSpacing="wide"
                    >
                        Kino
                    </Text>
                </HStack>

                {/* Center - Links */}
                <HStack
                    spacing={8}
                    display={{ base: "none", md: "flex" }}
                    position="absolute"
                    left="50%"
                    transform="translateX(-50%)"
                >
                    {links.map((item) =>
                        item.custom ? (
                            <Box key={item.name} color="whiteAlpha.900" fontWeight="medium">
                                {item.custom}
                            </Box>
                        ) : (
                            <NavLink
                                key={item.name}
                                to={item.to}
                                style={({ isActive }) => ({
                                    position: "relative",
                                    color: isActive
                                        ? "#63b3ed"
                                        : "rgba(255,255,255,0.9)",
                                    fontWeight: "500",
                                    textDecoration: "none",
                                })}
                                className="nav-link"
                            >
                                {({ isActive }) => (
                                    <Box
                                        as="span"
                                        position="relative"
                                        _after={{
                                            content: '""',
                                            position: "absolute",
                                            width: isActive ? "100%" : "0%",
                                            height: "2px",
                                            bottom: "-4px",
                                            left: 0,
                                            bg: "blue.400",
                                            transition: "width 0.3s",
                                        }}
                                        _hover={{
                                            color: "blue.300",
                                            _after: { width: "100%" },
                                        }}
                                    >
                                        {item.name}
                                    </Box>
                                )}
                            </NavLink>
                        )
                    )}
                </HStack>

                {/* Right side */}
                <HStack spacing={3} display={{ base: "none", md: "flex" }}>
                    {token ?



                        <ProfileMenu user={user} />

                        :
                        <Button

                            variant="solid"
                            bg="blue.600"
                            color="white"
                            size="sm"
                            boxShadow="0px 0px 15px rgba(59, 130, 246, 0.5)"
                            transition="all 0.3s ease-in-out"

                            _hover={{
                                bg: "blue.700",
                                transform: "translateY(-3px) scale(1.05)",
                                boxShadow: "0px 0px 25px rgba(59, 130, 246, 0.8)",
                            }}
                            _active={{
                                transform: "scale(0.97)",
                                boxShadow: "0px 0px 10px rgba(59, 130, 246, 0.5)",
                            }}
                            w="80px"
                            onClick={() => nav("/login")}
                        >
                            Login
                        </Button>
                    }
                    {token ?
                        <Button
                            onClick={() => nav("/favourites")}
                            color="white"
                            size="sm"
                            colorScheme="blue"
                            boxShadow="0px 0px 15px rgba(5, 93, 235, 0.5)"
                            transition="all 0.3s ease-in-out"
                            w="80px"
                            _hover={{
                                bg: "yellow.400",
                                transform: "translateY(-3px) scale(1.05)",
                                boxShadow: "0px 0px 25px rgba(155, 250, 1, 0.8)",
                            }}
                            _active={{
                                transform: "scale(0.97)",
                                boxShadow: "0px 0px 10px rgba(59, 130, 246, 0.5)",
                            }}
                            variant="outline"
                        >
                            Favourites
                        </Button>
                        :
                        null
                    }
                    <IconButton
                        aria-label="Toggle color mode"
                        onClick={toggleColorMode}
                        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        size="sm"
                        color="white"
                        bg="transparent"
                        _hover={{ bg: "whiteAlpha.200" }}
                    />
                </HStack>

                {/* Menu icon for mobile */}
                <IconButton
                    aria-label="Open menu"
                    icon={<HamburgerIcon />}
                    display={{ base: "flex", md: "none" }}
                    onClick={onOpen}
                    color="white"
                    bg="transparent"
                    _hover={{ bg: "whiteAlpha.200" }}
                />
            </Flex>

            {/* Drawer for mobile menu */}
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay backdropFilter="blur(3px)" />
                <DrawerContent

                    bg="rgba(15, 15, 20, 0.65)"
                    backdropFilter="blur(10px) saturate(180%)"

                    border="1px solid rgba(255, 255, 255, 0.1)"
                    boxShadow="0 8px 32px rgba(0, 0, 0, 0.37)"
                    color="white"

                    transition="transform 0.1s ease-out, opacity 0.1s ease-out"
                >
                    <DrawerCloseButton
                        color="whiteAlpha.900"
                        _hover={{ color: "cyan.300", transform: "scale(1.1)" }}
                        transition="0.1s"
                    />
                    <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                    <DrawerBody mt={"30px"}>
                        <VStack spacing={6} align="stretch">

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
                                    <Text fontWeight="medium" fontSize="lg">
                                        👋 Hello, <Text as="span" color="blue.400">{user?.username}</Text>
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
                                color="cyan.300"
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

export default memo(Navbar);
