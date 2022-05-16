export default function getRequestUrl(filterData, query_type, pageNum) {
    const queryLen = filterData.queryString.length;
    const queryString = filterData.queryString[queryLen - 1] === ' ' ?
        filterData.queryString.substring(0, queryLen - 1) :
        filterData.queryString

    return (filterData.queryString && filterData.type) ?
        (`https://www.omdbapi.com/?
            ${query_type}=${queryString.split(" ").join("+")}
            &type=${filterData.type}${filterData.year.length === 4 ?
                `&y=${filterData.year}` : ''}${(query_type === 't' &&
                    filterData.plot) ? `&plot=${filterData.plot}` : ''}
            ${pageNum ? `&page=${pageNum}` : ''}
                &apikey=4d0d264`).replace(/\s/g, '') : undefined;
}
