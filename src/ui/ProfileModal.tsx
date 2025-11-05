import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Avatar,
    Button,
    Center,
    Box,
    Text,
    HStack,
    VStack,
    useColorMode,
} from "@chakra-ui/react";
import { ChevronDownIcon, SettingsIcon, ExternalLinkIcon, SmallCloseIcon, StarIcon } from "@chakra-ui/icons";
import CookieService from "../services/CookieService";
import { useNavigate } from "react-router";
import type { IUser } from "../Interfaces";
import { memo } from "react";
interface IProps {
    user: IUser
}
function ProfileMenu({ user }: IProps) {
    const { colorMode } = useColorMode()
    const nav = useNavigate()
    return (
        <Menu>
            <MenuButton
                as={Button}
                variant="ghost"
                rounded="full"
                cursor="pointer"
                px={3}
                _hover={{ bg: colorMode === "dark" ? "gray.800" : "gray.200" }}
                transition="all 0.2s"
            >


                <Text
                    fontWeight="600"
                    fontSize="md"
                    bgGradient="linear(to-r, cyan.300, blue.400)"
                    bgClip="text"
                    textTransform="capitalize"
                >
                    {user?.username}
                </Text>


            </MenuButton>

            <MenuList
                bg={colorMode === "light" ? "gray.200" : "gray.900"}
                color="white"
                border="transparent"
                borderColor="gray.700"
                boxShadow="0px 10px 40px rgba(0,0,0,0.6)"
                rounded="2xl"
                py={6}
                px={5}
                minW="300px"           // 👈 خلى عرض الكارد أكبر
                animation="slideDown 0.2s ease"
            >
                <Center flexDir="column" mb={4}>
                    <Avatar
                        size="xl"
                        name={user?.username}
                        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.username}`}
                        mb={2}
                    />
                    <Text fontWeight="bold" color={colorMode === "dark" ? "" : "blue.500"} fontSize="lg" mb={1}>
                        {user?.username}
                    </Text>
                    <Text fontSize="sm" color={colorMode === "dark" ? "gray.400" : "gray.700"}>
                        {user?.email || "user@example.com"}
                    </Text>
                </Center>

                <MenuDivider borderColor="gray.700" />


                <VStack spacing={3} align="center">
                    <MenuItem
                        w="95%"
                        justifyContent="center"
                        rounded="md"
                        py={3}
                        bg={colorMode === "dark" ? "gray.800" : "blue.500"}
                        _hover={{ bg: "gray.700", color: "yellow.300" }}
                        transition="all 0.2s"
                        icon={<StarIcon color="yellow.400" />}
                        onClick={() => nav("/favourites")}
                    >
                        Favourites
                    </MenuItem>





                    <MenuItem
                        w="95%"
                        justifyContent="center"
                        rounded="md"
                        py={3}
                        bg={colorMode === "dark" ? "gray.800" : "blue.500"}
                        color={colorMode === "dark" ? "red.400" : "white"}
                        fontWeight="semibold"
                        _hover={{
                            bg: "red.600",
                            color: "white",
                            transform: "translateY(-2px)",
                        }}
                        icon={<SmallCloseIcon />}
                        transition="all 0.2s"
                        onClick={() => {
                            CookieService.remove("jwt");
                            window.location.reload();
                        }}
                    >
                        Logout
                    </MenuItem>
                </VStack>
            </MenuList>
        </Menu>
    );
}

export default memo(ProfileMenu);
