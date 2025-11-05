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


                <FormControl display={"flex"} flexDir={"column"} gap={"50px"}  >
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



                        mx={"auto"} w={{ base: "430px", md: "1200px" }} placeholder="Search for movies or TV shows..." name='movename' bg="rgba(255,255,255,0.05)" color="white" border="1px solid" borderColor="gray.600" _placeholder={{ color: "gray.400" }} _focus={{ borderColor: "blue.400", boxShadow: "0 0 8px rgba(66,153,225,0.6)", transform: "scale(1.02)", transition: "all 0.2s ease-in-out", }} borderRadius="full" py={6} pl={10} pr={4} fontSize="lg" transition="all 0.2s ease-in-out"
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
                        size="lg"
                        mx={"auto"} w={"250px"} onClick={() => {
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
