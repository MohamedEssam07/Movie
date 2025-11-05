import { Card, CardBody, Image, Text, Box, Flex, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../app/store";
import type { IProduct } from "../Interfaces";
interface IProps {
    children?: React.ReactNode;
    maxW: string;
    movieInfo: IProduct
    onClick?: () => void;
    type?: string;
    vote_average: number;


}
const SearchCard = ({ children, type: type, maxW, onClick, movieInfo }: IProps) => {
    const { colorMode } = useColorMode()
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const { name, overview, title, poster_path, vote_average, first_air_date, rating, release_date, id } = movieInfo
    return (
        <>
            {poster_path && (
                <Card

                    maxW="700px"
                    bg={colorMode === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(30, 30, 30, 0.85)"}
                    color="white"
                    borderRadius="2xl"
                    overflow="hidden"
                    boxShadow="lg"
                    transition="all 0.3s ease"
                    _hover={{ transform: "scale(1.03)" }}
                    cursor="pointer"
                    onClick={onClick}

                >
                    <Flex align="flex-start">
                        {/* الصورة */}
                        <Image
                            src={
                                poster_path
                                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                    : "https://via.placeholder.com/500x750?text=No+Image"
                            }
                            alt={title || name}
                            objectFit="cover"
                            borderRadius="md"
                            w="130px"
                            h="190px"
                        />

                        {/* التفاصيل */}
                        <CardBody pl={4}>
                            <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
                                {title || name}
                            </Text>

                            <Text fontSize="sm" color="gray.300" noOfLines={3} mt={1}>
                                {overview || "No description available."}
                            </Text>

                            <Box mt={3}>
                                <Text fontSize="sm" color="gray.400">
                                    ⭐ Rating: {vote_average ? vote_average.toFixed(1) : "N/A"}
                                </Text>
                                <Text fontSize="sm" color="gray.400">
                                    📅 {release_date || first_air_date || "Unknown date"}
                                </Text>
                            </Box>
                        </CardBody>
                    </Flex>
                </Card>)
            }
        </>
    );
};

export default SearchCard;