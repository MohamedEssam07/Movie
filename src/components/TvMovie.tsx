import { Card, CardBody, Image, Heading, Stack, Text, Badge, ButtonGroup, Button, Box, Tooltip, useColorModeValue, useColorMode } from '@chakra-ui/react';
import type { IProduct } from "../Interfaces";
import { useNavigate } from 'react-router';
import { useAppDispatch, type RootState } from '../app/store';
import { addFavourite, removeFavourite } from '../app/features/favouriteSlice';
import { useSelector } from 'react-redux';
import CookieService from '../services/CookieService';

interface IProps {
    children?: React.ReactNode;
    maxW: string;
    movieInfo: IProduct
    onClick?: () => void;
    type?: string;
    vote_average: number;
}

const TvMovie = ({ children, type: type, maxW, onClick, movieInfo }: IProps) => {
    const { name, overview, poster_path, vote_average, first_air_date, rating, release_date, id } = movieInfo || {}
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const token = CookieService.get("jwt")
    const { items } = useSelector((state: RootState) => state.favourite)
    const isFavourite = items.some((item: IProduct) => item.id === movieInfo.id)

    // Chakra color mode values
    const bgCard = useColorModeValue("white", "gray.800");
    const overlayBg = useColorModeValue("blackAlpha.300", "blackAlpha.700");
    const textColor = useColorModeValue("gray.800", "white");
    const favColor = useColorModeValue("gray.800", "white");
    const { colorMode } = useColorMode()
    return (
        <>
            {poster_path &&
                <Card
                    w={"full"}
                    bg={bgCard}

                    borderRadius="2xl"
                    overflow="hidden"
                    bgGradient={
                        colorMode === "light"
                            ? "linear(to-r, blue.50, teal.50)"//
                            : "linear(to-br, gray.700, gray.800)"
                    }
                    color={colorMode === "light" ? "gray.800" : "white"} // عشان النص يبان في الحالتين
                    position="relative"
                    transition="all 0.3s ease"
                    _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                >
                    <Box position="relative" w="full" h="350px">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                            alt={name}
                            w="full"
                            h="full"
                            objectFit="cover"
                        />
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            w="full"
                            h="full"
                            bg={overlayBg}
                            opacity="0"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            transition="opacity 0.3s ease"
                            _hover={{ opacity: 1 }}
                        >
                            <ButtonGroup display={"flex"} flexDir={"column"} gap={"10px"} spacing={"0px"}>
                                <Button
                                    size={"sm"}
                                    w={"95%"}
                                    colorScheme="blue"
                                    onClick={() => {
                                        onClick?.();
                                        nav(`/tv/${id}`)
                                    }}
                                >
                                    View
                                </Button>

                                {isFavourite ?
                                    (token ?
                                        <Button
                                            size={"sm"}
                                            w={"95%"}
                                            variant="outline"
                                            colorScheme="red"
                                            onClick={() => dispatch(removeFavourite(movieInfo))}
                                        >
                                            Remove From Favourite
                                        </Button>
                                        :
                                        <Tooltip label="You must be logged in to use this button" hasArrow>
                                            <span>
                                                <Button
                                                    disabled={!token}
                                                    size={"sm"}
                                                    w={"95%"}
                                                    variant="outline" colorScheme="blue"
                                                    onClick={() => dispatch(addFavourite(movieInfo))}
                                                >
                                                    Add To Favourite
                                                </Button>
                                            </span>
                                        </Tooltip>
                                    )
                                    :
                                    <Tooltip label={!token && "You must be logged in to use this button"} hasArrow>
                                        <span>
                                            <Button
                                                disabled={!token}
                                                size={"sm"}
                                                w={"95%"}

                                                variant="outline" colorScheme="blue"
                                                onClick={() => dispatch(addFavourite(movieInfo))}
                                            >
                                                Add To Favourite
                                            </Button>
                                        </span>
                                    </Tooltip>
                                }
                            </ButtonGroup>
                        </Box>
                    </Box>

                    <CardBody p="5">
                        <Stack spacing="1">
                            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                <Heading size="sm" noOfLines={1}>{name}</Heading>
                                <Button size={"sm"} variant={"outline"} colorScheme='blue'>{type}</Button>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} mt={"10px"}>
                                <Badge colorScheme="blue" mr={2} fontSize="0.7em">
                                    {first_air_date?.split("-")[0] || "N/A"}
                                </Badge>
                                <Text as="span" color="yellow.400" fontSize="0.75em">
                                    ⭐ {!!vote_average ? vote_average.toFixed(1) : "N/A"}
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>
            }
        </>
    );
};

export default TvMovie;
