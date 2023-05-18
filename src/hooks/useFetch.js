import {useEffect, useState} from "react";
import httpRequest from "../httpRequest";

const useFetch = (url, method = "get", postData = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await httpRequest.request({
                    method,
                    url,
                    data: postData
                });
                setData(res.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
