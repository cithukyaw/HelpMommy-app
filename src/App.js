import "./App.scss";
import {
    createBrowserRouter,
    Outlet,
    RouterProvider
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Exchange from "./pages/Exchange/Exchange";
import Add from "./pages/Add/Add";
import History from "./pages/History/History";
import Account from "./pages/Account/Account";

const Layout = () => {
    return (
        <div className="app">
            <Outlet/>
        </div>
    );
};

const router = createBrowserRouter([
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
                path: "/history",
                element: <History/>
            },
            {
                path: "/account",
                element: <Account/>
            }
        ]
    },
]);

const App = () => {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
};

export default App;
