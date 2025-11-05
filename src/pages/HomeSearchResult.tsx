import { useParams } from "react-router";
import ReusableGetHook from "../hooks/ReusableGetHook";
import { useEffect, useState } from "react";
import { Box, Grid, Text, useColorModeValue } from "@chakra-ui/react";
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
        setPage(prev => prev = 1)
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
                        <Grid
                            mt={"140px"}
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