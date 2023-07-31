import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./NoHeart.scss";

// eslint-disable-next-line
const NoHeart = ({ msg }) => {
    return (
        <div className="text-center heart-broken">
            <HeartBrokenIcon/>
            <p className="my">{ msg }</p>
            <p>Help your mom and get hearts.</p>
            <Button variant="contained" className="margin-button" component={Link} to="/add" startIcon={<AddCircleOutlineIcon/>}>
                Add Hearts
            </Button>
        </div>
    );
};

export default NoHeart;
