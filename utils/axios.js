import axios from 'axios'

const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODg1NGMzMjUyNDcwZjk4NTRkOTU2NzFlMWJjODlhOSIsInN1YiI6IjYxNTY2ZWNlMDdlMjgxMDA0NDY0ZDhmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5h1bTh4v-4-RKkoxmG06J6VEHX8zgxoF_jnOImRD84I"

export const movies = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})