import { useLocation, useParams } from "react-router";
import { useGetMovieDetailsQuery } from "../app/services/apiSlice";
import ViewMoiveCard from "../components/ViewMovieCard";
import { Box } from "@chakra-ui/react";
import AnimatedCards from "../ui/AnimatedCards";
import MoviePageSkeleton from "../ui/ViewMovieTvCard";

interface IProps {

}
const ViewMovie = ({ }: IProps) => {
    const { id } = useParams()
    const { pathname } = useLocation()
    console.log(pathname)

    const { data, isLoading } = useGetMovieDetailsQuery(id)
    if (isLoading) return <MoviePageSkeleton />;
    if (!data) return <p>No data found</p>;

    return (
        <Box minH="100vh" mt="0" overflowX="hidden">
            <ViewMoiveCard movieInfo={data} />
            <Box mt={"30px"} display={"flex"} justifyContent={"center"} alignItems={"center"} minH="auto" pb={10}>

                <AnimatedCards id={id} />

            </Box>
        </Box>
    );
};

export default ViewMovie;