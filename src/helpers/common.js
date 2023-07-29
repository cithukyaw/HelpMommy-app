import {getItemDecrypted} from "./storage";
import config from "../config";
import CryptoJS from "crypto-js";

export const getConfig = () => {
    const setting = getItemDecrypted(config.settingStoreKey);
    if (setting) {
        return { ...config, ...setting };
    }

    return config;
};

export const decode2json = str => {
    str = str.substring(16); // trim the first 16 chars
    const value = atob(str); // base64decode
    return JSON.parse(value);
};

export const CryptoJsAesEncrypt = data => {
    const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        process.env.REACT_APP_SECRET
    );

    return encrypted.toString();
};

export const CryptoJsAesDecrypt = data => {
    const bytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_SECRET);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const checkRedeem = user => {
    const redeem = decode2json(user.status);

    return !!redeem.id; // redeem.id ? true : false;
};