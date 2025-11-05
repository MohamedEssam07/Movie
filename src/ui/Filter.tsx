// @ts-nocheck
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, ButtonGroup, Checkbox, HStack, Radio, RadioGroup, Stack, Text, useColorMode } from '@chakra-ui/react'
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { FaFilter } from "react-icons/fa6";
import { useAppDispatch } from '../app/store';
import { deleteFilterItems, setFilterItems } from '../app/features/filterSlice';
import { useNavigate } from 'react-router';

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
    const { colorMode } = useColorMode()
    return (
        <>
            <Accordion transform="translateY(60px)" allowToggle index={index} border="none" borderRadius="0">
                <AccordionItem borderRadius="0" border="none" >

                    <Box
                        _hover={{ bg: "transparent", boxShadow: "none" }}
                        ml={{ base: "350px", md: "1400px" }}
                    >
                        <AccordionButton
                            _hover={{ bg: "transparent", boxShadow: "none" }} // هنا أهم حاجة
                            _focus={{ boxShadow: "none", bg: "transparent" }}
                        >
                            <Button

                                ml={{ base: "2px", md: "-35px" }}
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
                            as={"form"} onSubmit={onFilterHandler} p="50px" borderRadius="md" w={"97%"} mx={"auto"} ml={{ base: "", md: "15px" }}>
                            <RadioGroup onChange={setType} value={type}>
                                <Stack direction="row">
                                    <Text>Type: </Text>
                                    <HStack ml="38px">

                                        <Radio value="movie">Movies</Radio>
                                        <Radio value="tv">TV Shows</Radio>
                                    </HStack>
                                </Stack>
                            </RadioGroup>
                            <RadioGroup>
                                <Stack direction="row" mt="10px">

                                    <RadioGroup onChange={setYear} value={year}>
                                        <Stack direction="row" mt="10px" w={{ base: "300px", md: "full" }} flexWrap={{ base: "wrap", md: "wrap" }}>
                                            <Text>Released: </Text>
                                            {years.map((y, idx) => (
                                                <Box ml={{ base: "83px", md: "9px" }}>
                                                    <Radio key={idx} value={y}>
                                                        {y === "older" ? null : y}
                                                    </Radio>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </RadioGroup>

                                </Stack>
                            </RadioGroup>

                            <HStack spacing={7} mt="20px">
                                <Text>Genre: </Text>
                                <Box w="800px">
                                    {gen.map((item) => (
                                        <Checkbox
                                            key={item.id}
                                            px={"10px"}
                                            isChecked={genre.some((g) => g.gen.id === item.id)}
                                            onChange={(e) => handleGenreChange(e, item)}
                                        >
                                            {item.name}
                                        </Checkbox>
                                    ))}
                                </Box>
                            </HStack>

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




        </>
    );
};

export default Filter;