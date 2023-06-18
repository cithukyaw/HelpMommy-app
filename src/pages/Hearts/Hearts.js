import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import ListCard from "../../components/ListCard/ListCard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import config from "../../config";
import {Card, CardContent, Typography} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import {getItem} from "../../helpers/storage";
import Loading from "../../components/Loading";
import NoHeart from "../../components/NoHeart/NoHeart";

const Hearts = () => {
    const user = getItem(config.userStoreKey);

    const { result: ratingResult } = useFetch(`users/${user.id}/ratings?pager=7`);
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
            <Header title="Hearts Earned History"/>
            <div className="container">
                { totalHearts ?
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                You have total {totalHearts}<FavoriteIcon/>
                            </Typography>
                            <Typography variant="body1">
                                worth of <strong>{amount.toLocaleString()} {config.currencyUnit}</strong>
                            </Typography>
                        </CardContent>
                    </Card>
                    : ""
                }
                { list.length ?
                    list.map(([key, value]) => <ListCard key={key} title={key} hearts={ratingResult?.data[key]?.ratings} jobs={value} />)
                    :
                    <NoHeart msg="You have no hearts." />
                }
            </div>
            <Navbar/>
        </>
    );
};

export default Hearts;
