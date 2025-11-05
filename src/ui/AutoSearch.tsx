import { memo, useEffect, useState } from "react";
import ReusableGetHook from "../hooks/ReusableGetHook";
import { Box, Button, ButtonGroup, FormControl, Grid, IconButton, Input, InputGroup, InputLeftElement, Text, useColorMode } from "@chakra-ui/react";
import SearchSkeleton from "./SearchSkeleton";
import type { IProduct } from "../Interfaces";
import TvMovie from "../components/TvMovie";
import MovieCard from '../components/MoiveCard'
import { ArrowRightIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import SearchCard from "../components/SearchCard";
import { useGetMovieDetailsQuery } from "../app/services/apiSlice";
import { useLocation, useNavigate } from "react-router";
interface IProps {

}
const AutoSearch = ({ }: IProps) => {
    const nav = useNavigate()
    const { colorMode } = useColorMode()
    const [secondInput, setSecondInput] = useState("")
    const { data, isLoading, refetch } = ReusableGetHook({
        queryKey: ["moviee", secondInput]
        , URL: `/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${secondInput}`
        , enabled: !!secondInput
    })

    const { pathname } = useLocation();

    useEffect(() => {
        setSecondInput("");
    }, [pathname]);
    return (
        <>
            <FormControl as="form"
                mr={"27px"}
                onSubmit={(e) => {
                    e.preventDefault()

                    if (secondInput.trim() !== "") {
                        nav(`/search/${secondInput}`)
                    }
                    setSecondInput("")
                }} maxW={"200px"} ml={"auto"} display={"flex"} flexDirection={"row"} alignItems={"center"} gap={"20px"}
            >
                <InputGroup

                    borderRadius="full"
                    overflow="hidden"
                    boxShadow="md"
                    bg={colorMode === "light" ? "transparent" : "gray.700"}
                    maxW="300px"
                    transition="all 0.3s ease"
                    _hover={{ boxShadow: "0 0 10px rgba(0, 153, 255, 0.3)" }}
                >
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.400" />
                    </InputLeftElement>

                    <Input
                        placeholder="Search ..."
                        name="movename"
                        value={secondInput}
                        onChange={(e) => setSecondInput(e.target.value)}
                        border="none"
                        focusBorderColor="transparent"
                        _focus={{
                            bg: colorMode === "light" ? "gray.200" : "gray.800",
                            color: colorMode === "light" ? "black" : "white",
                            transition: "all .7s ease"

                        }}
                        _placeholder={{ color: "gray.400" }}
                        color="white"
                        pl="40px"
                    />
                </InputGroup>
            </FormControl>
            {secondInput && (
                isLoading ? (
                    <SearchSkeleton />
                ) : (
                    data?.results ?
                        (
                            <Box

                                overflowX={"hidden"}
                                position="absolute"
                                top={{ base: "120px", md: "60px" }}
                                w={{ base: "", md: "400px" }}
                                borderRadius="md"
                                zIndex={999}
                                maxH="500px"
                                overflowY="auto"
                                boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
                                bg="rgba(255, 255, 255, 0.08)"
                                border="1px solid rgba(255, 255, 255, 0.18)"

                                p={3}
                            >
                                <ButtonGroup w="full" mb="10px">
                                    <IconButton
                                        aria-label="Clear input"
                                        icon={<CloseIcon />}
                                        size="sm"
                                        ml="auto"
                                        onClick={() => setSecondInput("")}
                                        bg="gray.600"                  // خلفية غامقة
                                        color="white"                  // أيقونة بيضاء
                                        _hover={{
                                            bg: "gray.700",
                                            transform: "scale(1.1)",     // subtle تكبير عند hover
                                        }}
                                        borderRadius="full"            // مدورة بالكامل
                                        boxShadow="md"                 // subtle shadow
                                    />
                                </ButtonGroup>
                                <Box display="flex" flexDirection="column" gap="10px">
                                    {data?.results?.length
                                        ? data?.results.slice(0, 5).map((item: IProduct, idx: number) => (
                                            <SearchCard
                                                vote_average={item.vote_average}
                                                type={item.media_type === "tv" ? "tv" : "movie"}
                                                onClick={() => {
                                                    { item.media_type === "movie" ? nav(`/movies/${item?.id}`) : nav(`/tv/${item?.id}`) }
                                                    setSecondInput("");
                                                }
                                                }
                                                key={idx}
                                                maxW="100%"
                                                movieInfo={item}
                                            />
                                        ))
                                        : null}
                                </Box>
                                <Button
                                    w={"full"} mt={"5px"} variant={"solid"} bg={colorMode === "dark" ? "blue.700" : "#707981ff"}
                                    rightIcon={<ArrowRightIcon />}
                                    color={"white"}
                                    onClick={() => nav(`/search/${secondInput}`)}>See All Results</Button>
                            </Box>
                        )
                        :
                        <Text>NO Dataa</Text>
                )
            )}
        </>
    );
};

export default memo(AutoSearch);