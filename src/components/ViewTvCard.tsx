// @ts-nocheck
import { Card, CardBody, CardFooter, Image, Heading, Stack, Text, Divider, ButtonGroup, Button, Box, Badge, VStack, IconButton, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, HStack } from '@chakra-ui/react'
import type { IImdbData, IMovieCredits, IProduct } from "../Interfaces";
import { useAppDispatch, type RootState } from '../app/store';
import { addFavourite, removeFavourite } from '../app/features/favouriteSlice';
import { StarIcon } from '@chakra-ui/icons';
import ReusableGetHook from '../hooks/ReusableGetHook';
import { useNavigate, useParams } from 'react-router';
import FancyText from '../ui/FancyText';
import { useSelector } from 'react-redux';

import bglogo from "../assets/homesearch-bg.jpg"
import { FaArrowLeft } from 'react-icons/fa6';
import BackButton from '../ui/BackButton';
import { useGetTvCreditsQuery, useGetTvImdbQuery } from '../app/services/apiSlice';
import WatchNowDropdown from '../ui/WatchNowDropdown';
import WatchNowToggle from '../ui/WatchNowDropdown';
import { memo, useEffect } from 'react';




interface IProps {
    children?: React.ReactNode;
    maxW?: string;
    movieInfo: IProduct
    onClick?: () => void
}
const ViewTvCard = ({ onClick, movieInfo }: IProps) => {
    const { id } = useParams()
    console.log(id)
    const { data: ytData } = ReusableGetHook({
        URL: `${import.meta.env.VITE_SERVER_URL}/tv/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        , queryKey: ["tvv", id ?? ""]
    })
    console.log(ytData)
    console.log("ytData", ytData?.results[0]?.key)
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const { name, overview, poster_path, homepage, rating, imdb_id, release_date } = movieInfo
    console.log(movieInfo.imdb_id)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const favourites = useSelector((state: RootState) => state.favourite.items);

    const isFavourite = favourites.some((item) => item.id === movieInfo.id);

    //imdb
    const { data: imdbData } = useGetTvImdbQuery(id) as { data: IImdbData };
    console.log("imdbData", imdbData)

    //credits
    const { data: TvCredits } = useGetTvCreditsQuery(id)
    console.log("MovieCredits", TvCredits)

    //when changing viewtv page scrolls up to the top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);
    return (
        <Box>
            <Box
                mt="-4"
                minH="110vh"
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
                    mt={"60px"}
                    display="flex"
                    flexDir={{ base: "column", md: "row" }} // عمودي على الموبايل، أفقي على md وفوق
                    gap={{ base: 6, md: 20 }} // مسافة أصغر على الموبايل
                    mx={{ base: 4, md: 0 }} // مسافة أفقية صغيرة على الموبايل
                    alignItems="center"
                    justifyContent={{ base: "", md: "space-evenly" }}
                    w="full"
                >
                    {/* Card النصوص */}
                    <Card

                        order={{ base: 1, md: 0 }}
                        maxW={{ base: "full", md: "md" }}
                        bg="transparent"
                        color="white"
                        ml={{ base: "0px", md: "-70px" }}
                        borderRadius="none" // يشيل أي دوران
                        boxShadow="none" // يشيل أي ظل
                        overflow="hidden" // يمنع أي overflow يبان


                    >
                        <CardBody display="flex" mt={{ base: "0px", md: "50px" }} flexDirection="column" gap={10} textAlign={{ base: "center", md: "left" }}>

                            <FancyText title={name} />
                            <Text>{overview}</Text>
                            <ButtonGroup ml={{ base: "0px", md: "-5px" }}
                                w="full"
                                display="flex"
                                flexDirection={{ base: "column", sm: "row" }}
                                gap={{ base: "10px", md: "10px" }}

                            >

                                <WatchNowToggle imdbId={imdbData?.imdb_id} homepage={homepage} />
                                <Button
                                    w="full"
                                    variant="solid"
                                    bg="transparent"
                                    _hover={{
                                        bgGradient: "linear(to-r, gray.500, gray.700)",
                                        transform: "scale(1.05)",
                                    }}
                                    border="1px"
                                    color="white"
                                    borderRadius="full"
                                    size="lg"
                                    onClick={onOpen}
                                >
                                    Trailer
                                </Button>
                                <IconButton
                                    icon={<StarIcon />}
                                    aria-label="Add to favourite"
                                    h="50px"
                                    w="full"

                                    borderRadius="full"
                                    variant="solid"
                                    bgGradient={isFavourite ? "linear(to-r, yellow.500, yellow.400)" : ""}
                                    onClick={() => isFavourite ? dispatch(removeFavourite(movieInfo)) : dispatch(addFavourite(movieInfo))}
                                />
                            </ButtonGroup>
                            <HStack spacing={7}>
                                {TvCredits?.cast.slice(0, 3).map((item: IMovieCredits, idx: number) => (
                                    <VStack
                                        key={idx}
                                        w="120px"
                                        alignItems="center"
                                        spacing={1}
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
                    </Card>

                    {/* Card الصورة */}
                    <Card

                        ml={{ base: "", md: "40px" }}

                        mt={{ base: "50px", md: "" }}
                        maxW={{ base: "full", md: "sm" }}
                        bg="gray.800"
                        color="white"
                        h={{ base: "550px", md: "620px" }} //

                        overflow="hidden"
                        boxShadow="xl"
                    >
                        {poster_path && (
                            <Image
                                _hover={{ transform: "scale(1.05)", opacity: 0.8 }}
                                transition="all 0.3s ease"
                                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                                alt={name}
                                h="full"
                                w="full"
                                objectFit="cover"
                            />
                        )}
                    </Card>
                </Box>

                {/* Modal */}
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
        </Box >
    );
};

export default memo(ViewTvCard);