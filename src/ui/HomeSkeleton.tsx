import { Box, Skeleton, SkeletonText, VStack, Heading } from "@chakra-ui/react";

const HomeSkeleton = () => {
    return (
        <Box
            position="relative"
            h="100vh"
            w="100%"
            bgImage="url('/path-to-your-background.jpg')"
            bgSize="cover"
            bgPos="center"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            _after={{
                content: '""',
                position: "absolute",
                inset: 0,
                bg: "blackAlpha.700",
            }}
        >
            <VStack spacing={10} zIndex={1}>
                <Skeleton>
                    <Heading
                        size="2xl"
                        color="teal.300"
                        textAlign="center"
                        border={"transparent"}
                        fontWeight="extrabold"
                    >
                        Find Movies
                    </Heading>
                </Skeleton>

                {/* Search bar */}
                <Box w={{ base: "430px", md: "1200px" }}>
                    <Skeleton
                        height="50px"
                        borderRadius="full"
                        startColor="gray.600"
                        endColor="gray.400"
                    />
                </Box>

                {/* Button */}
                <Skeleton
                    height="45px"
                    w={"250px"}
                    borderRadius="full"
                    startColor="blue.500"
                    endColor="blue.300"
                />
            </VStack>
        </Box>
    );
};

export default HomeSkeleton;
