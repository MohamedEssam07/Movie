import { Card, CardBody, Image, Heading, Stack, Text, ButtonGroup, Button, Box, Badge, Tooltip, useColorMode } from '@chakra-ui/react'
import type { IProduct } from "../Interfaces";
import { useNavigate } from 'react-router';
import { useAppDispatch, type RootState } from '../app/store';
import { addFavourite, removeFavourite } from '../app/features/favouriteSlice';
import ImageSkeleton from '../ui/Loading';
import { useSelector } from 'react-redux';
import CookieService from '../services/CookieService';



interface IProps {
    children?: React.ReactNode;
    maxW: string;
    movieInfo: IProduct
    onClick?: () => void;
    movieType?: string;
    type?: string;
    vote_average: number;
}
const MoiveCard = ({ type, onClick, movieInfo }: IProps) => {
    const { colorMode } = useColorMode()
    const { title, poster_path, vote_average, release_date, id } = movieInfo
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const token = CookieService.get("jwt")
    const { items } = useSelector((state: RootState) => state.favourite)
    const isFavourite = items.some((item: IProduct) => item.id === movieInfo.id)
    //lw ah yb2a isfavourite btrue , some dy method bt5osh 3la el arraay 
    //btshoof hal feeh 3la el a2l 3onsor mn el 3naser dy by722 el shart dh
    // w btrg3 True,False bsss
    return (
        <>
            {poster_path &&
                <Card
                    w={"full"}
                    bgGradient={
                        colorMode === "light"
                            ? "linear(to-r, blue.50, teal.50)"//
                            : "linear(to-br, gray.700, gray.800)"
                    }
                    color={colorMode === "light" ? "gray.800" : "white"} // عشان النص يبان في الحالتين
                    borderRadius="2xl"
                    overflow="hidden"
                    boxShadow="2xl"
                    position="relative"
                    transition="all 0.3s ease"
                    _hover={{
                        transform: "scale(1.05)",
                        boxShadow: colorMode === "light" ? "lg" : "dark-lg", // تظبيط الشادو
                    }}
                >
                    <Box position="relative" w="full" h="350px">
                        {poster_path ?
                            <Image
                                src={

                                    `https://image.tmdb.org/t/p/w500${poster_path}`

                                }
                                alt={title}
                                w="full"
                                h="full"
                                objectFit="cover"
                            />
                            :
                            <ImageSkeleton />
                        }
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
                            <ButtonGroup display={"flex"} flexDir={"column"} gap={"10px"} spacing={"0px"} >
                                <Button size={"sm"} w={"180px"} colorScheme="blue" onClick={() => {
                                    onClick?.(),
                                        nav(`/movies/${id}`)
                                }}>
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
                </Card >
            }

        </>
    );
};


export default MoiveCard;