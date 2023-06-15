import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Button} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import {Link} from "react-router-dom";
import "./Dashboard.scss";
import {getItem} from "../../helpers/storage";
import config from "../../config";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";

const Dashboard = () => {
    const user = getItem(config.userStoreKey);
    const todayHearts = 12;

    const getCurrentDate = () => {
        const current = new Date();
        return `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    };

    const { result, loading } = useFetch(`users/${user.id}/jobs?filter[date]=${getCurrentDate()}`);
    const jobs = result?.data;

    return (
        <>
            {loading && <Loading/>}
            <Header title="HelpMommy"/>
            <div className="container">
                <div className="card">
                    <div className="user-name">Welcome {user.full_name}</div>
                    <div className="user-hearts">
                        <FavoriteIcon/>
                        <strong>0 hearts</strong>
                    </div>
                    <Button variant="outlined" size="small" component={Link} to="/add" startIcon={<AddCircleOutlineIcon/>}>
                        Add Hearts
                    </Button>
                </div>
                { jobs && result.meta.total ?
                    <div className="card">
                        <h4 className="margin-top-none">{todayHearts} hearts earned today</h4>
                        <ul className="list">
                            {jobs.map(job => (
                                <li key={job.id}>
                                    <span>{job.name}</span>
                                    <span>{job.rating} <FavoriteIcon/></span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    :
                    <div className="text-center heart-broken">
                        <HeartBrokenIcon/>
                        <p>No hearts today</p>
                        <p>Help your mom and get hearts.</p>
                        <Button variant="contained" className="margin-button" component={Link} to="/add" startIcon={<AddCircleOutlineIcon/>}>
                            Add Hearts
                        </Button>
                    </div>
                }
            </div>
            <Navbar/>
        </>
    );
};

export default Dashboard;
