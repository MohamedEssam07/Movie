import { useParams } from "react-router";
import ReusableGetHook from "../hooks/ReusableGetHook";
import { useEffect, useState } from "react";
import { Box, Flex, Grid, Text, useColorModeValue, HStack, Icon } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import TvMovie from "../components/TvMovie";
import type { IProduct } from "../Interfaces";
import MovieCard from '../components/MoiveCard'
import Paginator from "../ui/Paginator";

import MoviesSkeleton from "../ui/MoviesSkeleton";
import { motion } from "framer-motion";
interface IProps {

}
const HomeSearchResult = ({ }: IProps) => {
    const bgCard = useColorModeValue("gray.50", "gray.800"); // light background
    const borderCard = useColorModeValue("gray.200", "gray.700"); // light border

    const { input } = useParams()
    const MotionBox = motion(Box);
    if (!input) {
        return
    }
    const [page, setPage] = useState(() => {
        const savedPage = sessionStorage.getItem("searchResult");
        return savedPage ? Number(savedPage) : 1;
    });
    const { data, isLoading, isError, isFetching } = ReusableGetHook({
        URL: `/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${input}&page=${page}&include_adult=false&certification_country=US&certification.lte=PG-13`,
        queryKey: ["homeSearch", input, page],
        enabled: !!input,
    });
    console.log("input:", input)


    //functios
    const onClickPrev = () => {
        setPage(prev => prev - 1)
    }
    const onClickNext = () => {
        setPage(prev => prev + 1)
    }
    const onClickStart = () => {
        setPage(page + 1);
    }
    const onClickPage = (item: number) => {
        setPage(item)
    }
    const onClickEnd = (rPage: number) => {
        setPage(rPage)
    }

    if (!data?.results?.length && !isLoading && isError) return <Text fontSize={"5xl"} textAlign={"center"}>SEARCH RESULTS : {input}</Text>

    //back
    useEffect(() => {
        // لما تتغير الصفحة، احفظها
        sessionStorage.setItem("searchResult", JSON.stringify(page));
    }, [page]);

    if (isLoading) {
        return <MoviesSkeleton />
    }
    return (
        <>
            {isLoading ?
                (<MoviesSkeleton />)
                :
                (
                    <>
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            mt="140px"
                            mb={8}
                            px={4}
                        >
                            <HStack
                                spacing={3}
                                mb={2}
                                bg={useColorModeValue("blue.50", "blue.900")}
                                px={6}
                                py={4}
                                borderRadius="xl"
                                boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
                                border="1px solid"
                                borderColor={useColorModeValue("blue.200", "blue.700")}
                            >
                                <Icon as={SearchIcon} boxSize={6} color={useColorModeValue("blue.500", "blue.300")} />
                                <Text
                                    fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                                    fontWeight="semibold"
                                    color={useColorModeValue("gray.700", "gray.200")}
                                >
                                    Search Results for:
                                </Text>
                                <Text
                                    fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                                    fontWeight="bold"
                                    bgGradient="linear(to-r, blue.400, blue.600)"
                                    bgClip="text"
                                    color="transparent"
                                >
                                    "{input}"
                                </Text>
                            </HStack>
                            {data?.total_results && (
                                <Text
                                    fontSize="sm"
                                    color={useColorModeValue("gray.600", "gray.400")}
                                    mt={2}
                                >
                                    Found {data.total_results} result{data.total_results !== 1 ? 's' : ''}
                                </Text>
                            )}
                        </Flex>
                        <Grid
                            mt={8}
                            bg={bgCard}

                            border="1px solid"
                            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                            borderColor={borderCard}
                            maxW={{ base: "400px", md: "1450px" }}
                            w="100%"
                            mx="auto"
                            p={6}
                            borderRadius="2xl"
                            mb={10}
                            h="fit-content"
                            gap={6}
                            templateColumns={{ base: "repeat(auto-fit, minmax(200px, 1fr))", md: "repeat(auto-fit, minmax(300px, 1fr))" }}
                        >
                            {data?.results?.filter((it: IProduct) => it.poster_path).map((item: IProduct, idx: number) => (
                                item.media_type === "tv" ?
                                    (
                                        <MotionBox key={item.id}
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: idx * 0.05,
                                                ease: "easeOut",
                                            }}
                                            viewport={{ once: true, amount: 0.2 }}

                                        >
                                            <TvMovie vote_average={item.vote_average} type={"tv"} key={item.id} maxW="md" movieInfo={item} />
                                        </MotionBox>
                                    )
                                    :
                                    (
                                        <MotionBox key={item.id}
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: idx * 0.05,
                                                ease: "easeOut",
                                            }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            mx={"auto"}
                                            w={"full"}
                                        >
                                            <MovieCard vote_average={item.vote_average} type={"movie"} key={item.id} maxW="md" movieInfo={item} />
                                        </MotionBox>
                                    )
                            ))}
                        </Grid>

                        {data?.results?.length ?
                            <Paginator
                                onClickEnd={onClickEnd}
                                onClickStart={onClickStart}
                                onClickPage={onClickPage}
                                onClickPrev={onClickPrev} onClickNext={onClickNext}
                                page={data?.page}
                                total_pages={data?.total_pages}
                                total_results={data?.total_results}
                                isLoading={isLoading || isFetching}
                            />
                            :
                            null
                        }

                    </>
                )
            }
        </>
    );
};

export default HomeSearchResult;