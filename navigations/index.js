// main pages
const pages = {
    // stacks
    HOME: "Home",
    POPULAR_MOVIES: "Popular Movies",
    MOVIE_DETAIL: "Movie Detail",
    // tabs
    TAB_HOME: "Tab-Home",
    TAB_POPULAR: "Tab-Popular"
}
const MAIN_PAGES = [pages.HOME, pages.POPULAR_MOVIES]
// utility, check if page is main page
export const isMain = (page) => {
    return MAIN_PAGES.includes(page)
} 

export default pages