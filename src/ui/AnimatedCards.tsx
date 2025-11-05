/** @jsxImportSource @emotion/react */
import { Box, Text, useColorMode } from "@chakra-ui/react";
import ReusableGetHook from "../hooks/ReusableGetHook";
import type { IProduct } from "../Interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/autoplay";
import TvMovie from "../components/TvMovie";
import MoiveCard from "../components/MoiveCard";
import { useEffect } from "react";

interface IProps {
  id: string | undefined;
}

const AnimatedCards = ({ id }: IProps) => {
  if (!id) return null;
  const { colorMode } = useColorMode()

  // TV recommendations
  const { data: tvData } = ReusableGetHook({
    URL: `${import.meta.env.VITE_SERVER_URL}/tv/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`,
    queryKey: ["tv-recommendations", id]
  });

  // Movie recommendations
  const { data: movieData } = ReusableGetHook({
    URL: `${import.meta.env.VITE_SERVER_URL}/movie/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`,
    queryKey: ["movie-recommendations", id]
  });


  const recommendations: IProduct[] =
    tvData?.results?.length
      ? tvData.results
      : movieData?.results || [];



  useEffect(() => {
    setTimeout(() => {
      if (recommendations.length === 0) return <Text fontSize="6xl" fontWeight="bold" textAlign="center" color="gray.400">
        NO RECOMMENDATIONS
      </Text>;
    }, 3000);
  }, [])



  return (
    <Box
      w="100%"
      maxW={{ base: "100%", md: "1200px", lg: "1400px" }}
      mx="auto"
      p={{ base: 3, md: 4, lg: 5 }}
      px={{ base: 4, md: 6 }}
      borderRadius="2xl"
      bgGradient={colorMode === "light" ? "linear(to-b, white, gray.50)" : "linear(to-b, #0a0a0a, #111827, #1f2937)"}
      boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
      border="1px solid rgba(255, 255, 255, 0.18)"
      mb={10}
      overflowX="hidden"
    >

      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="bold"
        bgGradient="linear(to-r, cyan.400, blue.500)"
        bgClip="text"
        textTransform="uppercase"
        letterSpacing="wide"
        textAlign="center"
        mb={{ base: 3, md: 5 }}
      >
        Recommended for You
      </Text>


      <Swiper
        spaceBetween={20}
        loop={recommendations.length > 5}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        style={{ width: "100%", overflow: "hidden" }}
        breakpoints={{
          0: { slidesPerView: 1.5, spaceBetween: 10 },
          480: { slidesPerView: 2.5, spaceBetween: 15 },
          768: { slidesPerView: 3.5, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
        }}
      >
        {recommendations.filter((item: IProduct) => item.poster_path).map((movie: IProduct) => (
          <SwiperSlide key={movie.id}>
            {movie.media_type === "tv" ? (
              <TvMovie
                type="TV"
                movieInfo={movie}
                vote_average={movie.vote_average}
                maxW="lg"
              />
            ) : (
              <MoiveCard
                type="movie"
                movieInfo={movie}
                vote_average={movie.vote_average}
                maxW="lg"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default AnimatedCards;
