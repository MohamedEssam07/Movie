import { Box, Grid, useColorModeValue } from "@chakra-ui/react";
import MoiveCard from "../components/MoiveCard";
import ReusableGetHook from "../hooks/ReusableGetHook";

import { useEffect, useState } from "react";
import Paginator from "../ui/Paginator";
import type { IProduct } from "../Interfaces";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import MoviesSkeleton from "../ui/MoviesSkeleton";

interface IProps {

}
const TopImdbPage = ({ }: IProps) => {
    const bgCard = useColorModeValue("gray.300", "gray.800"); // light background
    const borderCard = useColorModeValue("gray.200", "gray.700"); // light border
    const { currMoviePage } = useSelector((state: RootState) => state.currPage)
    const MotionBox = motion(Box);
    const [page, setPage] = useState(() => {
        // لو في page محفوظ في الجلسة، استخدمه
        const savedPage = sessionStorage.getItem("top_page");
        return savedPage ? Number(savedPage) : 1;
    });
    const { isLoading, data, isFetching } = ReusableGetHook({
        URL: `${import.meta.env.VITE_SERVER_URL}/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${page}&include_adult=false&certification_country=US&certification.lte=PG-13`,
        queryKey: ["top", page]
    })

    //functios
    const onClickPrev = () => {
        setPage(prev => prev - 1)

    }
    const onClickNext = () => {
        setPage(prev => prev + 1)

    }
    const onClickk = () => {
        setPage(prev => prev)

    }
    const onClickStart = () => {
        setPage(prev => prev = 1)

    }
    const onClickPage = (item: number) => {
        setPage(item)

    }
    const onClickEnd = (rPage: number) => {
        const safePage = Math.min(rPage, 500);
        setPage(safePage)

    }
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    useEffect(() => {
        // لما تتغير الصفحة، احفظها
        sessionStorage.setItem("top_page", JSON.stringify(page));
    }, [page]);


    if (isLoading) {
        return <MoviesSkeleton />
    }
    return (
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
                {data?.results.length && data?.results?.filter((item: IProduct) => item.poster_path).map((movie: IProduct, idx: number) => (
                    <MotionBox key={movie.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: idx * 0.05,
                            ease: "easeOut",
                        }}
                        viewport={{ once: true, amount: 0.2 }}>
                        <MoiveCard type={"movie"} vote_average={movie.vote_average} key={idx} movieInfo={movie} maxW="lg" />
                    </MotionBox>
                ))}
            </Grid>
            {data?.results.length ?
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
    );
};

export default TopImdbPage;