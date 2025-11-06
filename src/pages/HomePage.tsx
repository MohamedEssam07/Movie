
// @ts-nocheck

import { Box, Button, Flex, FormControl, FormLabel, Grid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorMode } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Paginator from '../ui/Paginator';
import MovieCard from '../components/MoiveCard'
import ReusableGetHook from '../hooks/ReusableGetHook';
import MoviesSkeleton from '../ui/MoviesSkeleton';

import TvMovie from '../components/TvMovie';

import type { IProduct } from "../Interfaces";
import { useNavigate } from 'react-router';
import { ArrowForwardIcon } from '@chakra-ui/icons';


import { motion } from "framer-motion";
import bgVideo from "../assets/3134589-Uhd 3840 2160 24Fps 2.mp4"

import AnimatedText from '../ui/AnimatedText';
import ScrollToTopButton from '../ui/ScrollToUpButton';
import HomeSkeleton from '../ui/HomeSkeleton';
import SearchBar from '../ui/SearchHomeComponent';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';




function HomePage() {
    const input = useSelector((state: RootState) => state.inputt)


    const MotionBox = motion(Box);
    const [tempId, seTempId] = useState(1)
    const nav = useNavigate()
    const { colorMode } = useColorMode()
    const [page, setPage] = useState(() => {
        const savedPage = sessionStorage.getItem("homepage");
        return savedPage ? Number(savedPage) : 1;
    });

    //search by button
    const { data, isLoading, isFetching } = ReusableGetHook({
        queryKey: ["movie", page],
        URL: `/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${input}&page=${page}`,
        enabled: false
    })




    //After Search
    //now playing Movies
    const { data: latestMovies } = ReusableGetHook({ URL: `${import.meta.env.VITE_SERVER_URL}/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}&include_adult=false&certification_country=US&certification.lte=PG-13`, queryKey: ["latestmovies"] })
    //on the air Tv
    const { data: latestTv } = ReusableGetHook({ URL: `${import.meta.env.VITE_SERVER_URL}/tv/on_the_air?api_key=${import.meta.env.VITE_TMDB_API_KEY}&include_adult=false&certification_country=US&certification.lte=PG-13`, queryKey: ["latesttv"] })
    //trending movie
    const { data: trendingMovie } = ReusableGetHook({
        URL: `${import.meta.env.VITE_SERVER_URL}/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}&include_adult=false&certification_country=US&certification.lte=PG-13`, queryKey: ["trendingmovie"]
    })
    //trending tv
    const { data: trendingTv } = ReusableGetHook({
        URL: `${import.meta.env.VITE_SERVER_URL}/trending/tv/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}&include_adult=false&certification_country=US&certification.lte=PG-13`, queryKey: ["trendingtv"]
    })
    // comming soon
    const { data: comingSoonData } = ReusableGetHook({ URL: `${import.meta.env.VITE_SERVER_URL}/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&include_adult=false&certification_country=US&certification.lte=PG-13`, queryKey: ["comingsoon"] })


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



    //back
    useEffect(() => {
        // لما تتغير الصفحة، احفظها
        sessionStorage.setItem("homepage", JSON.stringify(page));
    }, [page]);
    if (isLoading) {
        return <HomeSkeleton />
    }
    return (
        <Box overflowX="hidden" overflowY="hidden">

            

            {/*search */}
            {isLoading ?
                (<MoviesSkeleton />)
                :
                (
                    <Box as="form" position="relative" w="100%" h="100vh" overflowY="hidden">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                zIndex: "-1",
                            }}
                        >
                            <source src={bgVideo} type="video/mp4" />
                        </video>

                        <FormControl
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            h="full"
                            flexDir="column"
                            gap="50px"
                            w="full"
                        >


                            {/* AnimatedText تحت */}
                            <FormLabel textAlign="center">
                                <AnimatedText words={["Find Movies", "Find TV Shows", "Find Anime"]} />
                            </FormLabel>
                            {/* Search component فوق */}
                            <SearchBar />
                        </FormControl>
                        <Grid
                            bg="rgba(19, 19, 19, 0.08)"
                            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                            border="1px solid rgba(255, 255, 255, 0.18)"
                            w="100%"
                            maxW={{ base: "100%", md: "1200px", lg: "1450px" }}
                            mx="auto"
                            p={{ base: 4, md: 8, lg: 10 }}
                            borderRadius="2xl"
                            mb={10}
                            gap={{ base: 4, md: 6, lg: 8 }}
                            margin={{ base: 0, md: 6 }}
                            templateColumns={{ base: "repeat(auto-fill, minmax(160px, 1fr))", md: "repeat(auto-fill, minmax(220px, 1fr))", lg: "repeat(auto-fill, minmax(300px, 1fr))" }} >
                            {data?.results?.length ? data.results?.map((item: IProduct, idx: number) => (

                                item.media_type === "tv" ?

                                    (<MotionBox
                                        key={item.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: idx * 0.05,
                                            ease: "easeOut",
                                        }}
                                        viewport={{ once: true, amount: 0.2 }}
                                    >
                                        <TvMovie vote_average={item.vote_average} type={item.media_type === "tv" ? "tv" : "movie"} onClick={() => seTempId(data?.results.id)} key={idx} maxW="md" movieInfo={item} />
                                    </MotionBox>)
                                    :

                                    (<MotionBox
                                        key={item.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: idx * 0.05,
                                            ease: "easeOut",
                                        }}
                                        viewport={{ once: true, amount: 0.2 }}
                                    >
                                        <MovieCard vote_average={item.vote_average} type={item.media_type === "tv" ? "tv" : "movie"} onClick={() => seTempId(data?.results.id)} key={idx} maxW="md" movieInfo={item} />
                                    </MotionBox>)

                            ))
                                :
                                null
                            }
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


                    </Box>
                )
            }


            {/* Lists */}



            {/* Trending tv, movies*/}
            <Flex
                flexDir={{ base: "column", md: "row" }}
                alignItems="center"
                justifyContent="space-between"
                px={{ base: "20px", md: "30px" }}
                mt="30px"
                mb="30px"
            >
                <Text
                    fontWeight="semibold"
                    fontSize="4xl"
                    color={colorMode === "dark" ? "white" : "blue.500"}
                    textAlign={{ base: "center", md: "start" }}
                    whiteSpace="nowrap"
                >
                    Trending
                </Text>

                <Button
                    w="150px"
                    mt={{ base: "10px", md: "0" }}
                    onClick={() => nav("/trending")}
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="blue"
                    variant="link"
                >
                    See More
                </Button>
            </Flex>
            <Tabs variant={"solid-rounded"} px={{ base: 4, md: 0 }}>
                <TabList display={"flex"} justifyContent={{ base: "center", md: "flex-start" }} alignItems="center" pl={{ base: 0, md: "30px" }}>
                    <Box display={"flex"} ml={0} gap={2}>
                        <Tab>Movies</Tab>
                        <Tab>Tv</Tab>
                    </Box>
                </TabList>
                <TabPanels>
                    <TabPanel px={0} >
                        <Grid h="fit-content" margin={30} templateColumns={{ base: "repeat(auto-fill, minmax(200px, 1fr))", md: "repeat(auto-fill, minmax(300px, 1fr))" }} gap={6}>
                            {trendingMovie?.results?.slice(0, 8).map((item: IProduct, idx: number) => (
                                <MotionBox
                                    key={item.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: idx * 0.2, ease: "linear" }}
                                    viewport={{ once: true, amount: 0.2 }}
                                >
                                    <MovieCard maxW='lg' type={item.media_type} vote_average={item.vote_average} movieInfo={item} />
                                </MotionBox>
                            ))}
                        </Grid>
                    </TabPanel>
                    <TabPanel px={0}>
                        <Grid h="fit-content" margin={30} templateColumns={{ base: "repeat(auto-fill, minmax(200px, 1fr))", md: "repeat(auto-fill, minmax(300px, 1fr))" }} gap={6}>
                            {trendingTv?.results?.slice(0, 8).map((item: IProduct, idx: number) => (
                                <MotionBox
                                    key={item.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: idx * 0.2, ease: "linear" }}
                                    viewport={{ once: true, amount: 0.2 }}
                                >
                                    <TvMovie maxW='lg' type={item.media_type} vote_average={item.vote_average} movieInfo={item} />
                                </MotionBox>
                            ))}
                        </Grid>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            {/* Latest Movies*/}
            <Flex
                flexDir={{ base: "column", md: "row" }}
                alignItems="center"
                justifyContent="space-between"
                px={{ base: "20px", md: "30px" }}
                mt="30px"
                mb="30px"
            >
                <Text
                    fontWeight="semibold"
                    fontSize="4xl"
                    color={colorMode === "dark" ? "white" : "blue.500"}
                    textAlign={{ base: "center", md: "start" }}
                    whiteSpace="nowrap"  // يخلي النص سطر واحد
                >
                    Latest Movies
                </Text>

                <Button
                    w="150px"
                    mt={{ base: "10px", md: "0" }}
                    onClick={() => nav("/movies")}
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="blue"
                    variant="link"
                >
                    See More
                </Button>
            </Flex>
            <Grid h="fit-content" margin={30} templateColumns={{ base: "repeat(auto-fill, minmax(200px, 1fr))", md: "repeat(auto-fill, minmax(300px, 1fr))" }} gap={6}>
                {latestMovies?.results?.slice(0, 8).map((movie: IProduct, idx: number) => (
                    <MotionBox
                        key={movie.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: idx * 0.2, ease: "linear" }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <MovieCard maxW='lg' type='movie' vote_average={movie.vote_average} movieInfo={movie} />
                    </MotionBox>
                ))}


            </Grid>
            {/* Latest Tv*/}
            <Flex
                flexDir={{ base: "column", md: "row" }}
                alignItems="center"
                justifyContent="space-between"
                px={{ base: "20px", md: "30px" }}
                mt="30px"
                mb="30px"
            >
                <Text
                    fontWeight="semibold"
                    fontSize="4xl"
                    color={colorMode === "dark" ? "white" : "blue.500"}
                    textAlign={{ base: "center", md: "start" }}
                    whiteSpace="nowrap"  // يخلي النص سطر واحد
                >
                    Latest Tv
                </Text>

                <Button
                    w="150px"
                    mt={{ base: "10px", md: "0" }}
                    onClick={() => nav("/tv")}
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="blue"
                    variant="link"
                >
                    See More
                </Button>
            </Flex>
            <Grid h="fit-content" margin={30} templateColumns={{ base: "repeat(auto-fill, minmax(200px, 1fr))", md: "repeat(auto-fill, minmax(300px, 1fr))" }} gap={6}>
                {latestTv?.results?.slice(0, 8).map((tv: IProduct, idx: number) => (
                    <MotionBox
                        key={tv.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: idx * 0.2, ease: "linear" }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <TvMovie maxW='lg' type='TV' vote_average={tv.vote_average} movieInfo={tv} />
                    </MotionBox>
                ))}


            </Grid>


            {/* coming soon movies */}
            <Text color={colorMode === "dark" ? "white" : "blue.500"} fontWeight={"semibold"} mb={"30px"} mt={"30px"} fontSize={"4xl"} textAlign={{ base: "center", md: "start" }} ml={{ base: "", md: "40px" }} >
                Coming Soon</Text>
            <Grid h="fit-content" margin={30} templateColumns={{ base: "repeat(auto-fill, minmax(200px, 1fr))", md: "repeat(auto-fill, minmax(300px, 1fr))" }} gap={6}>
                {comingSoonData?.results?.slice(0, 8).map((movie: IProduct, idx: number) => (
                    <MotionBox
                        key={movie.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: idx * 0.2, ease: "linear" }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <MovieCard maxW='lg' type='movie' vote_average={movie.vote_average} movieInfo={movie} />
                    </MotionBox>
                ))}


            </Grid>
            <ScrollToTopButton windowScrollY={4000} />

        </Box>
    )
}

export default HomePage
