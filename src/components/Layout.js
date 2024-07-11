import {ToastContainer} from "react-toastify";
import {Outlet} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {getItemDecrypted, storeItemEncrypted} from "../helpers/storage";
import config from "../config";

const loadSetting = () => {
    const { result } = useFetch("settings");
    if (result) {
        storeItemEncrypted(config.settingStoreKey, result.value);
    }
};

const loadUser = () => {
    const user = getItemDecrypted(config.userStoreKey);
    if (user) {
        const {result} = useFetch(`account/${user.account_id}`);
        if (result) {
            storeItemEncrypted(config.userStoreKey, result.data);
        }
    }
};

const Layout = () => {
    loadSetting();
    loadUser();

    return (
        <div className="app">
            <ToastContainer/>
            <Outlet/>
        </div>
    );
};

export default Layout;
