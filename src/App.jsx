import './App.css'
import SearchIcon from './assets/search.svg'
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieCard from "./moviecard";
import MovieDetail from "./MovieDetail";

const APIURl = `http://www.omdbapi.com/?i=tt3896198&apikey=c8b48bf`

function SearchPage() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    async function movieSearch(title) {
        const response = await fetch(`${APIURl}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
    
    useEffect(() => {
        movieSearch('spiderman');
    }, []);

    const handleKeyPress = () => {
        movieSearch(searchTerm);
        setSearchTerm("");
    };
    
    return (
        <div className="app">
            <h1>Movies</h1>
            <div className="search">
                <input
                    placeholder="search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && searchTerm.trim().length > 0) {
                            handleKeyPress();
                        }
                    }}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => movieSearch(searchTerm)}
                />
            </div>
            <div className="container">
                {
                    movies?.length > 0 ? (
                        movies.map((movie) => <MovieCard movie={movie} key={movie.imdbID}/>)
                    ) : (
                        <div className="empty">
                            <h2>No Movies Found</h2>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
        </Router>
    );
}

