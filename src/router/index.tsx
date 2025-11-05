import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { lazy } from "react";

// Lazy imports
const HomePage = lazy(() => import("../pages/HomePage"));
const SecondLayout = lazy(() => import("../Layouts.tsx/SecondLayout"));
const ViewMovie = lazy(() => import("../pages/ViewMovie"));
const Movies = lazy(() => import("../pages/Movies"));
const FavouritePage = lazy(() => import("../pages/FavouritePage"));
const TrendingPage = lazy(() => import("../pages/TrendingPage"));
const TopImdbPage = lazy(() => import("../pages/TopImdb"));
const GenreMovies = lazy(() => import("../pages/GenreMovies"));
const GenrePage = lazy(() => import("../pages/GenrePage"));
const ViewTv = lazy(() => import("../pages/ViewTv"));
const FilterResultPage = lazy(() => import("../pages/FilterResultPage"));
const Tv = lazy(() => import("../pages/Tv"));
const IntroPage = lazy(() => import("../pages/IntroPage"));
const FirstLayout = lazy(() => import("../Layouts.tsx/FirstLayout"));
const LoginPage = lazy(() => import("../Validation/LoginPage"));
const ValidationLayout = lazy(() => import("../Layouts.tsx/ValidationLayout"));
const Search = lazy(() => import("../pages/Search"));
const HomeSearchResult = lazy(() => import("../pages/HomeSearchResult"));
const HomeLayout = lazy(() => import("../Layouts.tsx/HomeLayout"));

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" >
                {/* first root */}
                <Route path="/" element={<FirstLayout />}>
                    <Route index element={<IntroPage />} />
                </Route>

                {/* Home Root */}
                <Route path="/home" element={<HomeLayout />}>
                    <Route index element={<HomePage />} />
                </Route>

                {/* second root */}
                <Route path="/" element={<SecondLayout />}>
                    <Route path="movies" element={<Movies />} />
                    <Route path="tv" element={<Tv />} />
                    <Route path="filterresultpage" element={<FilterResultPage />} />
                    <Route path="genre" element={<GenrePage />}>
                        <Route path=":id" element={<GenreMovies />} />
                    </Route>
                    <Route path="movies/:id" element={<ViewMovie />} />
                    <Route path="tv/:id" element={<ViewTv />} />
                    <Route path="favourites" element={<FavouritePage />} />
                    <Route path="trending" element={<TrendingPage />} />
                    <Route path="topimdb" element={<TopImdbPage />} />
                    <Route path="search" element={<Search />}>
                        <Route path=":input" element={<HomeSearchResult />} />
                    </Route>
                </Route>

                {/* third root */}
                <Route path="/" element={<ValidationLayout />}>
                    <Route path="login" element={<LoginPage />} />

                </Route>
            </Route>
        </>
    )
);

export default router;
