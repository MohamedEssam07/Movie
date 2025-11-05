import {
    Box,
    Grid,
    HStack,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Stack,
} from "@chakra-ui/react"

const MoviesSkeleton = () => {
    return (
        <>
            <Box p={4} borderRadius="md" mt={"60px"}>
                <Grid
                    w="100%"
                    maxW={{ base: "100%", md: "1200px", lg: "1450px" }}
                    mx="auto"
                    p={{ base: 4, md: 6, lg: 8 }}
                    borderRadius="2xl"
                    bg="rgba(19, 19, 19, 0.08)"
                    boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                    border="1px solid rgba(255, 255, 255, 0.18)"
                    mb={10}
                    h="fit-content"
                    gap={{ base: 4, md: 6 }}
                    templateColumns={{ base: "repeat(auto-fill, minmax(160px, 1fr))", md: "repeat(auto-fill, minmax(220px, 1fr))", lg: "repeat(auto-fill, minmax(300px, 1fr))" }}
                >
                    {Array.from({ length: 20 }, (_: any, idx: number) => (
                        <Stack
                            maxW="sm"
                            bg="gray.800"
                            color="white"
                            borderRadius="xl"
                            overflow="hidden"
                            boxShadow="xl"
                            spacing={6}
                            key={idx}
                            align="center"
                            justify="center"
                        >
                            <Skeleton height="200px" w="full" />
                            <SkeletonText noOfLines={2} w="80%" />
                        </Stack>

                    ))}
                </Grid>
            </Box>

        </>
    )
}
export default MoviesSkeleton
