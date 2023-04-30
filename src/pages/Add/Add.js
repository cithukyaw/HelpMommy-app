import {useState} from "react";
import {useForm} from "react-hook-form";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
    const jobs = [
        {"id": 1, "name": "စာလုပ်", "rating": 5},
        {"id": 2, "name": "ဈေးဝယ်", "rating": 5},
        {"id": 3, "name": "မီးပူတိုက်", "rating": 5},
        {"id": 4, "name": "ရေကန်လှယ်", "rating": 5},
        {"id": 5, "name": "အဲယားကွန်းဆေး", "rating": 5},
        {"id": 6, "name": "အဝတ်လျော်", "rating": 4},
        {"id": 7, "name": "တံမြတ်စည်းလှည်း", "rating": 4},
        {"id": 8, "name": "ဖုန်သန့်ရှင်းရေး", "rating": 4},
        {"id": 9, "name": "ရေခဲသေတ္တာသန့်ရှင်းရေး", "rating": 4},
        {"id": 10, "name": "ထမင်းအိုးတည်", "rating": 3},
        {"id": 11, "name": "ရေနွေးတည်", "rating": 3},
        {"id": 12, "name": "သောက်ရေဖြည့်", "rating": 3},
        {"id": 13, "name": "အိုးခွက်ပန်းကန်ဆေး", "rating": 3},
        {"id": 14, "name": "ဆိုဖာသန့်ရှင်းရေး", "rating": 3},
        {"id": 15, "name": "အဝတ်လှမ်း/ရုတ်/ခေါက်", "rating": 2},
        {"id": 16, "name": "အဝတ်ဗီဒိုရှင်း", "rating": 2},
        {"id": 17, "name": "ဝရံတာသန့်ရှင်းရေး", "rating": 2},
        {"id": 18, "name": "ဂိမ်းဆော့", "rating": -2},
        {"id": 19, "name": "ယူကျုကြည့်", "rating": -1}
    ];

    const [jobDate, setJobDate] = useState(dayjs());
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm();

    const onSubmit = (data) => {
        const {jobId} = data;

        let rating = jobs.filter(j => j.id === jobId).pop().rating;
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
        <>
            <ToastContainer/>
            <Header title="Add Hearts"/>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>အမေ့ကိုကူညီခဲ့တဲ့အလုပ်ကိုရွေးထည့်ပြီး <FavoriteIcon/> ရယူပါ</p>
                    <div className="form-control">
                        {errors.jobId && <p className="form-error">{errors.jobId?.message}</p>}
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
                        {errors.jobDate && <p className="form-error">{errors.jobDate?.message}</p>}
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
        </>
    );
};

export default Add;
