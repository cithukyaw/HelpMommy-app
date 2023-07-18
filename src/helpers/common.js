import {getItem} from "./storage";
import config from "../config";

export const getConfig = () => {
    const setting = getItem(config.settingStoreKey);
    if (setting) {
        return { ...config, ...setting };
    }

    return config;
};
