import React from 'react';
import MovieCard from './MovieCard';

export default function ResultBox(props) {
    const result = props.result;

    const movieElements = (result.Response === 'False' ?
        <h1 className='error'>{result.Error}</h1> :
        props.queryType === 't' ? (
            <MovieCard
                result={result}
                queryType={props.queryType}
            />
        ) : (
            result.Search ? result.Search.map((movie) => {
                return <MovieCard
                    key={result.Search.indexOf(movie)}
                    result={movie}
                    queryType={props.queryType}
                />
            }) : <h1 className='error'>{result.Error}</h1>
        ))

    return (
        <>
            <div className="result-box">
                {movieElements}
                <div className='btns'>
                    {
                        (props.more && props.query_type() === 's') &&
                        <button onClick={props.showMore}>
                            View More <i className="fa-solid fa-caret-down"></i>
                        </button>
                    }
                    <button onClick={props.changeResultReady}>
                        Go Back to Search Page
                    </button>
                </div>
            </div>
            <footer>

            </footer>
        </>
    )
}