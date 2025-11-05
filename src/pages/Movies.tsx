
import MoiveCard from "../components/MoiveCard";

import { Box, Grid, Select, useColorModeValue } from "@chakra-ui/react";
import Filter from "../ui/Filter";
import Paginator from "../ui/Paginator";
import { useEffect, useState, Fragment } from "react";

import ReusableGetHook from "../hooks/ReusableGetHook";
import MoviesSkeleton from "../ui/MoviesSkeleton";
import type { IProduct } from "../Interfaces";
import { motion } from "framer-motion";


interface IProps {

}
const Movies = ({ }: IProps) => {
    const MotionBox = motion(Box);
    // const [sort, setSort] = useState<string>("popularity.desc")
    const [sort, setSort] = useState(() => {
        const savedSort = sessionStorage.getItem("moviesort");
        return savedSort ? savedSort : "popularity.desc";
    });
    const [page, setPage] = useState(() => {
        const savedPage = sessionStorage.getItem("movie");
        return savedPage ? Number(savedPage) : 1;
    });
    const bgCard = useColorModeValue("gray.50", "gray.800"); // light background
    const borderCard = useColorModeValue("gray.200", "gray.700"); // light border

    //query
    //Sorting 
    const { data: sortingData, isLoading: loadingSort, isFetching: fetchingSort } = ReusableGetHook({
        URL: `/discover/movie?sort_by=${sort}&vote_count.gte=200&api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${page}&certification_country=US&certification.lte=PG-13`,
        queryKey: ["moviesorting", page, sort]
    })
    //functios
    const onClickPrev = () => {
        setPage(prev => prev - 1)
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
    const onClickNext = () => {
        setPage(prev => prev + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
    const onClickStart = () => {
        setPage(page + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const onClickPage = (item: number) => {
        setPage(item)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const onClickEnd = (rPage: number) => {
        const safePage = Math.min(rPage, 500); // 🔥 نمنع التصفح بعد صفحة 500
        setPage(safePage)
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }

    //back
    useEffect(() => {
        // لما تتغير الصفحة، احفظها
        sessionStorage.setItem("movie", JSON.stringify(page));
        sessionStorage.setItem("moviesort", (sort));

    }, [page, sort]);

    if (loadingSort) {
        return <MoviesSkeleton />
    }
    return (
        <Box mt={{ base: "56px", md: "60px" }} px={{ base: 4, md: 6 }} overflowX="hidden">

            <Box maxW={{ base: "100%", md: "1200px", lg: "1450px" }} mx="auto">
            <Box w={{ base: "100%", md: "100%" }} display="flex" justifyContent="flex-end"><Filter /></Box>
            <Select w={{ base: "100%", sm: "280px" }} maxW="360px" ml={{ base: 0, md: 0 }} mt={{ base: 2, md: 2 }} onChange={(e: any) => {
                setSort(e.target.value)
                setPage(1)
            }}>
                <option value="popularity.desc" selected={sort === "popularity.desc"}>Popularity (High → Low)</option>
                <option value="popularity.asc" selected={sort === "popularity.asc"}>Popularity (Low → High)</option>
                <option value="vote_average.desc" selected={sort === "vote_average.desc"}>(High → Low) Rated</option>
                <option value="vote_average.asc" selected={sort === "vote_average.asc"}>(Low → High) Rated</option>
                <option value="revenue.desc" selected={sort === "revenue.desc"}>Highest Profit</option>

            </Select>
            </Box>
         
            {sortingData?.results?.length ?
                (
                    <Fragment>
                        <Grid
                            bg={bgCard}
                            boxShadow="md"
                            border="1px solid"
                            borderColor={borderCard}
                            maxW={{ base: "100%", md: "1200px", lg: "1450px" }}
                            w="100%"
                            mx="auto"
                            p={{ base: 4, md: 6, lg: 8 }}
                            borderRadius="2xl"
                            mb={10}
                            h="fit-content"
                            gap={{ base: 4, md: 6 }}
                            templateColumns={{ base: "repeat(auto-fill, minmax(160px, 1fr))", md: "repeat(auto-fill, minmax(220px, 1fr))", lg: "repeat(auto-fill, minmax(300px, 1fr))" }}
                        >

                            {sortingData?.results.length && sortingData?.results.filter((item: IProduct) => item.poster_path).map((item: IProduct, idx: number) => (
                                <MotionBox key={sortingData.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: idx * 0.05,
                                        ease: "easeOut",
                                    }}
                                    viewport={{ once: true, amount: 0.2 }}>
                                    <MoiveCard vote_average={item.vote_average} type="movie" key={idx} maxW="lg" movieInfo={item} />
                                </MotionBox>
                            ))}

                        </Grid>
                        {sortingData?.results.length ?
                            <Paginator
                                onClickEnd={onClickEnd}
                                onClickStart={onClickStart}
                                onClickPage={onClickPage}
                                onClickPrev={onClickPrev} onClickNext={onClickNext}
                                page={sortingData?.page}
                                total_pages={sortingData?.total_pages}
                                total_results={sortingData?.total_results}
                                isLoading={loadingSort || fetchingSort}
                            />
                            :
                            null
                        }
                    </Fragment>
                )
                :
                <MoviesSkeleton />
            }

        </Box>
    );
};

export default Movies;