import { Box, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const ImageSkeleton = () => {

    return (
        <Box
            w="full"
            h="350px"
            bg="gray.700"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
        >
            <Text fontSize="lg" color="gray.400">
                No Image
            </Text>
        </Box>
    );
};

export default ImageSkeleton;
