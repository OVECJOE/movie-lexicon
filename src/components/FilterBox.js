import React from 'react';

export default function FilterBox({filterData, handleFilterChange, applyFilter}) {
    return (
        <div className="filter-box">
            <div className='filter-header'>
                <h3 className='title'>FilterBox</h3>
                <button onClick={applyFilter}>Apply Filter</button>
            </div>
            <form className='filter-form'>
                <div className='search-by'>
                    <label htmlFor='searchBy'>
                        Search By
                    </label>
                    <select
                        id='searchBy'
                        value={filterData.searchBy}
                        onChange={handleFilterChange}
                        name='searchBy'
                    >
                        <option value=''>Choose &#x23EC;</option>
                        <option value='keyword'>Keyword</option>
                        <option value='title'>Title</option>
                    </select>
                </div>
                <div className='year-box'>
                    <label htmlFor='year'>Year</label>
                    <input
                        type="number"
                        placeholder='Format: yyyy'
                        onChange={handleFilterChange}
                        name="year"
                        value={filterData.year}
                        className='filter-input'
                    />
                </div>
                <div className='plot-box'>
                    <label htmlFor="plot">Plot</label>
                    <select
                        id="plot"
                        value={filterData.plot}
                        onChange={handleFilterChange}
                        name="plot"
                    >
                        <option value="">Choose &#x23EC;</option>
                        <option value="full">Full</option>
                        <option value="short">Short</option>
                    </select>
                </div>
                <div className='type-box'>
                    <label htmlFor="type">Type</label>
                    <select
                        id="type"
                        value={filterData.type}
                        onChange={handleFilterChange}
                        name="type"
                        required
                    >
                        <option value="">Choose &#x23EC;</option>
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                        <option value="episode">Episode</option>
                    </select>
                </div>
            </form>
        </div>
    )
}