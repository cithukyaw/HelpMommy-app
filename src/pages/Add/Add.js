import {useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";

const Add = () => {
    const jobs = [
        {"id": 1, "name": "စာလုပ်", "rating": 5},
        {"id": 3, "name": "ဈေးဝယ်", "rating": 5},
        {"id": 4, "name": "မီးပူတိုက်", "rating": 5},
        {"id": 5, "name": "အဝတ်လျော်", "rating": 4},
        {"id": 6, "name": "တံမြတ်စည်းလှည်း", "rating": 4},
        {"id": 7, "name": "ဖုန်သန့်ရှင်းရေး", "rating": 4},
        {"id": 8, "name": "ထမင်းအိုးတည်", "rating": 3},
        {"id": 9, "name": "ရေနွေးတည်", "rating": 3},
        {"id": 10, "name": "သောက်ရေဖြည့်", "rating": 3},
        {"id": 11, "name": "ပန်းကန်ဆေး", "rating": 3},
        {"id": 12, "name": "အဝတ်လှမ်း/ရုတ်", "rating": 2},
        {"id": 13, "name": "ဂိမ်းဆော့", "rating": -2},
        {"id": 14, "name": "ယူကျုကြည့်", "rating": -1}
    ];

    const [jobDate, setJobDate] = useState(dayjs());

    const handleSubmit = () => {
        // TODO:
    };

    return (
        <>
            <Header title="Add Hearts" />
            <div className="container">
                <p>အမေ့ကိုကူညီခဲ့တဲ့အလုပ်ကိုရွေးထည့်ပြီး <FavoriteIcon/> ရယူပါ</p>
                <div className="form-control">
                    <FormControl fullWidth>
                        <InputLabel id="job-select-label">Job</InputLabel>
                        <Select
                            labelId="job-select-label"
                            id="job-select"
                            label="Job"
                            required
                        >
                            { jobs.map(job =>
                                <MenuItem value={job.id} key={job.id}>
                                    {job.name}
                                    <span className="hearts">
                                        {
                                            [...Array(Math.abs(job.rating))].map(x => {
                                                if (job.rating > 0) {
                                                    return <FavoriteIcon key={x}/>;
                                                } else {
                                                    return <HeartBrokenIcon key={x}/>;
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date of the job"
                            format="DD/MM/YYYY"
                            defaultValue={jobDate}
                            onChange={value => setJobDate(value)}
                            slotProps={{ textField: { fullWidth: true } }}
                            required
                        />
                    </LocalizationProvider>
                </div>
                <Button fullWidth
                    variant="contained"
                    size="large"
                    color="success"
                    startIcon={<AddCircleOutlineIcon/>}
                    onClick={handleSubmit}
                >
                    Add Hearts
                </Button>
            </div>
            <Navbar />
        </>
    );
};

export default Add;
