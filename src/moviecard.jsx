import { useNavigate } from 'react-router-dom';

export default function MovieCard({movie}) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/movie/${movie.imdbID}`);
    };
    
    return (
        <div className="movie" onClick={handleClick}>
            <div><p>{movie.Year}</p></div>
            <div><img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/400'} alt={movie.title} /></div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    )
}
