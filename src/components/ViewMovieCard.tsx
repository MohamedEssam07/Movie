import { Card, CardBody, CardFooter, Image, Text, Button, Box, IconButton, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, HStack, VStack, Tooltip, Flex } from '@chakra-ui/react'
import type { IImdbData, IMovieCredits, IProduct } from "../Interfaces";
import { useAppDispatch, type RootState } from '../app/store';
import { addFavourite, removeFavourite } from '../app/features/favouriteSlice';
import { StarIcon } from '@chakra-ui/icons';
import ReusableGetHook from '../hooks/ReusableGetHook';
import { useNavigate, useParams } from 'react-router';
import FancyText from '../ui/FancyText';
import { useSelector } from 'react-redux';

import bglogo from "../assets/homesearch-bg.jpg"

import BackButton from '../ui/BackButton';
import WatchNowToggle from '../ui/WatchNowDropdown';
import { useGetMovieCreditsQuery, useGetMovieImdbQuery } from '../app/services/apiSlice';
import { useEffect } from 'react';
import CookieService from '../services/CookieService';


interface IProps {
    children?: React.ReactNode;
    maxW?: string;
    movieInfo: IProduct
    onClick?: () => void
}

const ViewMovieCard = ({ movieInfo }: IProps) => {
    const { id } = useParams()
    const { data: ytData } = ReusableGetHook({
        URL: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
        queryKey: ["yt", id ?? ""]
    })
    const token = CookieService.get("jwt")
    const dispatch = useAppDispatch()
    const { title, overview, poster_path, homepage } = movieInfo
    const { isOpen, onOpen, onClose } = useDisclosure();
    const favourites = useSelector((state: RootState) => state.favourite.items);
    const isFavourite = favourites.some((item) => item.id === movieInfo.id);
    const nav = useNavigate()
    const currMoviePage = JSON.parse(localStorage.getItem("currMoviePage") || "[]")
    console.log(currMoviePage)

    //imdb / netflix
    const { data: imdbData } = useGetMovieImdbQuery(id) as { data: IImdbData };
    //credits
    const { data: MovieCredits } = useGetMovieCreditsQuery(id)
    console.log("MovieCredits", MovieCredits)

    //
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);
    return (
        <Box>

            <Box
                mt="0"
                minH={{ base: "auto", md: "100vh" }}
                pb={{ base: 10, md: 0 }}
                bgImage={poster_path ? `url(https://image.tmdb.org/t/p/original${poster_path})` : `url(${bglogo})`}
                bgRepeat="no-repeat"
                bgSize="cover"
                bgPosition="center"
                position="relative"
                _before={{
                    content: "''",
                    position: "absolute",
                    inset: 0,
                    bg: "rgba(8, 8, 8, 0.7)",
                }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                px={{ base: 4, md: 10 }}
            >
                <BackButton onClick={() => nav(-1)} />
                <Box
                    mt={{ base: "60px", md: "60px" }}
                    display="flex"
                    flexDir={{ base: "column", md: "row" }}
                    gap={{ base: 6, md: 20 }}
                    mx={{ base: 4, md: 0 }}
                    alignItems="center"
                    justifyContent={{ base: "center", md: "space-evenly" }}
                    w="full"
                    maxW={{ base: "100%", md: "1200px", lg: "1450px" }}
                    px={{ base: 4, md: 6, lg: 8 }}
                >
                    <Card
                        order={{ base: 1, md: 0 }}
                        maxW={{ base: "full", md: "md" }}
                        bg="transparent"
                        color="white"
                        ml={{ base: "0px", md: "-70px" }}
                        borderRadius="none"
                        boxShadow="none"
                        overflow="hidden"
                    >
                        <CardBody display="flex" mt={{ base: "0px", md: "50px" }} flexDirection="column" gap={10} textAlign={{ base: "center", md: "left" }}>
                            <FancyText title={title} />
                            <Text fontSize={{ base: "sm", md: "md" }}>{overview}</Text>

                            <Flex 
                                direction={{ base: "column", md: "row" }} 
                                gap={{ base: 2, md: 4 }}
                                align="center"
                                w="full" 
                                ml={{ base: "0px", md: "-5px" }}
                            >
                                <Box flex={{ base: "none", md: 1 }} w={{ base: "full", md: "auto" }}>
                                    <WatchNowToggle imdbId={imdbData?.imdb_id} homepage={homepage} />
                                </Box>

                                <Button 
                                    onClick={onOpen} 
                                    flex={{ base: "none", md: 1 }}
                                    w={{ base: "full", md: "auto" }}
                                    variant="solid" 
                                    bg="transparent" 
                                    transition="all 0.5s ease"
                                    _hover={{
                                        bgGradient: "linear(to-r, gray.500, gray.700)",
                                        transform: "scale(1.05)",
                                        boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)",
                                    }} 
                                    border="1px" 
                                    color="white" 
                                    borderRadius="full" 
                                    size="lg"
                                >
                                    Trailer
                                </Button>
                                <Tooltip label={!token && "You must be logged in to use this button"} hasArrow>
                                    <IconButton
                                        icon={<StarIcon />}
                                        aria-label="Add to favourite"
                                        h="50px"
                                        flex={{ base: "none", md: 1 }}
                                        w={{ base: "full", md: "auto" }}
                                        borderRadius="full"
                                        variant="solid"
                                        bgGradient={isFavourite ? "linear(to-r, yellow.400, yellow.500)" : "white"}
                                        disabled={!token}
                                        onClick={() => {
                                            if (token) {
                                                isFavourite ? dispatch(removeFavourite(movieInfo)) : dispatch(addFavourite(movieInfo))
                                            }
                                        }}
                                    />
                                </Tooltip>
                            </Flex>
                            <HStack
                                spacing={{ base: 4, md: 7 }}
                                flexWrap={{ base: "wrap", lg: "nowrap" }}
                                justifyContent={{ base: "center", lg: "flex-start" }}
                            >
                                {MovieCredits?.cast.slice(0, 3).map((item: IMovieCredits, idx: number) => (
                                    <VStack
                                        key={idx}
                                        w="120px"
                                        alignItems="center"
                                        spacing={1}
                                        flexShrink={0}
                                    >
                                        <Box
                                            position="relative"
                                            w="120px"
                                            h="120px"
                                            flexShrink={0}
                                        >
                                            <Image
                                                w="120px"
                                                h="120px"
                                                borderRadius="3xl"
                                                src={`https://image.tmdb.org/t/p/w500/${item?.profile_path}`}
                                                objectFit="cover"
                                                transition="0.3s"
                                                _hover={{ transform: "scale(1.05)" }}
                                            />

                                            {/* Hover character */}
                                            <Text
                                                position="absolute"
                                                top="0"
                                                left="0"
                                                w="100%"
                                                h="100%"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                bg="rgba(0,0,0,0.6)"
                                                color="white"
                                                fontWeight="bold"
                                                borderRadius="3xl"
                                                opacity={0}
                                                transition="0.3s"
                                                _hover={{ opacity: 1 }}
                                                textAlign="center"
                                                p={2}
                                            >
                                                {item?.character}
                                            </Text>
                                        </Box>

                                        <Box h="40px" overflow="hidden">
                                            <Text
                                                noOfLines={2}
                                                fontSize="sm"
                                                textAlign="center"
                                            >
                                                {item?.original_name}
                                            </Text>
                                        </Box>
                                    </VStack>
                                ))}
                            </HStack>

                        </CardBody>
                        <CardFooter></CardFooter>
                    </Card>

                    <Card
                        ml={{ base: "", md: "40px" }}
                        mt={{ base: "50px", md: "" }}
                        maxW={{ base: "full", md: "sm" }}
                        bg="gray.800"
                        color="white"
                        h={{ base: "550px", md: "620px" }}
                        overflow="hidden"
                        boxShadow="xl"
                    >
                        {poster_path ?
                            <Image
                                _hover={{ transform: "scale(1.05)", opacity: "0.8" }}
                                transition="all 0.3s ease"

                                src={
                                    `https://image.tmdb.org/t/p/original${poster_path}`

                                }
                                alt={title}
                                h="full"
                                w="full"
                                objectFit="cover"
                            />


                            :
                            null
                        }
                    </Card>

                    <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
                        <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(4px)" />
                        <ModalContent bg="transparent" boxShadow="none">
                            <ModalCloseButton color="white" />
                            <ModalBody p={0}>
                                <iframe
                                    width="100%"
                                    height="480"
                                    src={`https://www.youtube.com/embed/${ytData?.results[0]?.key}`}
                                    title="Movie Trailer"
                                    allowFullScreen
                                    style={{
                                        borderRadius: "12px",
                                        border: "none",
                                    }}
                                ></iframe>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Box>
            </Box>
        </Box>
    );
};

export default ViewMovieCard;
