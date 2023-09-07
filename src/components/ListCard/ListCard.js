import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useLongPress from "../../hooks/useLongPress";
import moment from "moment";
import "./ListCard.scss";
import {useEffect, useState} from "react";
import {sendRequest} from "../../helpers/fetchRequest";
import {toast} from "react-toastify";
import config from "../../config";

const ListCard = props => {
    const {title, hearts, index} = props;
    const [jobs, setJobs] = useState([]);
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);

    useEffect(() => {
        setJobs(props.jobs);
    }, [props]);

    const onLongPress = () => {
        setShowDeleteIcon(true);
    };

    const onClick = () => {
        setShowDeleteIcon(false);
    };

    const longPressEvent = useLongPress(onLongPress, onClick, {
        shouldPreventDefault: true,
        delay: 500,
    });

    const doDelete = async id => {
        const { result, error } = await sendRequest(`user_jobs/${id}`, "POST");

        if (error) {
            let errMsg = "";
            error.map(err => errMsg += " " + err.message);
            toast.error(errMsg, config.toastOptions);
        } else {
            if (result) {
                toast.success("Deleted.", config.toastOptions);
                setJobs(jobs.filter(job => parseInt(job.id) !== parseInt(id)));
            }
        }
    };

    return (
        <div>
        {jobs.length > 0 &&
            <div>
                <h4 className={index ? "margin-top-none" : ""}>
                    <time>{moment(title).format("MMM D, YYYY (ddd)")}</time>
                    <span>{hearts} <FavoriteIcon/></span>
                </h4>
                <div className="card">
                    <ul className="list">
                    {jobs.map(job => (
                        <li key={job.id}>
                            <span className={showDeleteIcon ? "delete-action show" : "delete-action"}
                                  onClick={() => doDelete(job.id)}>
                                <DeleteForeverIcon />
                            </span>
                            <span className="list-item unselectable" {...longPressEvent}>
                                <span className="my">{job.name}</span>
                                <span>{job.rating} { job.rating > 0 ? <FavoriteIcon/> : <HeartBrokenIcon/> }</span>
                            </span>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        }
        </div>
    );
};

export default ListCard;
