import "./App.scss";
import {
    createHashRouter,
    Outlet,
    RouterProvider
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Exchange from "./pages/Exchange/Exchange";
import Add from "./pages/Add/Add";
import Hearts from "./pages/Hearts/Hearts";
import Account from "./pages/Account/Account";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "./hooks/useFetch";
import {storeItem} from "./helpers/storage";
import config from "./config";
import Redeem from "./pages/Redeem/Redeem";

// eslint-disable-next-line
const Layout = () => {
    loadSetting();

    return (
        <div className="app">
            <ToastContainer/>
            <Outlet/>
        </div>
    );
};

const loadSetting = () => {
    const { result } = useFetch("settings");
    if (result) {
        storeItem(config.settingStoreKey, result);
    }
};

const router = createHashRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/signup",
                element: <Signup/>
            },
            {
                path: "/redeem",
                element: <Redeem/>
            },
            {
                path: "/dashboard",
                element: <Dashboard/>
            },
            {
                path: "/exchange",
                element: <Exchange/>
            },
            {
                path: "/add",
                element: <Add/>
            },
            {
                path: "/hearts",
                element: <Hearts/>
            },
            {
                path: "/account",
                element: <Account/>
            }
        ]
    },
]);

const App = () => <RouterProvider router={router}/>;

export default App;
