import { useParams } from "react-router";
import { useGetTvDetailsQuery } from "../app/services/apiSlice";

import { Box } from "@chakra-ui/react";
import ViewTvCard from "../components/ViewTvCard";

import AnimatedCards from "../ui/AnimatedCards";
import MoviePageSkeleton from "../ui/ViewMovieTvCard";

interface IProps {

}
const ViewTv = ({ }: IProps) => {
    const { id } = useParams()


    const { data, isLoading } = useGetTvDetailsQuery(id)
    if (isLoading) return <MoviePageSkeleton />;
    if (!data) return <p>No data found</p>;
    return (
        <Box h={"100vh"} mt={"-60px"} >
            <ViewTvCard movieInfo={data} />
            <Box mt={"30px"} display={"flex"} justifyContent={"center"} alignItems={"center"} h={"90vh"}>

                <AnimatedCards id={id} />

            </Box>
        </Box>

    );
};

export default ViewTv;