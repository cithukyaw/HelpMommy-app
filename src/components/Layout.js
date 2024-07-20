import {ToastContainer} from "react-toastify";
import {Outlet} from "react-router-dom";
import {getItemDecrypted} from "../helpers/storage";
import config from "../config";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {userAccount} from "../state/user/userSlice";
import {fetchSettings} from "../state/setting/settingSlice";

const Layout = () => {
    const user = getItemDecrypted(config.userStoreKey);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSettings());
        if (user) {
            dispatch(userAccount(user.account_id));
        }
    }, []);

    return (
        <div className="app">
            <ToastContainer/>
            <Outlet/>
        </div>
    );
};

export default Layout;
