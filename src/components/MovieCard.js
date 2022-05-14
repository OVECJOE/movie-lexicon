import React from 'react';
import CoverPhoto from '../images/moviecover.jpg';

export default function MovieCard({ result, queryType }) {
    const keys = Object.keys(result);
    const flag = (key) => ['Poster', 'Title', 'imdbID', 'Plot']
        .every(e => e !== key);

    return (
        <div className="movie-card">
            <div className="poster">
                <img src={result.Poster !== 'N/A' ? result.Poster : CoverPhoto}
                    alt={result.Title} />
            </div>
            <div className='movie-info'>
                <h2 className='title'>{result.Title}</h2>
                <div className='movie-specifics'>
                    {queryType !== 't' ?
                        keys.filter(key => result[key] && flag(key)).map(key => {
                            return <span key={key}>
                                <strong>{key}:</strong> {result[key]}
                            </span>
                        }) : <>
                            <span className='year'><strong>Year:</strong> {result.Year}</span>
                            <span className='release-date'>
                                <strong>Release Date:</strong> <time>{result.Released}</time>
                            </span>
                            <span className='rated'><strong>Rated:</strong> {result.Rated}</span>
                            <span className='duration'><strong>Duration:</strong> {result.Runtime}</span>
                            <span className='writer'><strong>Writer:</strong> {result.Writer}</span>
                            <span className='actors'><strong>Actors:</strong> {result.Actors}</span>
                            <span className='genre'><strong>Genre:</strong> {result.Genre}</span>
                            <span className='country'><strong>Country:</strong> {result.Country}</span>
                            <span className='awards'><strong>Awards:</strong> {result.Awards}</span>
                            <span className='director'><strong>Director:</strong> {result.Director}</span>
                            <span className='language'><strong>Language:</strong> {result.Language}</span>
                            <span className='total-seasons'><strong>Total Seasons:</strong> {result.totalSeasons}</span>
                        </>
                    }
                </div>
                {<div className='plot'>
                    <h4>Description</h4>
                    {result.Plot ? <p>{result.Plot}</p> :
                        <p>
                            Need description? <strong>Search by title</strong> in the search page.
                        </p>
                    }
                </div>}
            </div>
        </div>
    )
}