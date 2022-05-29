import React from 'react';
import AvatarCard from './AvatarCard';
import QueryBox from './QueryBox';
import ResultBox from './ResultBox';
import getRequestUrl from '../utilities/getRequestUrl';
import setRequestUrl from '../utilities/setRequestUrl';

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
    const [numberOfPages, setNumberOfPages] = React.useState(0);
    const [pageNum, setPageNum] = React.useState(0);

    const handleFilterChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFilterData((oldFilterData) => {
            return {
                ...oldFilterData,
                [name]: type === 'checked' ? checked : value
            };
        })
    };

    const query_type = () => filterData.searchBy === 'title' ? 't' : 's';

    React.useEffect(() => {
        requestedUrls.length &&
            fetch(requestedUrls[0]).then(res => res.json())
                .then(movieData => setResult(movieData))
    }, [requestedUrls]);

    React.useEffect(() => {
        setNumberOfPages(Math.floor(result.totalResults/10));
        setPageNum(2);
    }, [result.totalResults]);

    React.useEffect(() => {
        setInvalidQuery(false)
    }, [props.isResultAvailable])

    function applyFilter(event) {
        if ((event.type === 'keydown' && event.code !== 'Enter')
            && event.type !== 'click')
            return;

        result && setResult({});
        
        const api_request_url = getRequestUrl(filterData, query_type());
        if (api_request_url) {
            setRequestUrl(api_request_url, setRequestedUrls);
            setQueryType(query_type);

            // setFilterData(defaultFilter());
            props.changeResultReady();
        } else {
            setInvalidQuery(true);
        }
    }

    function showMore() {
        if (numberOfPages > 1) {
            props.toggleMore(true);
        } else {
            props.toggleMore(false);
            return;
        }

        setNumberOfPages(prevNumberOfPages => prevNumberOfPages - 1);
        setPageNum(prevPageNum => prevPageNum + 1);

        const api_request_url = getRequestUrl(filterData, queryType, pageNum);
        if (api_request_url) {
            setRequestUrl(api_request_url, setRequestedUrls)
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
                        setResult={setResult}
                        changeResultReady={props.changeResultReady}
                        queryType={queryType}
                        numberOfPages={numberOfPages}
                        showMore={() => showMore(pageNum)}
                        query_type={query_type}
                        more={props.more}
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