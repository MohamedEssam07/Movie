import { useState } from "react";
import {
    Button,
    Box,
    VStack,
    ScaleFade,
    HStack,
    ModalOverlay,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    ModalFooter,
} from "@chakra-ui/react";

interface IProps {
    imdbId: string | null;
    homepage?: string;
}

export default function WatchNowToggle({ imdbId, homepage }: IProps) {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(4px) hue-rotate(90deg)'
        />
    )
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)



    return (

        <>
            <Button
                w="full"
                variant="solid"
                bgGradient="linear(to-r, blue.400, blue.600)"
                _hover={{
                    bgGradient: "linear(to-r, blue.500, blue.700)",
                    transform: "scale(1.05)",
                }}
                color="white"
                borderRadius="full"
                size="lg"

                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            >
                Watch Now
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    bg="blackAlpha.900" // solid dark
                />
                <ModalContent
                    borderRadius="2xl"
                    p={6}
                    bgGradient="linear(to-br, #0f111a, #12141f)" // simple gradient
                    boxShadow="xl"
                    border="1px solid rgba(255,255,255,0.05)"
                >
                    <ModalHeader
                        textAlign="center"
                        fontSize="2xl"
                        fontWeight="extrabold"
                        color="teal.300"
                        textShadow="0 0 5px #14b8a6, 0 0 10px #14b8a6"
                    >
                        🎬 Watch Options
                    </ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody display="flex" justifyContent="center" ml={"20px"} alignItems={"center"} gap={4} mt={4}>
                        <Button
                            as="a"
                            href={`https://www.imdb.com/title/${imdbId}`}
                            bgGradient="linear(to-r, yellow.400, yellow.300)"
                            color="black"
                            _hover={{
                                transform: "scale(1.08)",
                                boxShadow: "0 0 15px yellow",
                                willChange: "transform"
                            }}
                            borderRadius="xl"
                            fontWeight="bold"
                            size="lg"
                            target="_blank"
                            onClick={onClose}
                        >
                            IMDB
                        </Button>
                        <Button
                            as="a"
                            href={homepage}
                            bgGradient="linear(to-r, red.500, red.400)"
                            color="white"
                            _hover={{
                                transform: "scale(1.08)",
                                boxShadow: "0 0 15px red",
                                willChange: "transform"
                            }}
                            borderRadius="xl"
                            fontWeight="bold"
                            size="lg"
                            target="_blank"
                            onClick={onClose}
                        >
                            Netflix / Amazon
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>



        </>


    );
}
