import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: "bearer: " + process.env.REACT_APP_API_KEY,
    },
});

export default httpRequest;
