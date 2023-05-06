import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import "./ListCard.scss";

const ListCard = props => {
    const {title, index} = props;

    return (
        <div>
            <h4 className={index ? "margin-top-none" : ""}>
                {title} <span>10 <FavoriteIcon/></span>
            </h4>
            <div className="card">
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
    );
};

export default ListCard;
