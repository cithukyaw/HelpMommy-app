import {Navigate} from "react-router-dom";
import {checkRedeem, getConfig} from "../helpers/common";
import {getItemDecrypted} from "../helpers/storage";

const ProtectedRoute = ({ children, name }) => {
    let isAuthorized;
    let isRedeemed = false;
    const config = getConfig();

    const user = getItemDecrypted(config.userStoreKey);
    if (user) {
        isAuthorized = true;
        isRedeemed = !!checkRedeem(user);
    } else {
        isAuthorized = false;
    }

    if (!isAuthorized) {
        // to home page to sign in or register
        return <Navigate to="/" replace={true} />;
    }

    if (!isRedeemed) {
        // to redeem page to redeem
        return <Navigate to="/redeem" />;
    }

    // if the children is home, go to dashboard
    if (name === "home") {
        return <Navigate to="/dashboard" />;
    }

    // if user is authorized and subscription is valid, go to the children component
    return children;
};

export default ProtectedRoute;
