import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import InterestsIcon from '@mui/icons-material/Interests';
import HomeIcon from "@mui/icons-material/Home";
import {NavLink} from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
    return (
        <nav>
            <NavLink to="/dashboard" activeClassName="active">
                <HomeIcon />
                <div>Home</div>
            </NavLink>
            <NavLink to="/hearts" activeClassName="active">
                <InterestsIcon />
                <div>Hearts</div>
            </NavLink>
            <NavLink to="/add" activeClassName="active">
                <AddCircleOutlineIcon className="ico-add" />
            </NavLink>
            <NavLink to="/exchange" activeClassName="active">
                <CurrencyExchangeIcon />
                <div>Exchange</div>
            </NavLink>
            <NavLink to="/account" activeClassName="active">
                <AccountCircleIcon />
                <div>Account</div>
            </NavLink>
        </nav>
    );
};

export default Navbar;
