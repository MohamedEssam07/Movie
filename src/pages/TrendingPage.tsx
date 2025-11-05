// @ts-nocheck
import { Box, Grid, Select, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from "@chakra-ui/react";
import MoiveCard from "../components/MoiveCard";
import ReusableGetHook from "../hooks/ReusableGetHook";
import { useEffect, useState } from "react";
import Paginator from "../ui/Paginator";
import TvMovie from "../components/TvMovie";
import type { IProduct } from "../Interfaces";
import { motion } from "framer-motion";
import MoviesSkeleton from "../ui/MoviesSkeleton";

interface IProps {

}
const TrendingPage = ({ }: IProps) => {
    const bgCard = useColorModeValue("gray.50", "gray.800"); // light background
    const borderCard = useColorModeValue("gray.200", "gray.700"); // light border
    const MotionBox = motion(Box);
    const [moviePage, setMoviePage] = useState(() => {
        const saved = sessionStorage.getItem("trending_movie_page");
        return saved ? Number(saved) : 1;
    });

    const [tvPage, setTvPage] = useState(() => {
        const saved = sessionStorage.getItem("trending_tv_page");
        return saved ? Number(saved) : 1;
    });
    const [ind, setInd] = useState(() => {
        const savedInd = sessionStorage.getItem("trendingTab");
        return savedInd !== null ? Number(savedInd) : 0; // 0 = movies tab
    });
    const { isLoading, data, isFetching } = ReusableGetHook({
        URL: `${import.meta.env.VITE_SERVER_URL}/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${moviePage}&include_adult=false&certification_country=US&certification.lte=PG-13`,
        queryKey: ["trendingmovie", moviePage]
    })
    const { isLoading: isLoadingg, data: tvData, isFetching: isFetchingg, isSuccess } = ReusableGetHook({
        URL: `${import.meta.env.VITE_SERVER_URL}/trending/tv/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${tvPage}&include_adult=false&certification_country=US&certification.lte=PG-13`,
        queryKey: ["trendingtv", tvPage]
    })
    console.log(isSuccess)

    //functios
    const onClickPrevMovie = () => {
        setMoviePage(prev => prev - 1)

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const onClickNextMovie = () => {
        setMoviePage(prev => prev + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
    const onClickStartMovie = () => {
        setMoviePage(prev => prev = 1)
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
    const onClickPageMovie = (item: number) => {
        setMoviePage(item)
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
    const onClickEndMovie = (rPage: number) => {
        setMoviePage(rPage)
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }



    //functios
    const onClickPrevTv = () => {
        setTvPage(prev => prev - 1)
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
    const onClickNextTv = () => {
        setTvPage(prev => prev + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
    const onClickStartTv = () => {
        setTvPage(prev => prev = 1)
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
    const onClickPageTv = (item: number) => {
        setTvPage(item)
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
    const onClickEndTv = (rPage: number) => {
        setTvPage(rPage)
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }


    //back
    useEffect(() => {
        sessionStorage.setItem("trending_movie_page", String(moviePage));
    }, [moviePage]);

    useEffect(() => {
        sessionStorage.setItem("trending_tv_page", String(tvPage));
    }, [tvPage]);


    useEffect(() => {
        sessionStorage.setItem("trendingTab", String(ind));
    }, [ind]);

    if (isLoading || isLoadingg) {
        return <MoviesSkeleton />
    }
    return (
        <Box mt={"80px"}>

            <Tabs index={ind} onChange={e => {
                setInd(e)
                if (e === 0) setMoviePage(1);
                if (e === 1) setTvPage(1);

            }} isFitted variant={"line"}>
                <TabList >
                    <Tab _selected={{ borderBottom: "1px solid blue" }}>Movies</Tab>
                    <Tab _selected={{ borderBottom: "1px solid blue" }}>Tv</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
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
                                    <MoiveCard type="movie" vote_average={movie.vote_average} key={movie.id} movieInfo={movie} maxW="lg" />
                                </MotionBox>
                            ))}
                        </Grid>
                        {data?.results.length ?
                            <Paginator
                                onClickEnd={onClickEndMovie}
                                onClickStart={onClickStartMovie}
                                onClickPage={onClickPageMovie}
                                onClickPrev={onClickPrevMovie} onClickNext={onClickNextMovie}
                                page={data?.page}
                                total_pages={data?.total_pages}
                                total_results={data?.total_results}
                                isLoading={isLoading || isFetching}
                            />
                            :
                            null
                        }
                    </TabPanel>

                    <TabPanel >
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
                            {tvData?.results.length && tvData?.results?.map((tv: IProduct, idx: string) => (
                                <TvMovie type="tv" vote_average={tv.vote_average} key={tv.id} movieInfo={tv} maxW="lg" />
                            ))}

                        </Grid>
                        {tvData?.results.length ?
                            <Paginator
                                onClickEnd={onClickEndTv}
                                onClickStart={onClickStartTv}
                                onClickPage={onClickPageTv}
                                onClickPrev={onClickPrevTv} onClickNext={onClickNextTv}
                                page={tvData?.page}
                                total_pages={tvData?.total_pages}
                                total_results={tvData?.total_results}
                                isLoading={isLoadingg || isFetchingg}
                            />
                            :
                            null
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>



        </Box>
    );
};

export default TrendingPage;