import { StarIcon } from '@chakra-ui/icons';
import {
    Box, Flex, VStack, HStack, Heading, Text, Button, IconButton,
    Input, InputGroup, InputLeftElement, Image, Avatar, Link,
    Card,
    CardBody,
    ButtonGroup,
    Skeleton,
    SkeletonCircle,
    SkeletonText
} from '@chakra-ui/react';
import FancyText from './FancyText';
import WatchNowToggle from './WatchNowDropdown';


function MoviePageSkeleton() {
    return (
        <Box display="flex" flexWrap="wrap"
            mt={"60px"}

            flexDir={{ base: "column", md: "row" }} // عمودي على الموبايل، أفقي على md وفوق
            gap={{ base: 6, md: 20 }} // مسافة أصغر على الموبايل
            mx={{ base: 4, md: 0 }} // مسافة أفقية صغيرة على الموبايل
            alignItems="center"
            justifyContent={{ base: "", md: "space-evenly" }}
            w="full"
        >
            {/* Left Card */}
            <Card
                flexShrink={0}
                maxW={{ base: "full", md: "md" }}
                bg="transparent"
                color="white"
                borderRadius="none"
                boxShadow="none"
                overflow="hidden"
            >
                <CardBody
                    display="flex"
                    flexDirection="column"
                    gap={6}
                    textAlign={{ base: "center", md: "left" }}
                >
                    <Skeleton height="40px" width="70%" mb={4} /> {/* Title */}
                    <SkeletonText noOfLines={4} spacing="4" />     {/* Overview */}
                    <ButtonGroup w="full" display="flex" gap="4">
                        <Skeleton height="50px" w="full" borderRadius="full" />
                        <Skeleton height="50px" w="full" borderRadius="full" />
                        <Skeleton height="50px" w="full" borderRadius="full" />

                    </ButtonGroup>

                    <HStack spacing={4} wrap="wrap">
                        {[...Array(3)].map((_, idx) => (
                            <VStack key={idx} w="120px" alignItems="center" spacing={1}>
                                <SkeletonCircle size="120px" />
                                <Skeleton height="40px" w="full" />
                            </VStack>
                        ))}
                    </HStack>
                </CardBody>
            </Card>

            {/* Right Card */}
            <Card
                flexShrink={0}
                w={{ base: "100%", md: "35%" }}
                bg="gray.800"
                color="white"
                h={{ base: "550px", md: "620px" }}
                overflow="hidden"
                boxShadow="xl"
                ml={{ base: "", md: "40px" }}

                mt={{ base: "50px", md: "" }}
                maxW={{ base: "full", md: "sm" }}
            >
                <Skeleton height="100%" w="100%" />
            </Card>
        </Box>
    );
}
export default MoviePageSkeleton;