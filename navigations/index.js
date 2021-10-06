// main pages
const pages = {
    // stacks
    HOME: "Home",
    POPULAR_MOVIES: "Popular Movies",
    MOVIE_DETAIL: "Movie Detail",
    DISCOVER: "Discover",
    // tabs
    TAB_HOME: "Tab-Home",
    TAB_POPULAR: "Tab-Popular",
    TAB_DISCOVER: "Tab-Discover"
}
const MAIN_PAGES = [pages.HOME, pages.POPULAR_MOVIES, pages.DISCOVER]
// utility, check if page is main page
export const isMain = (page) => {
    return MAIN_PAGES.includes(page)
} 

export default pages