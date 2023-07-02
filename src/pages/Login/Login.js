import {useForm} from "react-hook-form";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import LoginIcon from "@mui/icons-material/Login";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import {storeItem} from "../../helpers/storage";
import config from "../../config";
import {sendRequest} from "../../helpers/fetchRequest";

const Login = () => {
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
        setLoading(true);
        const { result, error } = await sendRequest("auth/login", "POST", data);
        setLoading(false);

        if (result && result.data.id) {
            console.log(result);
            storeItem(config.userStoreKey, result.data);

            navigate("/dashboard");
        }

        if (error) {
            console.log(error);
            error.map(err => setError(err.field, {type: "custom", message: err.message}));
        }
    };

    return (
        <>
            {loading && <Loading/>}
            <div className="container">
                <div className="text-center">
                    <LoginIcon fontSize="large" className="rounded-icon icon-primary"/>
                </div>
                <h2 className="text-center">Login</h2>
                <div className="form-control">
                    <Error field={errors.username} />
                    <TextField {...register("username", {required: "Enter username."})}
                        id="outlined-username" label="Username" variant="outlined" required fullWidth />
                </div>
                <div className="form-control">
                    <Error field={errors.password} />
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-password">Password</InputLabel>
                        <OutlinedInput
                            {...register("password", {required: "Enter a password with min 8 characters."})}
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
                </div>
                <div className="form-control">
                    <Button onClick={handleSubmit(onSubmit)}
                        className="margin-button" variant="contained" size="large" fullWidth={true}>Login</Button>
                </div>
                <div className="text-center">
                    <Link to="/signup">If you don&apos;t have an account, create an account here</Link>
                </div>
            </div>
        </>
    );
};

export default Login;

