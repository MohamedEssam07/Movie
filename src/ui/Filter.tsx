// @ts-nocheck
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, ButtonGroup, Checkbox, HStack, Radio, RadioGroup, Stack, Text, useColorMode, VStack } from '@chakra-ui/react'
import { useState, type ChangeEvent, type FormEvent, useEffect } from 'react';
import { FaFilter } from "react-icons/fa6";
import { useAppDispatch } from '../app/store';
import { deleteFilterItems, setFilterItems } from '../app/features/filterSlice';
import { useNavigate, useLocation } from 'react-router';

interface IProps {

}
interface IGen {
    gen: { name: string, id: number }
}
const Filter = ({ }: IProps) => {


    const gen = [
        { name: "Action", id: 28 },
        { name: "Adventure", id: 12 },
        { name: "Animation", id: 16 },
        { name: "Comedy", id: 35 },
        { name: "Crime", id: 80 },
        { name: "Documentary", id: 99 },
        { name: "Drama", id: 18 },
        { name: "Family", id: 10751 },
        { name: "Fantasy", id: 14 },
        { name: "History", id: 36 },
        { name: "Horror", id: 27 },
        { name: "Music", id: 10402 },
        { name: "Mystery", id: 9648 },
        { name: "Romance", id: 10749 },
        { name: "ScienceFiction", id: 878 },
        { name: "TVMovie", id: 10770 },
        { name: "Thriller", id: 53 },
        { name: "War", id: 10752 },
        { name: "Western", id: 37 },
    ];

    const years = ["2025", "2024", "2023", "2022", "2021", "Older"]
    const [type, setType] = useState("")
    const [year, setYear] = useState("")
    const [genre, setGenre] = useState<IGen[]>([])
    const disptach = useAppDispatch()

    const onTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value)
    }
    const onYearHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setYear(e.target.value)
    }

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>, item: { name: string, id: number }) => {
        const isChecked = e.target.checked;

        setGenre((prev) => {
            if (isChecked) {
                return [...prev, { gen: item }];
            } else {
                return prev.filter((g) => g.gen.id !== item.id);
            }
        });
    };

    const onFilterHandler = (e: FormEvent) => {
        e.preventDefault()
        disptach(setFilterItems({ type, year, genre }))
    }

    //
    const [index, setIndex] = useState(-1)
    const nav = useNavigate()
    const { pathname } = useLocation()
    const { colorMode } = useColorMode()
    return (
        <>
            { /* reset local and global filter state on route change */ }
            { /* ensures filter starts from 0 every time */ }
            <ResetOnRoute pathname={pathname} onReset={() => {
                setType("")
                setYear("")
                setGenre([])
                disptach(deleteFilterItems())
            }} />
            <Box w="100%">
            <Accordion allowToggle index={index} border="none" borderRadius="0" w="100%">
                <AccordionItem borderRadius="0" border="none" >

                    <Box _hover={{ bg: "transparent", boxShadow: "none" }} display="flex" justifyContent="flex-end">
                        <AccordionButton
                            w="auto"
                            px={0}
                            _hover={{ bg: "transparent", boxShadow: "none" }} // هنا أهم حاجة
                            _focus={{ boxShadow: "none", bg: "transparent" }}
                        >
                            <Button
                                ml={0}
                                borderRadius="md"
                                bg={colorMode === "light" ? "blue.500" : "rgba(19, 19, 19, 0.08)"}
                                boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                                border="1px solid rgba(255, 255, 255, 0.18)"
                                color="white"
                                _hover={{
                                    bg: "rgba(19, 19, 19, 0.15)",
                                    transform: "scale(1.05)",
                                    boxShadow: "none", // منع أي ظل جديد
                                }}
                                onClick={() => {
                                    index === 0 ? setIndex(-1) : setIndex(0);
                                }}
                                display="flex"
                                alignItems="center"
                                gap={2}
                            >
                                <FaFilter />
                                <Box as="span">Filter</Box>
                            </Button>
                        </AccordionButton>
                    </Box>



                    <AccordionPanel
                        
                        pb={4}
                        borderRadius="0"
                        transition="all 0.4s ease-in-out"
                        sx={{
                            "&": {
                                transformOrigin: "top",
                                animation: "accordionFade 0.4s ease",
                            },
                            "@keyframes accordionFade": {
                                from: { opacity: 0, transform: "translateY(-10px)" },
                                to: { opacity: 1, transform: "translateY(0)" },
                            },
                        }}
                    >
                        <Box
                            bg={colorMode === "dark" ? "rgba(19, 19, 19, 0.08)" : "gray.50"}
                            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                            border="1px solid rgba(255, 255, 255, 0.18)"
                            as={"form"} onSubmit={onFilterHandler}
                            p={{ base: 5, md: 8 }}
                            borderRadius="md"
                            position={{ base: "static", md: "static" }}
                            w={{ base: "100%", md: "100%" }}
                        >
                            <VStack align="flex-start" spacing={{ base: 3, md: 4 }} w="100%">
                                <RadioGroup onChange={setType} value={type}>
                                    <HStack spacing={{ base: 2, md: 4 }} align="flex-start" flexWrap="wrap">
                                        <Text fontWeight="semibold" minW={{ base: "70px", md: "80px" }} fontSize={{ base: "sm", md: "md" }}>Type:</Text>
                                        <HStack spacing={{ base: 3, md: 4 }} flexWrap="wrap">
                                            <Radio value="movie" whiteSpace="nowrap">Movies</Radio>
                                            <Radio value="tv" whiteSpace="nowrap">TV Shows</Radio>
                                        </HStack>
                                    </HStack>
                                </RadioGroup>

                                <RadioGroup onChange={setYear} value={year}>
                                    <HStack spacing={{ base: 2, md: 4 }} align="flex-start" flexWrap="wrap">
                                        <Text fontWeight="semibold" minW={{ base: "70px", md: "80px" }} fontSize={{ base: "sm", md: "md" }}>Released:</Text>
                                        <HStack spacing={{ base: 2, md: 4 }} flexWrap="wrap">
                                            {years.map((y, idx) => (
                                                <Radio key={idx} value={y} w="auto" whiteSpace="nowrap" fontSize={{ base: "sm", md: "md" }}>
                                                    {y === "Older" ? "Older" : y}
                                                </Radio>
                                            ))}
                                        </HStack>
                                    </HStack>
                                </RadioGroup>

                                <Box w="100%">
                                    <VStack align="flex-start" spacing={2} w="100%">
                                        <Text fontWeight="semibold" fontSize={{ base: "sm", md: "md" }}>Genre:</Text>
                                        <Box w="100%" display="grid" gridTemplateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(7, 1fr)" }} gap={{ base: 2, md: 3 }}>
                                            {gen.map((item) => (
                                                <Checkbox
                                                    key={item.id}
                                                    isChecked={genre.some((g) => g.gen.id === item.id)}
                                                    onChange={(e) => handleGenreChange(e, item)}
                                                    fontSize={{ base: "sm", md: "md" }}
                                                    whiteSpace="nowrap"
                                                >
                                                    {item.name}
                                                </Checkbox>
                                            ))}
                                        </Box>
                                    </VStack>
                                </Box>
                            </VStack>

                            <ButtonGroup spacing="10px" mt="20px">
                                <Button variant="outline" colorScheme="blue" type='submit'
                                    onClick={() =>
                                    (
                                        nav("/filterresultpage"),
                                        setIndex(-1)
                                    )
                                    }
                                >
                                    Filter
                                </Button>
                                <Button variant="outline" colorScheme="gray" onClick={() => (
                                    disptach(deleteFilterItems()),
                                    setIndex(-1),
                                    setType(""),
                                    setYear(""),
                                    setGenre([])
                                )
                                }>
                                    Clear
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion >
            </Box>




        </>
    );
};

export default Filter;
// helper component to trigger reset when pathname changes
function ResetOnRoute({ pathname, onReset }: { pathname: string, onReset: () => void }) {
    useEffect(() => {
        onReset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
    return null;
}