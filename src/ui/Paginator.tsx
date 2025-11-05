import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { HStack, Button, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
interface IProps {
    onClickNext: () => void
    onClickPrev: () => void
    onClickStart: () => void
    onClickEnd: (rPage: number) => void
    page: number
    total_pages: number
    total_results: number
    isLoading?: boolean
    onClickPage: (item: number) => void;
}


const Paginator = ({ onClickPrev, onClickEnd, onClickPage, onClickStart, onClickNext, page, total_pages, total_results, isLoading }: IProps) => {
    //new paginator
    const total = Math.min(total_pages, 500);
    const windowSize = 3
    const [currentPage, setCurrentPage] = useState(page)
    const start = Math.max(1, currentPage - 1)
    const end = Math.min(total, start + windowSize - 1)
    const pages = []
    for (let i = start; i <= end; i++) {
        pages.push(i)

    }
    useEffect(() => {
        setCurrentPage(page);
    }, [page]);


    console.log({ page, total_pages, total_results })
    return (
        <>



            <VStack overflowX={"hidden"} mb={"50px"}>

                <HStack spacing={3} justify="center" ml={{ base: "10px", md: "60px" }} mt={6} >
                    <Button
                        colorScheme="blue"
                        borderRadius={"full"}
                        variant="link"
                        onClick={() => {
                            onClickStart();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        display={page === 1 ? "none" : "block"}
                        leftIcon={<ArrowLeftIcon />}

                    >

                    </Button>

                    <Button
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => {
                            onClickPrev();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={page === 1 || isLoading}
                        leftIcon={<FaArrowLeft />}
                    >
                        Prev
                    </Button>


                    {/*  */}
                    {pages.map((item) => (
                        <Button variant={"outline"}
                            borderRadius={"full"}
                            h={"60px"}
                            onClick={() => {
                                onClickPage(item)
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                            }
                            disabled={isLoading}
                            bg={item === page ? "blue.200" : ""}

                        >
                            {item}
                        </Button>
                    ))}


                    {/*  */}
                    <Button
                        colorScheme="blue"
                        onClick={() => {
                            onClickNext();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={page === total || isLoading}
                        rightIcon={<FaArrowRight />}
                    >
                        Next
                    </Button>


                    <Button colorScheme="blue" borderRadius={"full"} variant="link"
                        onClick={() => {
                            onClickEnd(total_pages)
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                        } display={page === total_pages ? "none" : "block"}
                        leftIcon={<ArrowRightIcon />}
                    > </Button>
                </HStack>
            </VStack >
        </>
    );
};

export default Paginator;