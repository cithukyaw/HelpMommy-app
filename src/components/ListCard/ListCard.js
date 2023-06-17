import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import moment from "moment";
import "./ListCard.scss";

const ListCard = props => {
    const {title, hearts, jobs, index} = props;
    let relativeTime = moment(title, "YYYY-MM-DD").endOf("day").fromNow();

    if (relativeTime === "a day ago") {
        relativeTime = "yesterday";
    } else if (relativeTime.includes("hour")) {
        relativeTime = "today";
    }

    return (
        <div>
            <h4 className={index ? "margin-top-none" : ""}>
                <time>{relativeTime}</time>
                <span>{hearts} <FavoriteIcon/></span>
            </h4>
            <div className="card">
                <ul className="list">
                {jobs.map(job => (
                    <li key={job.id}>
                        <span>{job.name}</span>
                        <span>{job.rating} { job.rating > 0 ? <FavoriteIcon/> : <HeartBrokenIcon/> }</span>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
};

export default ListCard;
