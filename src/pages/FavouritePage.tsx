import { Box, Button, Grid, Heading, Flex, useColorMode } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../app/store";

import FavouriteCard from "../components/FavouriteCard";
import { removeAllFavourite } from "../app/features/favouriteSlice";


import type { IProduct } from "../Interfaces";
import CookieService from "../services/CookieService";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import bglogo from "..//assets//huawei-purple-1920x1080-22843.jpg"
interface IProps { }

const FavouritePage = ({ }: IProps) => {
    const { colorMode } = useColorMode()
    const { items } = useSelector((state: RootState) => state.favourite);
    const dispatch = useAppDispatch();
    const nav = useNavigate()
    const token = CookieService.get("jwt")
    useEffect(() => {
        if (!token) {
            nav(-1)
        }

    }, [token])

    if (!token) {

        return null;
    }

    return (
        <>


            {items?.length ? (
                <Box mt="80px" maxW="1200px" mx="auto" px={{ base: "4", md: "8" }}>
                    {/* عنوان الصفحة + الزرار */}
                    <Flex justify="space-between" align="center" mb="10">
                        <Heading
                            fontSize={{ base: "2xl", md: "3xl" }}
                            fontWeight="extrabold"
                            color={colorMode === "light" ? "blue.500" : "white"}
                        >
                            Your Favourites <Box as="span" color="pink.400">❤️</Box>
                        </Heading>

                        <Button
                            colorScheme="red"
                            variant="solid"

                            px="6"
                            py="5"
                            fontWeight="bold"
                            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                            onClick={() => dispatch(removeAllFavourite())}
                        >
                            Remove All
                        </Button>
                    </Flex>

                    {/* شبكة الأفلام */}
                    <Grid
                        templateColumns={{
                            base: "repeat(auto-fill, minmax(150px, 1fr))",
                            sm: "repeat(auto-fill, minmax(180px, 1fr))",
                            md: "repeat(auto-fill, minmax(200px, 1fr))",
                        }}
                        gap={8}
                        justifyItems="center"

                    >
                        {items.map((item: IProduct, idx: number) => (
                            <FavouriteCard key={idx} movieInfo={item} />
                        ))}
                    </Grid>
                </Box>
            ) : (
                <Box
                    bgImage={`url(${bglogo})`}
                    bgSize="cover"
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    h={"120vh"}
                    w="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt="-60px"      // نفس ارتفاع navbar
                    overflow={"hidden"}
                >
                    <Heading
                        fontSize={{ base: "xl", md: "5xl" }}
                        fontWeight="bold"
                        color="gray.200"
                        textAlign="center"
                    >
                        No favourites yet
                    </Heading>
                </Box>

            )}

        </>
    );
};

export default FavouritePage;
