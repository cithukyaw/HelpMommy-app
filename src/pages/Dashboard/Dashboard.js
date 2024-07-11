import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Button} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import {Link} from "react-router-dom";
import "./Dashboard.scss";
import {getItemDecrypted, storeItemEncrypted} from "../../helpers/storage";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import NoHeart from "../../components/NoHeart/NoHeart";
import moment from "moment";
import WalletIcon from "@mui/icons-material/Wallet";
import TrialWarning from "../../components/TrialWarning";
import {getConfig} from "../../helpers/common";

const Dashboard = () => {
    const config = getConfig();
    const user = getItemDecrypted(config.userStoreKey);
    const currentDate = moment().format("YYYY-MM-DD");
    let jobs, totalHearts, todayHearts, amount;
    let jobData, ratingData = {
        result: null,
        loading: false
    };

    if (user) {
        const {result} = useFetch(`account/${user.account_id}`);
        if (result) {
            storeItemEncrypted(config.userStoreKey, result.data);
        }

        jobData = useFetch(`users/${user.id}/jobs?filter[date]=${currentDate}`);
        jobs = jobData.result?.data;

        ratingData = useFetch(`users/${user.id}/ratings`);
        totalHearts = ratingData.result?.meta.rating;
        todayHearts = ratingData.result?.data[currentDate]?.ratings;
        amount = totalHearts * config.exchangeRate;
    }

    return (
        <>
            {jobData?.loading && <Loading/>}
            <Header title="Help Mommy"/>
            <div className="container">
                { user &&
                    <div>
                        <TrialWarning user={user}/>
                        <div className="card">
                            <div className="user-name">Welcome {user.full_name}</div>
                            {!jobData?.loading && !ratingData.loading ?
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
                    </div>
                }
                {jobs && jobData?.result.meta.total && ratingData?.result ?
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
                    !jobData?.loading && <NoHeart msg="ဒီနေ့ သင် အသည်းမရရှိသေးပါ။" />
                }
            </div>
            <Navbar/>
        </>
    );
};

export default Dashboard;
