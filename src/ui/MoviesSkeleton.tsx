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
            <Box bg="gray.500" p={4} borderRadius="md" mt={"60px"}  >
                <Grid

                    w="100%"
                    maxW={{ base: "400px", md: "1450px" }}
                    mx="auto"
                    p={50}
                    borderRadius="2xl"
                    bg="rgba(19, 19, 19, 0.08)"
                    boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                    border="1px solid rgba(255, 255, 255, 0.18)"
                    mb={10}
                    h="fit-content" gap={9}
                    margin={{ md: 30 }}
                    templateColumns="repeat(auto-fill, minmax(300px, 1fr))"

                >
                    {Array.from({ length: 20 }, (_: any, idx: number) => (
                        <Stack maxW="sm"
                            bg="gray.800"
                            color="white"
                            borderRadius="xl"
                            overflow="hidden"
                            boxShadow="xl" spacing={6} key={idx} >
                            <HStack w="full">
                                <SkeletonCircle mx={"auto"} mt={"10px"} size="120" />
                                <SkeletonText noOfLines={2} />
                            </HStack>
                            <Skeleton height="200px" />
                        </Stack>

                    ))}
                </Grid>
            </Box>

        </>
    )
}
export default MoviesSkeleton
