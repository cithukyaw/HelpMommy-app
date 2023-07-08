import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/Error";
import {Alert, Button, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import {Lock, Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import {getItem, removeItem, storeItem} from "../../helpers/storage";
import config from "../../config";
import {makeRequest} from "../../helpers/httpRequest";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line
const Account = () => {
    const user = getItem(config.userStoreKey);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        setError,
        formState: {errors},
        handleSubmit
    } = useForm();

    const handleClickShowPassword = () => setShowPassword(show => !show);

    const handleMouseDownPassword = e => e.preventDefault();

    const onSubmit = async data => {
        const {result, error} = await makeRequest(`users/${user.id}`, "POST", data, {
            loading: setLoading
        });

        if (result && result.data.id) {
            storeItem(config.userStoreKey, result.data);
            toast.success(`အကောင့်အချက်အလက်ကိုပြင်ပြီးပါပြီ`, config.toastOptions);
        }

        if (error) {
            error.map(err => setError(err.field, {type: "custom", message: err.message}));
        }
    };

    const logout = () => {
        removeItem(config.userStoreKey);
        navigate("login");
    };

    return (
        <>
            <Header title="အကောင့်အချက်အလက်ပြင်ရန်" />
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <Error field={errors.name} />
                        <TextField {...register("name", {required: "အမည်အပြည့်အစုံဖြည့်ပေးပါ"})}
                                   required fullWidth
                                   id="outlined-name" label="Full Name" variant="outlined"
                                   defaultValue={user.full_name} />
                    </div>

                    <Alert severity="info" icon={<Lock fontSize="inherit" />}>Login Information Below</Alert>

                    <div className="form-control">
                        <Error field={errors.username} />
                        <TextField {...register("username", {required: "username ကို ဖြည့်ပေးပါ"})}
                                   required fullWidth
                                   id="outlined-username" label="Username" variant="outlined" autoComplete="off"
                                   defaultValue={user.username} />
                    </div>
                    <div className="form-control">
                        <Error field={errors.password} />
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-password">Password</InputLabel>
                            <OutlinedInput
                                {...register("password", {
                                    minLength: {
                                        value: 8,
                                        message: "အနည်းဆုံးစာလုံးရေ(၈)လုံးရိုက်ထည့်ပေးပါ"
                                    }
                                })}
                                id="outlined-password" label="Password" required
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <small className="tip">(Password အသစ်ပြောင်းချင်မှသာ ရိုက်ထည့်ရန်)</small>
                    </div>
                    <div className="form-control">
                        <Button onClick={handleSubmit(onSubmit)}
                                disabled={loading}
                                className="margin-button"
                                variant="contained"
                                size="large"
                                fullWidth={true}>Update</Button>
                    </div>
                </form>
                <p className="text-center">
                    <a href="#" onClick={logout}>Logout</a>
                </p>
            </div>
            <Navbar />
        </>
    );
};

export default Account;
