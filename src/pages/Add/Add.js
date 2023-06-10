import {useState} from "react";
import {useForm} from "react-hook-form";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {toast, ToastContainer} from "react-toastify";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
    const { result, loading } = useFetch("jobs");
    const jobs = result?.data;

    const [jobDate, setJobDate] = useState(dayjs());
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm();

    const onSubmit = data => {
        const {jobId} = data;

        const rating = jobs.filter(j => j.id === jobId).pop().rating;
        if (rating > 0) {
            toast.success(`Congrats! You got ${rating} hearts.`, {
                position: "top-center",
                theme: "dark",
            });
        } else {
            toast.error(`Oops! You lost ${Math.abs(rating)} hearts.`, {
                position: "top-center",
                theme: "dark",
            });
        }
    };

    return (
        !loading && jobs ?
            <>
                <ToastContainer/>
                <Header title="Add Hearts"/>
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p>အမေ့ကိုကူညီခဲ့တဲ့အလုပ်ကိုရွေးထည့်ပြီး <FavoriteIcon/> ရယူပါ</p>
                        <div className="form-control">
                            <Error field={errors.jobId} />
                            <FormControl fullWidth>
                                <InputLabel id="job-select-label">Job</InputLabel>
                                <Select
                                    {...register("jobId", {required: "Select a job."})}
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
                            <Error field={errors.jobDate} />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    {...register("jobDate", {required: "Select a date."})}
                                    label="Date of the job"
                                    format="DD/MM/YYYY"
                                    onChange={value => setJobDate(value)}
                                    slotProps={{textField: {fullWidth: true}}}
                                    maxDate={jobDate}
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
                </div>
                <Navbar/>
            </> :
            <Loading/>
    );
};

export default Add;
