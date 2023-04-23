import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import InterestsIcon from '@mui/icons-material/Interests';
import HomeIcon from "@mui/icons-material/Home";
import {NavLink} from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
    const menuActive = (navData) => navData.isActive ? "active" : '';

    return (
        <nav>
            <NavLink to="/dashboard" className={menuActive}>
                <HomeIcon />
                <div>Home</div>
            </NavLink>
            <NavLink to="/hearts" className={menuActive}>
                <InterestsIcon />
                <div>Hearts</div>
            </NavLink>
            <NavLink to="/add" className={menuActive}>
                <AddCircleOutlineIcon className="ico-add" />
            </NavLink>
            <NavLink to="/exchange" className={menuActive}>
                <CurrencyExchangeIcon />
                <div>Exchange</div>
            </NavLink>
            <NavLink to="/account" className={menuActive}>
                <AccountCircleIcon />
                <div>Account</div>
            </NavLink>
        </nav>
    );
};

export default Navbar;
