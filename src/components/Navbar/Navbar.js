import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import InterestsIcon from '@mui/icons-material/Interests';
import HomeIcon from "@mui/icons-material/Home";
import {Link} from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
    return (
        <nav>
            <Link to="/dashboard" className="active">
                <HomeIcon />
                <div>Home</div>
            </Link>
            <Link to="/hearts">
                <InterestsIcon />
                <div>Hearts</div>
            </Link>
            <Link to="/add">
                <AddCircleOutlineIcon className="ico-add" />
            </Link>
            <Link to="/exchange">
                <CurrencyExchangeIcon />
                <div>Exchange</div>
            </Link>
            <Link to="/account">
                <AccountCircleIcon />
                <div>Account</div>
            </Link>
        </nav>
    );
};

export default Navbar;
