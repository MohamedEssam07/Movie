
import { Box, IconButton, InputGroup, Image, Input, InputRightElement, VStack, Button, FormControl } from "@chakra-ui/react";

import bglogo from "../assets/ana-de-armas-from-1920x1080-21932.jpg"
import FancyText from "../ui/FancyText";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router";
import IntroNavbar from "../ui/IntroNavbar";
import { useState, type FormEvent } from "react";
import { useAppDispatch } from "../app/store";
import { saveSearchInput } from "../app/features/searchSlice";
import bLogo from "../assets/BLogo.svg"
interface IProps {

}
const IntroPage = ({ }: IProps) => {
    const nav = useNavigate()
    const [input, setInput] = useState("")
    const dispatch = useAppDispatch()

    const onSubmitHandler = (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (!input.trim()) return;
        dispatch(saveSearchInput(input))
        nav(`/search/${input}`)
    }



    return (

        <Box
            minH="100vh"
            bgImage={bglogo}
            bgRepeat="no-repeat"
            bgSize="cover"
            bgPosition="center"
            position="relative"
        >
            {/* overlay for background only */}
            <Box
                position="absolute"
                inset={0}
                bg="rgba(11, 4, 24, 0.7)"
                zIndex="0"
            />

            {/* content above overlay */}
            <Box position="relative" zIndex="1">
                <IntroNavbar />
                <VStack spacing="50px" mt="100px">
                    <Box ml="20px">
                        <Image
                            src={bLogo}
                            alt="Logo"
                            h="150px"
                            w="200px"
                            borderRadius="3xl"
                        />
                    </Box>

                    <FancyText title="Kino" />

                    <FormControl as="form" onSubmit={onSubmitHandler}>
                        <InputGroup
                            mx="auto"
                            w={{ base: "90%", md: "955px" }}
                            h="55px"
                            bg="rgba(255, 255, 255, 0.1)"
                            borderRadius="full"
                            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
                            backdropFilter="blur(8px)"
                            border="1px solid rgba(255, 255, 255, 0.2)"
                        >
                            <Input
                                variant="unstyled"
                                placeholder="Search for a movie..."
                                name="movename"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                px="25px"
                                h="55px"
                                color="white"
                                fontSize="md"
                                _placeholder={{ color: "gray.300" }}
                            />
                            <InputRightElement w="100px" h="100%">
                                <IconButton
                                    type="submit"
                                    aria-label="Search"
                                    icon={<CiSearch size={24} />}
                                    size="md"
                                    w="full"
                                    h="full"
                                    bgGradient="linear(to-r, blue.400, blue.600)"
                                    color="white"
                                    _hover={{
                                        bgGradient: "linear(to-r, blue.500, blue.700)",
                                        transform: "scale(1.05)",
                                        boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.6)",
                                    }}
                                    borderLeft="1px solid rgba(255,255,255,0.1)"
                                    colorScheme="blue"

                                    borderRadius="full"
                                />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <Button
                        w="200px"
                        py="30px"
                        variant="solid"
                        bgGradient="linear(to-r, blue.400, blue.600)"
                        transition="all 0.5s ease"
                        _hover={{
                            bgGradient: "linear(to-r, blue.500, blue.700)",
                            transform: "scale(1.05)",
                            boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)",
                        }}
                        color="white"
                        borderRadius="full"
                        size="lg"
                        onClick={() => nav("/home")}
                    >
                        View Full Site
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default IntroPage;