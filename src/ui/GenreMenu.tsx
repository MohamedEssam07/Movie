import {
    Box,

    Menu,
    MenuButton,
    MenuList,
    SimpleGrid,
    Text,
    useBreakpointValue,
    IconButton,

    useColorMode,
    Icon,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { memo, useState } from "react";
import { NavLink } from "react-router-dom";

import { Tags } from "lucide-react"

const genres = [

    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 99, name: "Biography" },
    { id: 14, name: "Fantasy" },
    { id: 27, name: "Horror" },
    { id: 10762, name: "Kids" },
    { id: 10402, name: "Music" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 878, name: "Science Fiction" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" },
];

const GenreMenu = () => {
    const { colorMode } = useColorMode()
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });


    return (
        <Menu isOpen={isOpen} autoSelect={false}>
            {isMobile ? (
                <MenuButton
                    as={IconButton}
                    icon={<Icon as={Tags} boxSize={5} />}
                    aria-label="Genres"
                    onClick={() => setIsOpen(!isOpen)}
                    variant="ghost"
                    bg="gray.700"
                    _hover={{
                        bg: "gray.600",
                        transform: "scale(1.06)",
                    }}
                    _active={{
                        bg: "gray.500",
                    }}
                    borderRadius="full"
                    p={2}
                    boxShadow="md"
                />
            ) : (
                <MenuButton
                    as={Box} // Box بدل Link لتجنب div داخل p
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    cursor="pointer"
                    display="flex"
                    alignItems="center"
                    gap={1}



                >
                    <Text as="span" mr={"5px"}>GENRE</Text>
                    <ChevronDownIcon />
                </MenuButton>
            )}

            <MenuList
                mt="-2"
                onMouseEnter={() => !isMobile && setIsOpen(true)}
                onMouseLeave={() => !isMobile && setIsOpen(false)}
                onClick={() => setIsOpen(false)}
                p={4}
                minW="600px"
                bg={colorMode === "dark" ? "rgba(20, 20, 30, 0.65)" : "rgba(255, 255, 255, 0.6)"}
                backdropFilter={colorMode === "dark" ? "blur(14px) saturate(160%)" : "blur(14px) saturate(160%)"}
                border={colorMode === "dark" ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(200, 200, 200, 0.4)"}
                boxShadow={colorMode === "dark" ? "0 6px 25px rgba(0,0,0,0.45)" : "0 6px 25px rgba(0, 0, 0, 0.15)"}
                borderRadius="xl"
            >

                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={7}>
                    {genres.map((genre) => (
                        <NavLink key={genre.id} to={`/genre/${genre.id}`}>
                            <Box
                                as="span" // مهم: متخليش Text أو div يحول ل p
                                cursor="pointer"
                                color={colorMode === "dark" ? "blue.500" : "blue.900"}
                                _hover={{ color: "blue.500" }}
                                display="block"
                                p={1}
                            >
                                {genre.name}
                            </Box>
                        </NavLink>
                    ))}
                </SimpleGrid>
            </MenuList>
        </Menu >
    );
}
export default memo(GenreMenu);