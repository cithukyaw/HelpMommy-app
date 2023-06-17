import axios from "axios";
import {toast} from "react-toastify";
import config from "../config";

export const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        // Authorization: "bearer: " + process.env.REACT_APP_API_KEY,
    },
});

export const makeRequest = async (url, method = "get", postData = {}, callbacks = {}) => {
    if (callbacks.loading) {
        callbacks.loading(true);
    }

    let result;
    let error;

    try {
        const res = await httpRequest.request({ method, url, data: postData });
        result = res.data;
    } catch (err) {
        if (err.response?.status === 400) {
            // Handle 400
            console.log(err.response.data);
            error = err.response.data.error;
        } else {
            console.error(err);

            error = err;
            let msg = "Oops! Something's went wrong.";
            if (err) {
                msg += ` Error: ${err.message}`;
            }

            toast.error(msg, config.toastOptions);
        }
    }

    if (callbacks.loading) {
        callbacks.loading(false);
    }

    return { result, error };

    // // The following is Promise based
    // return new Promise((resolve, reject) => {
    //     httpRequest.request({ method, url, data: postData })
    //         .then(res => {
    //             if (callbacks.loading) callbacks.loading(false);
    //             if (callbacks.result) callbacks.result(res.data);
    //
    //             resolve(res.data);
    //         }).catch(err => {
    //             if (callbacks.loading) callbacks.loading(false);
    //
    //             let errors = err;
    //             if (err.response?.status === 400) {
    //                 // Handle 400
    //                 console.log(err.response.data);
    //                 errors = err.response.data;
    //             } else {
    //                 let msg = "Oops! Something's went wrong.";
    //                 if (err) {
    //                     msg += ` Error: ${err.message}`;
    //                 }
    //
    //                 toast.error(msg, {
    //                     position: "top-center",
    //                     theme: "dark",
    //                 });
    //             }
    //
    //             if (callbacks.error) callbacks.error(errors);
    //             reject(err);
    //         });
    // });
};
