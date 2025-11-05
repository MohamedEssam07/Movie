import { useEffect, useState } from "react";
import ReusableGetHook from "../hooks/ReusableGetHook";
import Paginator from "../ui/Paginator";
import { Box, Button, Grid, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import MoiveCard from "../components/MoiveCard";

import { useParams } from "react-router";
import SearchSkeleton from "../ui/SearchSkeleton";
import MoviesSkeleton from "../ui/MoviesSkeleton";
import TvMovie from "../components/TvMovie";
import { motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";
import type { IProduct } from "../Interfaces";
import ScrollToTopButton from "../ui/ScrollToUpButton";
interface IProps {

}
const GenreMovies = ({ }: IProps) => {
    const MotionBox = motion.div;

    const [moviePage, setMoviePage] = useState(() => {
        const saved = sessionStorage.getItem("genre_movie_page");
        return saved ? Number(saved) : 1;
    });

    const [tvPage, setTvPage] = useState(() => {
        const saved = sessionStorage.getItem("genre_tv_page");
        return saved ? Number(saved) : 1;
    });
    const { id } = useParams()
    const [ind, setInd] = useState(() => {
        const savedInd = sessionStorage.getItem("genreTab");
        return savedInd !== null ? Number(savedInd) : 0; // 0 = movies tab
    });


    //3lshan lma t8yr el category y3ny mn action ly thrilled msln trg3 el page 1


    const genreId = Number(id);

    if (!genreId) {
        return <p>Invalid genre</p>;
    }

    const { data: movieData, isLoading, isFetching } = ReusableGetHook({ URL: `${import.meta.env.VITE_SERVER_URL}/discover/movie?with_genres=${id}&api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${moviePage}&include_adult=false&certification_country=US&certification.lte=PG-13`, queryKey: ["genre", moviePage, genreId] })
    const { data: tvData, isLoading: isLoadingg, isFetching: isFetchingg } = ReusableGetHook({ URL: `${import.meta.env.VITE_SERVER_URL}/discover/tv?with_genres=${id}&api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${tvPage}&include_adult=false&certification_country=US&certification.lte=PG-13`, queryKey: ["genree", tvPage, genreId] })
    console.log("tv", tvData?.results)
    console.log("movie", movieData?.results)
    //3lshan my3rds el 2 tabs lw feeh tab mfhash data

    //pagination

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
        const safePage = Math.min(rPage, 500);
        setMoviePage(safePage)
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
        const safePage = Math.min(rPage, 500);
        setTvPage(safePage)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    useEffect(() => {
        sessionStorage.setItem("genre_movie_page", String(moviePage));
    }, [moviePage]);

    useEffect(() => {
        sessionStorage.setItem("genre_tv_page", String(tvPage));
    }, [tvPage]);

    useEffect(() => {
        sessionStorage.setItem("genreTab", String(ind));
    }, [ind]);


    // Reset when genre changes -------------------
    useEffect(() => {
        setMoviePage(1);
        setTvPage(1);

        sessionStorage.setItem("genre_movie_page", "1");
        sessionStorage.setItem("genre_tv_page", "1");
    }, [genreId]);   // IMPORTANT

    useEffect(() => {
        if (movieData?.results.length > 0 && tvData?.results.length === 0) {
            setInd(0); // Movie tab
        } else if (tvData?.results.length > 0 && movieData?.results.length === 0) {
            setInd(1); // TV tab
        }
    }, [movieData, tvData]);
    if (isLoading || isLoadingg) {
        return <MoviesSkeleton />
    }


    return (
        <Box mt={"80px"}>

            <Tabs
                isFitted
                index={ind}
                onChange={(e) => {
                    // لما المستخدم فعلاً يغير التاب بنفسه
                    setInd(e);

                    const savedInd = Number(sessionStorage.getItem("genreTab"));

                    // لو التاب فعلاً اتغير مش نفس القديم (يعني مش مجرد mount)
                    if (e !== savedInd) {
                        if (e === 0) setMoviePage(1);
                        if (e === 1) setTvPage(1);
                    }

                    sessionStorage.setItem("genreTab", String(e));
                }}
                variant="line"
            >
                <TabList>

                    {movieData?.results.length > 0 && tvData?.results.length > 0 ?
                        (
                            <>
                                <Tab>Movies</Tab>
                                <Tab>Tv</Tab>
                            </>

                        )
                        :
                        (
                            movieData?.results.length > 0 && tvData?.results.length === 0 ?
                                <Tab display={"none"}>Movies</Tab>
                                :
                                <Tab display={"none"}>Tv</Tab>
                        )
                    }


                </TabList>
                <TabPanels>
                    {/* Movie Panel */}
                    <TabPanel>
                        {movieData?.results.length ? (
                            <>
                                {/* cards */}
                                <Grid

                                    w="100%"
                                    maxW={{ base: "400px", md: "1450px" }}
                                    mx="auto"
                                    p={50}
                                    borderRadius="2xl"
                                    bg="rgba(19, 19, 19, 0.08)"
                                    boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                                    border="1px solid rgba(255, 255, 255, 0.18)"
                                    mb={10}
                                    h="fit-content" gap={9}
                                    margin={{ md: 30 }}
                                    templateColumns="repeat(auto-fill, minmax(300px, 1fr))"

                                >
                                    {movieData?.results.filter((item: IProduct) => item.poster_path).map((movie: IProduct, idx: number) => (
                                        <MotionBox
                                            key={movie.id}
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: idx * 0.05,
                                                ease: "easeOut",
                                            }}
                                            viewport={{ once: true, amount: 0.2 }}
                                        >

                                            <MoiveCard
                                                maxW="lg"
                                                vote_average={movie.vote_average}
                                                movieInfo={movie}
                                                type={"movie"}
                                            />
                                        </MotionBox>
                                    ))}
                                </Grid>

                                {/* paginator */}
                                {movieData?.results.length ? (
                                    <Paginator
                                        onClickEnd={onClickEndMovie}
                                        onClickStart={onClickStartMovie}
                                        onClickPage={onClickPageMovie}
                                        onClickPrev={onClickPrevMovie} onClickNext={onClickNextMovie}
                                        page={movieData?.page}
                                        total_pages={movieData?.total_pages}
                                        total_results={movieData?.total_results}
                                        isLoading={isLoading || isFetching}
                                    />
                                ) : null}
                            </>
                        ) : null}
                    </TabPanel>
                    {/* Tv Panel */}
                    <TabPanel>
                        {tvData?.results.length ? (
                            <>

                                <Grid

                                    w="100%"
                                    maxW={{ base: "400px", md: "1450px" }}
                                    mx="auto"
                                    p={50}
                                    borderRadius="2xl"
                                    bg="rgba(19, 19, 19, 0.08)"
                                    boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                                    border="1px solid rgba(255, 255, 255, 0.18)"
                                    mb={10}
                                    h="fit-content" gap={9}
                                    margin={{ md: 30 }}
                                    templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                                >
                                    {tvData?.results.filter((item: IProduct) => item.poster_path && item.id !== 71932).map((movie: IProduct, idx: number) => (
                                        <MotionBox key={movie.id}
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: idx * 0.05,
                                                ease: "easeOut",
                                            }}
                                            viewport={{ once: true, amount: 0.2 }}>
                                            <TvMovie vote_average={movie.vote_average} type={"TV"} key={movie.id} movieInfo={movie} maxW="lg" />
                                        </MotionBox>
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
                                    "null"
                                }
                            </>

                        )
                            :
                            null
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default GenreMovies;