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

    const { result: ratingResult } = useFetch(`users/${user.id}/ratings`);
    const totalHearts = ratingResult?.meta.rating;
    const amount = totalHearts * config.exchangeRate;

    const { result, loading } = useFetch(`users/${user.id}/jobs?pager=7`);

    let list = [];
    if (result) {
        const jobs = {};
        result.data.map(row => {
            jobs[row.activity_date] = jobs[row.activity_date] || [];
            jobs[row.activity_date].push(row);
        });

        list = Object.entries(jobs);
    }

    return (
        <>
            {loading && <Loading/>}
            <Header title="အသည်းရရှိမှုမှတ်တမ်း"/>
            <div className="container">
                { totalHearts ?
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                အသည်းစုစုပေါင်း {totalHearts}<FavoriteIcon/>
                            </Typography>
                            <Typography variant="body1" className="mt-1">
                                တန်ဖိုးငွေ <strong>{amount.toLocaleString()} {config.currencyUnit}</strong>
                            </Typography>
                        </CardContent>
                    </Card>
                    : ""
                }
                { list.length ?
                    list.map(([key, value]) => <ListCard key={key} title={key} hearts={ratingResult?.data[key]?.ratings} jobs={value} />)
                    :
                    !loading && <NoHeart msg="နောက်ဆုံး (၇)ရက်အတွင်း သင် အသည်းမရရှိခဲ့ပါ။" />
                }
            </div>
            <Navbar/>
        </>
    );
};

export default Hearts;
