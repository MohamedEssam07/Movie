import { Box, Flex, Grid, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import ReusableGetHook from "../hooks/ReusableGetHook";
import MoviesSkeleton from "../ui/MoviesSkeleton";
import Paginator from "../ui/Paginator";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import MoiveCard from "../components/MoiveCard";
import type { IProduct } from "../Interfaces";

import TvMovie from "../components/TvMovie";
import { motion } from "framer-motion";

import NoData from "../ui/NoData";


interface IProps {

}

const FilterResultPage = ({ }: IProps) => {
    const bgCard = useColorModeValue("gray.50", "gray.800"); // light background
    const borderCard = useColorModeValue("gray.200", "gray.700"); // light border
    const MotionBox = motion(Box);
    const { filterItems } = useSelector((state: RootState) => state.filter)
    console.log("filterItems", filterItems)
    const [page, setPage] = useState(() => {
        // لو في page محفوظ في الجلسة، استخدمه
        const savedPage = sessionStorage.getItem("filterresult");
        return savedPage ? Number(savedPage) : 1;
    });
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
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);
    console.log("filterItems", filterItems)
    //back
    useEffect(() => {
        // لما تتغير الصفحة، احفظها
        sessionStorage.setItem("filterresult", JSON.stringify(page));
    }, [page]);
    const years = ["2025", "2024", "2023", "2022", "2021"]
    const selectedYear = filterItems?.year
    const yearUrl = years.includes(selectedYear) ? (filterItems.type === "movie" ? `&year=${filterItems?.year}` : `&first_air_date_year=${filterItems?.year}`) : ""
    // const genreParam = filterItems.genre?.length ? filterItems.genre[0].id : "";
    const genreParam = filterItems?.genre?.map(g => g.gen.id).join(",") || "";
    const { data, isLoading, isFetching } = ReusableGetHook({
        URL: `${import.meta.env.VITE_SERVER_URL}/discover/${filterItems?.type}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc${yearUrl}&with_genres=${genreParam}&page=${page}&include_adult=false&certification_country=US&certification.lte=PG-13`,
        queryKey: ["movies", page, filterItems?.type, filterItems?.year, genreParam],
        enabled: !!filterItems
    })





    if (isLoading) {
        return <MoviesSkeleton />
    }
    return (
        <>
            {data?.results?.length ?
                (
                    <>
                        <Grid
                            mt={"140px"}
                            bg={bgCard}
                            boxShadow="md"
                            border="1px solid"

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
                            {data?.results.length &&
                                data?.results?.filter((it: IProduct) => it.poster_path).map((item: IProduct, idx: number) => (
                                    item.title ? (
                                        <MotionBox key={item.id}
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: idx * 0.05,
                                                ease: "easeOut",
                                            }}
                                            viewport={{ once: true, amount: 0.2 }}>
                                            <MoiveCard vote_average={item.vote_average} type={"Movie"} key={idx} maxW="lg" movieInfo={item} />

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
                                                viewport={{ once: true, amount: 0.2 }}>
                                                <TvMovie vote_average={item.vote_average} type={"TV"} key={idx} maxW="lg" movieInfo={item} />

                                            </MotionBox>
                                        )
                                ))}
                        </Grid>
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
                    </>
                )
                :
                isLoading ?

                    (
                        <MoviesSkeleton />
                    )
                    :
                    (
                        <NoData />
                    )
            }
        </>
    )
};

export default FilterResultPage;