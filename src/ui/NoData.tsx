import { WarningTwoIcon } from "@chakra-ui/icons";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

interface IProps {

}
const NoData = ({ }: IProps) => {
    const nav = useNavigate()
    return (
        <>
            <Flex gap={"10px"} flexDir="column" align="center" h={"70vh"} justify="center" mt="50px">
                <Icon as={WarningTwoIcon} boxSize={70} color="yellow.400" mb={2} />
                <Text fontSize="3xl" color="gray.400">
                    No data to show right now.
                </Text>
                <Button
                    variant="solid"
                    bgGradient="linear(to-r, red.500, red.700)"
                    boxShadow="0px 0px 20px rgba(254, 8, 0, 0.6)"
                    transition="all 0.5s ease"
                    _hover={{
                        bgGradient: "linear(to-r, red.500, red.700)",
                        transform: "scale(1.05)",
                        boxShadow: "0px 0px 20px rgba(163, 18, 2, 0.6)"
                    }}
                    color="white"
                    borderRadius="full"
                    size="lg"
                    mx={"auto"} w={"200px"} mt={"10px"}
                    onClick={() => nav(-1)} >Back</Button>
            </Flex>
        </>
    );
};

export default NoData;