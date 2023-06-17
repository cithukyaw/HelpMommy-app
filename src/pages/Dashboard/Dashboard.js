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
import NoHeart from "../../components/NoHeart/NoHeart";
import moment from "moment";

const Dashboard = () => {
    const user = getItem(config.userStoreKey);

    const currentDate = moment().format("YYYY-MM-DD");
    const { result, loading } = useFetch(`users/${user.id}/jobs?filter[date]=${currentDate}`);
    const jobs = result?.data;

    const { result: ratingResult } = useFetch(`users/${user.id}/ratings`);
    const totalHearts = ratingResult?.meta.rating;
    const todayHearts = ratingResult?.data[currentDate]?.ratings;

    return (
        <>
            {loading && <Loading/>}
            <Header title="HelpMommy"/>
            <div className="container">
                <div className="card">
                    <div className="user-name">Welcome {user.full_name}</div>
                    <div className="user-hearts">
                        <FavoriteIcon/>
                        <strong>{totalHearts} heart{totalHearts > 1 ? "s" : ""}</strong>
                    </div>
                    <Button variant="outlined" size="small" component={Link} to="/add" startIcon={<AddCircleOutlineIcon/>}>
                        Add Hearts
                    </Button>
                </div>
                { jobs && result.meta.total && ratingResult ?
                    <div className="card">
                        <h4 className="margin-top-none">{todayHearts} heart{todayHearts > 1 ? "s" : ""} earned today</h4>
                        <ul className="list">
                        {jobs.map(job => (
                            <li key={job.id}>
                                <span>{job.name}</span>
                                <span>{job.rating} { job.rating > 0 ? <FavoriteIcon/> : <HeartBrokenIcon/> }</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    :
                    <NoHeart/>
                }
            </div>
            <Navbar/>
        </>
    );
};

export default Dashboard;
