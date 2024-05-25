import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Button} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import {Link, useNavigate} from "react-router-dom";
import "./Dashboard.scss";
import {getItemDecrypted} from "../../helpers/storage";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import NoHeart from "../../components/NoHeart/NoHeart";
import moment from "moment";
import {checkRedeem, getConfig} from "../../helpers/common";
import {useEffect} from "react";
import WalletIcon from "@mui/icons-material/Wallet";
import TrialWarning from "../../components/TrialWarning";

const Dashboard = () => {
    const navigate = useNavigate();
    const config = getConfig();
    const user = getItemDecrypted(config.userStoreKey);

    useEffect(() => {
        if (user) {
            if (!checkRedeem(user)) {
                navigate("/redeem");
            }
        } else {
            navigate("/");
        }
    });

    const currentDate = moment().format("YYYY-MM-DD");
    const { result, loading } = useFetch(`users/${user.id}/jobs?filter[date]=${currentDate}`);
    const jobs = result?.data;

    const { result: ratingResult, loading: ratingLoading } = useFetch(`users/${user.id}/ratings`);
    const totalHearts = ratingResult?.meta.rating;
    const todayHearts = ratingResult?.data[currentDate]?.ratings;
    const amount = totalHearts * config.exchangeRate;

    return (
        <>
            {loading && <Loading/>}
            <Header title="Help Mommy"/>
            <div className="container">
                <TrialWarning user={user}/>
                <div className="card">
                    <div className="user-name">Welcome {user.full_name}</div>
                    {!loading && !ratingLoading ?
                        <div>
                            <div className="user-hearts">
                                <FavoriteIcon/>
                                <strong>{totalHearts} heart{totalHearts > 1 ? "s " : " "}</strong>
                            </div>
                            <div className="user-hearts">
                                <WalletIcon/>
                                {amount.toLocaleString()} {config.currencyUnit}
                            </div>
                        </div>
                        : ""
                    }
                    <Button variant="outlined" size="small" component={Link} to="/add"
                            startIcon={<AddCircleOutlineIcon/>}>
                        Add Hearts
                    </Button>
                </div>
                {jobs && result.meta.total && ratingResult ?
                    <div className="card">
                        <h4 className="margin-top-none">
                            {todayHearts} heart{todayHearts > 1 ? "s " : " "}
                            ({ (todayHearts * config.exchangeRate).toLocaleString() } { config.currencyUnit }) earned today
                        </h4>
                        <ul className="list">
                        {jobs.map(job => (
                            <li key={job.id}>
                                <span className="list-item">
                                    <span>{job.name}</span>
                                    <span>{job.rating} { job.rating > 0 ? <FavoriteIcon/> : <HeartBrokenIcon/> }</span>
                                </span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    :
                    !loading && <NoHeart msg="ဒီနေ့ သင် အသည်းမရရှိသေးပါ။" />
                }
            </div>
            <Navbar/>
        </>
    );
};

export default Dashboard;
