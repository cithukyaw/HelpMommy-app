import {useForm} from "react-hook-form";
import {useState} from "react";
import {Button, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import Error from "../../components/Error";

// eslint-disable-next-line
const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const onSubmit = () => {
        navigate("/login");
    };

    return (
        <div className="container">
            <div className="text-center">
                <HowToRegIcon fontSize="large" className="rounded-icon icon-primary"/>
            </div>
            <h2 className="text-center">Create an Account</h2>
            <div className="form-control">
                <Error field={errors.username} />
                <TextField {...register("username", {required: "Enter a username."})}
                    id="outlined-username" label="Username" variant="outlined" required fullWidth autoComplete="off" />
            </div>
            <div className="form-control">
                <Error field={errors.password} />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-password">Password</InputLabel>
                    <OutlinedInput
                        {...register("password", {required: "Enter a password with min 8 characters."})}
                        id="outlined-password" label="Password" required
                        type={showPassword ? 'text' : 'password'}
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
                    className="margin-button" variant="contained" size="large" fullWidth={true}>Create</Button>
            </div>
            <div className="text-center">
                <Link to="/login">If you already have an account, login here</Link>
            </div>
        </div>
    );
};

export default Signup;
