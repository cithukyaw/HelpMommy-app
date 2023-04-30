import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import ListCard from "../../components/ListCard/ListCard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import config from "../../config";
import {Card, CardContent, Typography} from "@mui/material";

const Hearts = () => {
    const totalHearts = 30;
    const amount = totalHearts * config.exchangeRate;

    return (
        <>
            <Header title="Hearts Earned History"/>
            <div className="container">
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
                <ListCard title="Today"/>
                <ListCard title="Yesterday"/>
                <ListCard title="2 days ago"/>
            </div>
            <Navbar/>
        </>
    );
};

export default Hearts;
