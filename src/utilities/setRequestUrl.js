export default function setRequestUrl(request_url, setRequestedUrls) {
    setRequestedUrls((prevUrls) => {
        return [
            request_url,
            ...prevUrls
        ]
    });
}