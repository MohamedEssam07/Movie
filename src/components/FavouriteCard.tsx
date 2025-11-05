// @ts-nocheck
import { Box, Image, Text, VStack, HStack, Button, Grid, useColorMode } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

import { useAppDispatch, type RootState } from "../app/store";
import { useSelector } from "react-redux";
import { removeFavourite } from "../app/features/favouriteSlice";
import type { IProduct } from "../Interfaces";
import { useNavigate } from "react-router";
import { useGetMovieDetailsQuery, useGetTvDetailsQuery } from "../app/services/apiSlice";

interface IProps {
    movieInfo: IProduct
}
const FavouriteCard = ({ movieInfo }: IProps) => {
    const { colorMode } = useColorMode()
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    console.log(movieInfo.name)

    return (
        <>

            <Box
                maxW="250px"
                bg="gray.800"

                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                transition="all 0.2s ease"
                bgGradient={
                    colorMode === "light"
                        ? "linear(to-r, blue.50, teal.50)"//
                        : "linear(to-br, gray.700, gray.800)"
                }
                color={colorMode === "light" ? "gray.800" : "white"}
                _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}

            >
                <Image
                    onClick={() =>
                        nav(`/${movieInfo.name ? "tv" : "movies"}/${movieInfo.id}`)
                    }
                    src={
                        movieInfo.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`
                            : "https://via.placeholder.com/250x375?text=No+Image"
                    }
                    alt={movieInfo.title}
                />
                <VStack align="start" p={3} spacing={2}>
                    <Text fontWeight="bold" noOfLines={1}>
                        {movieInfo.title ? movieInfo.title : movieInfo.name}
                    </Text>
                    <Text fontSize="sm" color="gray.400" noOfLines={2}>
                        {movieInfo.overview || "No description available."}
                    </Text>
                    <HStack justify="space-between" w="full" pt={2}>
                        <Text fontSize="xs" color="gray.500">
                            {movieInfo.release_date ? movieInfo.release_date?.split("-")[0] : movieInfo.first_air_date?.split("-")[0]}
                        </Text>
                        <Button
                            size="xs"
                            colorScheme="red"
                            leftIcon={<FaTrash />}
                            variant="ghost"
                            onClick={() => dispatch(removeFavourite(movieInfo))}
                        >
                            Remove
                        </Button>
                    </HStack>
                </VStack>

            </Box>
        </>
    );
};

export default FavouriteCard;
