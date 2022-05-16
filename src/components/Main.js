import React from 'react';
import AvatarCard from './AvatarCard';
import QueryBox from './QueryBox';
import ResultBox from './ResultBox';
import getRequestUrl from '../utilities/getRequestUrl';

export default function Main(props) {
    const defaultFilter = () => {
        return {
            queryString: "",
            searchBy: "",
            plot: "",
            type: "",
            year: ""
        }
    }

    const [filterData, setFilterData] = React.useState(defaultFilter());
    const [result, setResult] = React.useState({});
    const [requestedUrls, setRequestedUrls] = React.useState([]);
    const [queryType, setQueryType] = React.useState("");
    const [invalidQuery, setInvalidQuery] = React.useState(false);

    const handleFilterChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFilterData((oldFilterData) => {
            return {
                ...oldFilterData,
                [name]: type === 'checked' ? checked : value
            };
        })
    };

    React.useEffect(() => {
        requestedUrls.length &&
            fetch(requestedUrls[0]).then(res => res.json())
                .then(movieData => setResult(movieData))
    }, [requestedUrls]);

    React.useEffect(() => {
        setInvalidQuery(false)
    }, [props.isResultAvailable])

    function applyFilter(event) {
        if ((event.type === 'keydown' && event.code !== 'Enter')
            && event.type !== 'click')
            return;

        result && setResult({});
        const query_type = filterData.searchBy === 'title' ? 't' : 's';
        const api_request_url = getRequestUrl(filterData, query_type);
        if (api_request_url) {
            setRequestedUrls((prevUrls) => {
                return [
                    api_request_url,
                    ...prevUrls
                ]
            });
            setQueryType(query_type);

            setFilterData(defaultFilter());
            props.changeResultReady();
        } else {
            setInvalidQuery(true);
        }

    }

    return (
        <main>
            {
                !props.lookupActive ? (
                    <AvatarCard />
                ) : ((props.isResultAvailable && result) || props.navigatable) ? (
                    <ResultBox
                        requestedUrls={requestedUrls}
                        result={result}
                        changeResultReady={props.changeResultReady}
                        queryType={queryType}
                    />
                ) : (
                    <QueryBox
                        filterData={filterData}
                        handleFilterChange={handleFilterChange}
                        applyFilter={applyFilter}
                        requestedUrls={requestedUrls}
                        changeResultReady={props.changeResultReady}
                        isResultAvailable={props.isResultAvailable}
                        lookupActive={props.lookupActive}
                        result={result}
                        invalidQuery={invalidQuery}
                    />
                )
            }
        </main>
    )
}