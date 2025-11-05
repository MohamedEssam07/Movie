import {
    Box,
    Grid,
    HStack,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Stack,
} from "@chakra-ui/react"

const SearchSkeleton = () => {
    return (
        <>

            <Box
                overflowX={"hidden"}
                position="absolute"
                top={{ base: "120px", md: "60px" }}
                w={{ base: "250px", md: "400px" }}
                ml={{ base: "20px", md: "" }}
                borderRadius="md"
                zIndex={999}
                maxH="500px"
                overflowY="auto"
                boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
                bg="rgba(255, 255, 255, 0.08)"
                border="1px solid rgba(255, 255, 255, 0.18)"

                p={3}
            >
                {Array.from({ length: 5 }, (_: any, idx: number) => (
                    <Box display="flex" flexDirection="column" gap="10px">
                        <HStack w="full" alignItems="center" spacing={4}>
                            <SkeletonCircle size="10" />
                            <Box flex="1">
                                <Skeleton height="10px" mb="2" />
                                <Skeleton height="10px" width="80%" />
                            </Box>
                        </HStack>

                        <Skeleton height="200px" borderRadius="md" />
                    </Box>
                ))}
            </Box>


        </>
    )
}
export default SearchSkeleton
