import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import ListCard from "../../components/ListCard/ListCard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Card, CardContent, Typography} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import {getItemDecrypted} from "../../helpers/storage";
import Loading from "../../components/Loading";
import NoHeart from "../../components/NoHeart/NoHeart";
import {getConfig} from "../../helpers/common";

const Hearts = () => {
    const config = getConfig();
    const user = getItemDecrypted(config.userStoreKey);
    let totalHearts, amount;
    let jobData, ratingData = {
        result: null,
        loading: false
    };
    if (user) {
        ratingData = useFetch(`users/${user.id}/ratings`);
        totalHearts = ratingData.result?.meta.rating;
        amount = totalHearts * config.exchangeRate;

        jobData = useFetch(`users/${user.id}/jobs?pager=7`);
    }

    let list = [];
    if (jobData) {
        const jobs = {};
        jobData.result?.data.map(row => {
            jobs[row.activity_date] = jobs[row.activity_date] || [];
            jobs[row.activity_date].push(row);
        });

        list = Object.entries(jobs);
    }

    return (
        <>
            {jobData?.loading && <Loading/>}
            <Header title="အသည်းရရှိမှုမှတ်တမ်း" customClass="my"/>
            <div className="container">
                { totalHearts ?
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                <span className="my">အသည်းစုစုပေါင်း</span> {totalHearts}<FavoriteIcon/>
                            </Typography>
                            <Typography variant="body1" className="mt-1">
                                <span className="my">တန်ဖိုးငွေ</span> <strong>{amount.toLocaleString()} {config.currencyUnit}</strong>
                            </Typography>
                        </CardContent>
                    </Card>
                    : ""
                }
                { list.length ?
                    list.map(([key, value]) => <ListCard key={key} title={key} hearts={ratingData.result?.data[key]?.ratings} jobs={value} />)
                    :
                    !jobData?.loading && <NoHeart msg="နောက်ဆုံး (၇)ရက်အတွင်း သင် အသည်းမရရှိခဲ့ပါ။" />
                }
            </div>
            <Navbar/>
        </>
    );
};

export default Hearts;
