import { Card, CardBody, Image, Heading, Stack, Text, ButtonGroup, Button, Box, Badge } from '@chakra-ui/react'

import { useNavigate } from 'react-router';
import { useAppDispatch, type RootState } from '../app/store';
import { addFavourite, removeFavourite } from '../app/features/favouriteSlice';
import { useSelector } from 'react-redux';
import type { IProduct } from '../Interfaces';



interface IProps {
    children?: React.ReactNode;
    maxW: string;
    movieInfo: IProduct
    onClick?: () => void;
    movieType?: string;
    type?: string;
    name: string;
    vote_average: number;
}
const TvCard = ({ type, vote_average, children, movieType, maxW, onClick, movieInfo }: IProps) => {
    const { title, overview, poster_path, rating, release_date, name, id } = movieInfo
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const { items } = useSelector((state: RootState) => state.favourite)
    const isFavourite = items.some((item: IProduct) => item.id === movieInfo.id)
    return (
        <>
            <Card
                w={"full"}
                bgGradient="linear(to-br, gray.700, gray.800)"
                color="white"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="2xl"
                position="relative"
                transition="all 0.3s ease"
                _hover={{ transform: "scale(1.05)", boxShadow: "dark-lg" }}
            >
                <Box position="relative" w="full" h="350px">
                    <Image
                        src={
                            poster_path
                                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                : "https://via.placeholder.com/500x750?text=No+Image"
                        }
                        alt={title}
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
                        bg="blackAlpha.700"
                        opacity="0"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        transition="opacity 0.3s ease"
                        _hover={{ opacity: 1 }}
                    >
                        <ButtonGroup display={"flex"} spacing="2">
                            <Button size={"sm"} colorScheme="blue" onClick={() => {
                                onClick?.(),
                                    nav(`/tv/${id}`)
                            }}>
                                View
                            </Button>
                            {isFavourite ?
                                (<Button size={"sm"} variant="outline" colorScheme="red" onClick={() => dispatch(removeFavourite(movieInfo))}
                                >
                                    Remove From Favourite
                                </Button>)
                                :
                                (<Button size={"sm"} variant="outline" colorScheme="blue" onClick={() => dispatch(addFavourite(movieInfo))}
                                >
                                    Add To Favourite
                                </Button>)
                            }
                        </ButtonGroup>
                    </Box>
                </Box>

                <CardBody p="5">
                    <Stack spacing="1">
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                            <Heading size="sm" noOfLines={1}>{title}</Heading>
                            <Button size={"sm"} variant={"outline"} colorScheme='blue' mr={"-10px"}>{type}</Button>
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"} mt={"10px"}>
                            <Badge colorScheme="blue" mr={2} fontSize="0.7em">
                                {release_date?.split("-")[0] || "N/A"}
                            </Badge>
                            <Text as="span" color="yellow.400" fontSize="0.75em">
                                ⭐ {!!vote_average ? vote_average.toFixed(1) : "N|A"}
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </>
    );
};

export default TvCard;