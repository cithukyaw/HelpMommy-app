import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Button} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import {Link} from "react-router-dom";
import "./Dashboard.scss";
import {getItem} from "../../storage";
import config from "../../config";

const Dashboard = () => {
    const user = getItem(config.userStoreKey);
    const name = user.full_name;
    const todayHearts = 12;

    return (
        <>
            <Header title="HelpMommy"/>
            <div className="container">
                <div className="card">
                    <div className="user-name">Welcome {name}</div>
                    <div className="user-hearts">
                        <FavoriteIcon/>
                        <strong>0 hearts</strong>
                    </div>
                    <Button variant="outlined" size="small" component={Link} to="/add" startIcon={<AddCircleOutlineIcon/>}>
                        Add Hearts
                    </Button>
                </div>
                <div className="text-center heart-broken">
                    <HeartBrokenIcon/>
                    <p>No hearts today</p>
                    <p>Help your mom and get hearts.</p>
                    <Button variant="contained" className="margin-button" component={Link} to="/add" startIcon={<AddCircleOutlineIcon/>}>
                        Add Hearts
                    </Button>
                </div>
                <div className="card">
                    <h4 className="margin-top-none">{todayHearts} hearts earned today</h4>
                    <ul className="list">
                        <li>
                            <span>အဝတ်လျော်</span>
                            <span>5 <FavoriteIcon/></span>
                        </li>
                        <li>
                            <span>စာလုပ်</span>
                            <span>5 <FavoriteIcon/></span>
                        </li>
                        <li>
                            <span>တံမြတ်စည်းလှည်း</span>
                            <span>3 <FavoriteIcon/></span>
                        </li>
                        <li>
                            <span>ဂိမ်းဆော့</span>
                            <span>-2 <HeartBrokenIcon/></span>
                        </li>
                        <li>
                            <span>YouTube ကြည့်</span>
                            <span>-1 <HeartBrokenIcon/></span>
                        </li>
                    </ul>
                </div>
            </div>
            <Navbar/>
        </>
    );
};

export default Dashboard;
