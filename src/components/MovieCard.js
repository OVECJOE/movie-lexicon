import React from 'react';
import CoverPhoto from '../images/moviecover.jpg';

export default function MovieCard({ result, queryType }) {
    const excludedKeys = ['Poster', 'Title', 'imdbID', 'Plot', 'Response'];
    const flag = (result, key) => excludedKeys.every(e => e !== key) &&
    result[key] && result[key] !== 'N/A' && typeof result[key] === 'string';

    const movieSpecificsElements = (result) => {
        const keys = Object.keys(result);

        return keys.filter(key => flag(result, key)).map(key => {
                return <span key={key}>
                    <strong>{key}:</strong> {result[key]}
                </span>
            })
    }

    return (
        <div className="movie-card">
            <div className="poster">
                <img src={result.Poster !== 'N/A' ? result.Poster : CoverPhoto}
                    alt={result.Title} />
            </div>
            <div className='movie-info'>
                <h2 className='title'>{result.Title}</h2>
                <div className='movie-specifics'>
                    {movieSpecificsElements(result)}
                </div>
                {<div className='plot'>
                    <h4>Description</h4>
                    {result.Plot === 'N/A' ? <p>Not Available</p> :
                        result.Plot ?
                        <p>{result.Plot}</p> :
                        <p>
                            Need description? <strong>Search by title</strong> in the search page.
                        </p>
                    }
                </div>}
            </div>
        </div>
    )
}