import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import "./Navbar.scss";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <Link to="/dashboard" className="active">
                <HomeIcon />
                <div>Home</div>
            </Link>
            <Link to="/exchange">
                <CurrencyExchangeIcon />
                <div>Exchange</div>
            </Link>
            <Link to="/add">
                <AddIcon className="ico-add" />
            </Link>
            <Link to="/history">
                <FormatListBulletedIcon />
                <div>History</div>
            </Link>
            <Link to="/account">
                <AccountCircleIcon />
                <div>Account</div>
            </Link>
        </nav>
    );
};

export default Navbar;
