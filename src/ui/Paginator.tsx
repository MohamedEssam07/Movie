import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { HStack, Button, VStack, useBreakpointValue } from "@chakra-ui/react";
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
    const showText = useBreakpointValue({ base: false, md: true }) ?? true;
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

                <HStack spacing={{ base: 3, md: 3 }} justify="center" w="100%" mt={6} >
                    <Button
                        colorScheme="blue"
                        borderRadius={"full"}
                        variant="ghost"
                        onClick={() => {
                            onClickStart();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        display={page === 1 ? "none" : "flex"}
                        aria-label="First page"
                        size={{ base: "md", md: "md" }}
                    >
                        <ArrowLeftIcon />
                    </Button>

                    <Button
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => {
                            onClickPrev();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={page === 1 || isLoading}
                        size={{ base: "md", md: "md" }}
                        aria-label="Previous page"
                        leftIcon={showText ? <FaArrowLeft /> : undefined}
                    >
                        {showText ? "Prev" : <ArrowLeftIcon />}
                    </Button>


                    {/*  */}
                    {pages.map((item) => (
                        <Button variant={"outline"}
                            borderRadius={"full"}
                            h={{ base: "48px", md: "60px" }}
                            w={{ base: "48px", md: "60px" }}
                            minW={{ base: "48px", md: "60px" }}
                            onClick={() => {
                                onClickPage(item)
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                            }
                            disabled={isLoading}
                            bg={item === page ? "blue.200" : ""}
                            fontSize={{ base: "md", md: "md" }}

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
                        size={{ base: "md", md: "md" }}
                        aria-label="Next page"
                        rightIcon={showText ? <FaArrowRight /> : undefined}
                    >
                        {showText ? "Next" : <ArrowRightIcon />}
                    </Button>


                    <Button 
                        colorScheme="blue" 
                        borderRadius={"full"} 
                        variant="ghost"
                        onClick={() => {
                            onClickEnd(total_pages)
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        display={page === total_pages ? "none" : "flex"}
                        aria-label="Last page"
                        size={{ base: "md", md: "md" }}
                    >
                        <ArrowRightIcon />
                    </Button>
                </HStack>
            </VStack >
        </>
    );
};

export default Paginator;