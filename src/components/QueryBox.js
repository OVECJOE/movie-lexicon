import React from 'react';
import FilterBox from './FilterBox';

export default function QueryBox(props) {
    return (
        <div className="query-form">
            <FilterBox
                filterData={props.filterData}
                handleFilterChange={props.handleFilterChange}
                applyFilter={props.applyFilter}
            />
            <div className='input-query'>
                <input
                    type="text"
                    name="queryString"
                    onChange={props.handleFilterChange}
                    value={props.filterData.queryString}
                    placeholder={`Enter ${props.filterData.searchBy === "keyword" ?
                        "Keyword" : props.filterData.searchBy === "title" ?
                            "Title" : "Keyword or Title"
                        }`}
                    required
                    onKeyDown={props.applyFilter}
                />
            </div>
            {props.invalidQuery && 
            <div className='error'>
                No query string entered or no type selected!
                
            </div>
            }
        </div>
    )
}