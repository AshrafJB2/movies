import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetail.css';

const APIURl = `http://www.omdbapi.com/?apikey=c8b48bf`;

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMovieDetail() {
            try {
                const response = await fetch(`${APIURl}&i=${id}&plot=full`);
                const data = await response.json();
                
                if (data.Response === "True") {
                    setMovie(data);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                setLoading(false);
            }
        }
        
        fetchMovieDetail();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (!movie) return <div className="error">Movie not found</div>;

    return (
        <div className="movie-detail">
            <button className="back-button" onClick={() => navigate('/')}>← Back to Search</button>
            
            <div className="movie-detail-content">
                <div className="movie-poster">
                    <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/400'} alt={movie.Title} />
                </div>
                
                <div className="movie-info">
                    <h1>{movie.Title} <span>({movie.Year})</span></h1>
                    <div className="movie-meta">
                        <span>{movie.Rated}</span>
                        <span>{movie.Runtime}</span>
                        <span>{movie.Genre}</span>
                        <span>{movie.Released}</span>
                    </div>
                    
                    <div className="movie-rating">
                        <h3>IMDb Rating: {movie.imdbRating}/10</h3>
                    </div>
                    
                    <div className="movie-plot">
                        <h3>Plot</h3>
                        <p>{movie.Plot}</p>
                    </div>
                    
                    <div className="movie-credits">
                        <p><strong>Director:</strong> {movie.Director}</p>
                        <p><strong>Writer:</strong> {movie.Writer}</p>
                        <p><strong>Actors:</strong> {movie.Actors}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}