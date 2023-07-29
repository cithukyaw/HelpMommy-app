import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {toast} from "react-toastify";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import dayjs from "dayjs";
import {getItemDecrypted} from "../../helpers/storage";
import {sendRequest} from "../../helpers/fetchRequest";
import {checkRedeem, getConfig} from "../../helpers/common";
import {useNavigate} from "react-router-dom";

const Add = () => {
    const navigate = useNavigate();
    const config = getConfig();
    const user = getItemDecrypted(config.userStoreKey);

    useEffect(() => {
        if (user && !checkRedeem(user)) {
            navigate("/redeem");
        }
    });

    const { result, loading } = useFetch("jobs");
    const jobs = result?.data;
    const [jobDate, setJobDate] = useState(dayjs());
    const {
        register,
        setError,
        formState: {errors},
        handleSubmit
    } = useForm();
    const today = dayjs();

    const onSubmit = async data => {
        const { activity_date: activityDate } = data;
        const jobDate = activityDate.split("/");
        data.activity_date = `${jobDate[2]}-${jobDate[1]}-${jobDate[0]}`;

        const { result, error } = await sendRequest(`users/${user.id}/jobs`, "POST", data);

        if (result && result.data.id) {
            const rating = jobs.filter(j => j.id === data.job_id).pop().rating;
            if (rating > 0) {
                toast.success(`Congrats! You got ${rating} hearts.`, config.toastOptions);
            } else {
                toast.error(`Oops! You lost ${Math.abs(rating)} hearts.`, config.toastOptions);
            }
        }

        if (error) {
            error.map(err => setError(err.field, { type: "custom", message: err.message }));
        }
    };

    return (
        <>
            {loading && <Loading/>}
            <Header title="အသည်းရယူရန်"/>
            <div className="container">
            { jobs ?
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>အမေ့ကိုကူညီခဲ့တဲ့အလုပ်ကိုရွေးထည့်ပြီး <FavoriteIcon/> ရယူပါ</p>
                    <div className="form-control">
                        <Error field={errors.job_id} />
                        <FormControl fullWidth>
                            <InputLabel id="job-select-label">Job</InputLabel>
                            <Select
                                {...register("job_id", {required: "အလုပ်တစ်ခုကိုရွေးပေးပါ"})}
                                labelId="job-select-label"
                                id="job-select"
                                label="Job"
                                defaultValue="">
                                <MenuItem value=""><em>-- None --</em></MenuItem>
                                {jobs.map(job =>
                                    <MenuItem value={job.id} key={job.id}>
                                        {job.name}
                                        <span className="hearts">
                                        {
                                            [...Array(Math.abs(job.rating))].map((x, i) => {
                                                if (job.rating > 0) {
                                                    return <FavoriteIcon key={i}/>;
                                                } else {
                                                    return <HeartBrokenIcon key={i}/>;
                                                }
                                            })
                                        }
                                        </span>
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="form-control">
                        <Error field={errors.activity_date} />
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}>
                            <DatePicker
                                {...register("activity_date", {required: "Select a date."})}
                                label="Date of the job"
                                format="DD/MM/YYYY"
                                onChange={value => setJobDate(value)}
                                slotProps={{
                                    textField: {
                                        ...register("activity_date", {required: "Select a date."}),
                                        fullWidth: true,
                                        value: jobDate
                                    },
                                }}
                                maxDate={today}
                                defaultValue={jobDate}
                            />
                        </LocalizationProvider>
                    </div>
                    <Button fullWidth
                            variant="contained"
                            size="large"
                            color="success"
                            startIcon={<AddCircleOutlineIcon/>}
                            onClick={handleSubmit(onSubmit)}
                    >
                        Add Hearts
                    </Button>
                </form>
                : ""
            }
            </div>
            <Navbar/>
        </>
    );
};

export default Add;
