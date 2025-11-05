import { useEffect, useState } from "react";
import ReusableGetHook from "../hooks/ReusableGetHook";
import MoviesSkeleton from "../ui/MoviesSkeleton";
import Paginator from "../ui/Paginator";
import { Box, Grid, Select, useColorModeValue } from "@chakra-ui/react";
import Filter from "../ui/Filter";
import TvMovie from "../components/TvMovie";
import type { IProduct } from "../Interfaces";
import { motion } from "framer-motion";

interface IProps { }

const Tv = ({ }: IProps) => {
    const MotionBox = motion(Box);
    const [sort, setSort] = useState(() => {
        const savedSort = sessionStorage.getItem("tvsort");
        return savedSort ? savedSort : "popularity.desc";
    });
    const [page, setPage] = useState(() => {
        const savedPage = sessionStorage.getItem("tv");
        return savedPage ? Number(savedPage) : 1;
    });

    const bgCard = useColorModeValue("gray.50", "gray.800"); // light background
    const borderCard = useColorModeValue("gray.200", "gray.700"); // light border

    // Pagination functions
    const onClickPrev = () => {
        setPage((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const onClickNext = () => {
        setPage((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const onClickStart = () => {
        setPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const onClickPage = (item: number) => {
        setPage(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const onClickEnd = (rPage: number) => {
        setPage(Math.min(rPage, 500));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Save page & sort
    useEffect(() => {
        sessionStorage.setItem("tv", JSON.stringify(page));
        sessionStorage.setItem("tvsort", sort);
    }, [page, sort]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    // Sorting
    const { data: sortingData, isLoading: loadingSort, isFetching: fetchingSort } = ReusableGetHook({
        URL: `/discover/tv?sort_by=${sort}&vote_count.gte=200&api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${page}`,
        queryKey: ["moviesorting", page, sort],
    });


    if (loadingSort) {
        return <MoviesSkeleton />
    }
    return (
        <Box mt={{ base: "56px", md: "60px" }} px={{ base: 4, md: 6 }} overflowX="hidden">
            <Box maxW={{ base: "100%", md: "1200px", lg: "1450px" }} mx="auto">
                <Box w={{ base: "100%", md: "100%" }} display="flex" justifyContent="flex-end"><Filter /></Box>
                <Select
                    w={{ base: "100%", sm: "280px" }}
                    maxW="360px"
                    ml={{ base: 0, md: 0 }}
                    mt={{ base: 2, md: 2 }}
                    onChange={(e: any) => {
                        setSort(e.target.value);
                        setPage(1);
                    }}
                    value={sort}
                >
                    <option value="popularity.desc">Popularity (High → Low)</option>
                    <option value="popularity.asc">Popularity (Low → High)</option>
                    <option value="vote_average.desc">(High → Low) Rated</option>
                    <option value="vote_average.asc">(Low → High) Rated</option>
                    <option value="first_air_date.desc">Newest First</option>
                    <option value="first_air_date.asc">Oldest First</option>
                </Select>
            </Box>

            {sortingData?.results?.length ? (
                <>
                    <Grid
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
                        {sortingData?.results
                            .filter((item: IProduct) => item.poster_path)
                            .map((item: IProduct, idx: number) => (
                                <MotionBox
                                    key={item.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" }}
                                    viewport={{ once: true, amount: 0.2 }}
                                >
                                    <TvMovie vote_average={item.vote_average} type="TV" maxW="lg" movieInfo={item} />
                                </MotionBox>
                            ))}
                    </Grid>

                    <Paginator
                        onClickEnd={onClickEnd}
                        onClickStart={onClickStart}
                        onClickPage={onClickPage}
                        onClickPrev={onClickPrev}
                        onClickNext={onClickNext}
                        page={sortingData?.page}
                        total_pages={sortingData?.total_pages}
                        total_results={sortingData?.total_results}
                        isLoading={loadingSort || fetchingSort}
                    />
                </>
            ) : (
                <MoviesSkeleton />
            )}
        </Box>
    );
};

export default Tv;
