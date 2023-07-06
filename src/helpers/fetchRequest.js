import {toast} from "react-toastify";
import config from "../config";

export const requestOptions = {
    method: "GET",
    cache: "no-cache",
    // mode: "no-cors",
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "X-Api-Key": process.env.REACT_APP_API_KEY,
    },
};

export const sendRequest = async (url, method = "get", data = null) => {
    let result, error;
    const options = requestOptions;
    options.method = method.toUpperCase();
    options.body = data ? JSON.stringify(data) : null;

    try {
        const response = await fetch(process.env.REACT_APP_API_URL + url, options);
        result = await response.json();

        if (response.status === 400) { // Handle validation error
            error = result.error;
            result = null;
        }
    } catch (error) {
        console.error("Error:", error);

        let msg = "Oops! Something's went wrong.";
        if (error) {
            msg += ` Error: ${error.message}`;
        }

        toast.error(msg, config.toastOptions);
    }

    // console.log(result, error);

    return { result, error };
};
