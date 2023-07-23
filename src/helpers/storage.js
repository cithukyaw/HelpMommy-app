import {CryptoJsAesDecrypt, CryptoJsAesEncrypt, decode2json} from "./common";

export const storeItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = key => {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
};

export const removeItem = key => {
    localStorage.removeItem(key);
};

export const storeItemEncrypted = (key, value) => {
    if (typeof value === "string") {
        value = decode2json(value);
    }

    value = CryptoJsAesEncrypt(value);
    localStorage.setItem(key, value);
};

export const getItemDecrypted = key => {
    const value = localStorage.getItem(key);

    return value ? CryptoJsAesDecrypt(value) : null;
};
