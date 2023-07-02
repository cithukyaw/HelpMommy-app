import {useEffect, useState} from "react";
import {sendRequest} from "../helpers/fetchRequest";

const useFetch = (url, method = "get", postData = null) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const {result, error} = await sendRequest(url, method, postData);
            if (result) {
                setResult(result);
            }
            if (error) {
                setError(error);
            }

            setLoading(false);
        };

        fetchData();
    }, [url]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         try {
    //             const res = await httpRequest.request({
    //                 method,
    //                 url,
    //                 data: postData
    //             });
    //             setResult(res.data);
    //         } catch (err) {
    //             setError(err.response);
    //
    //             let msg = "Oops! Something's went wrong.";
    //             if (err) {
    //                 msg += ` Error: ${err.message}`;
    //             }
    //
    //             toast.error(msg, config.toastOptions);
    //         }
    //         setLoading(false);
    //     };
    //
    //     fetchData();
    // }, [url]);

    return { result, loading, error };
};

export default useFetch;
