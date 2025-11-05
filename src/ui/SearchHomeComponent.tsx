// SearchBar.tsx
import { Input, Button, FormControl, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getInput } from "../app/features/inputSearchSlice";
import { useAppDispatch } from "../app/store";

export default function SearchBar() {
    const [input, setInput] = useState("");
    const dispatch = useAppDispatch()
    const nav = useNavigate()


    return (
        <>
            <Box >


                <FormControl display={"flex"} flexDir={"column"} gap={{ base: "20px", md: "32px" }}  >
                    <Input


                        value={input}
                        onChange={(e) => setInput(e.target.value)}

                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); // تمنع السلوك الافتراضي
                                if (!input.trim()) return;
                                dispatch(getInput(input));
                                nav(`/search/${input}`);
                            }
                        }}


                        mx={"auto"}
                        w={{ base: "92vw", sm: "90vw", md: "720px", lg: "960px" }}
                        maxW={{ base: "92vw", md: "960px" }}
                        placeholder="Search for movies or TV shows..."
                        name='movename'
                        bg="rgba(255,255,255,0.05)"
                        color="white"
                        border="1px solid"
                        borderColor="gray.600"
                        _placeholder={{ color: "gray.400" }}
                        _focus={{ borderColor: "blue.400", boxShadow: "0 0 8px rgba(66,153,225,0.6)", transform: "scale(1.01)", transition: "all 0.2s ease-in-out" }}
                        borderRadius="full"
                        py={{ base: 4, md: 6 }}
                        pl={6}
                        pr={4}
                        fontSize={{ base: "md", md: "lg" }}
                        transition="all 0.2s ease-in-out"
                    />

                    <Button

                        variant="solid"
                        bgGradient="linear(to-r, blue.500, blue.700)"
                        boxShadow="0px 0px 20px rgba(59, 130, 246, 0.6)"
                        transition="all 0.5s ease"
                        _hover={{
                            bgGradient: "linear(to-r, blue.500, blue.700)",
                            transform: "scale(1.05)",
                            boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)"
                        }}
                        color="white"
                        borderRadius="full"
                        size={{ base: "md", md: "lg" }}
                        mx={"auto"}
                        w={{ base: "60vw", sm: "220px" }}
                        onClick={() => {
                            if (!input.trim()) return;
                            dispatch(getInput(input))
                            nav(`/search/${input}`)
                        }
                        }>Search</Button>

                </FormControl>
            </Box>
        </>
    );
}
