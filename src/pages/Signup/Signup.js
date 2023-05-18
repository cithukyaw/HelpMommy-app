import {useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {Link, useNavigate} from "react-router-dom";
import Error from "../../components/Error";

// eslint-disable-next-line
const Signup = () => {
    const navigate = useNavigate();

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm();

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
                    id="outlined-basic" label="Username" variant="outlined" required fullWidth autoComplete="off" />
            </div>
            <div className="form-control">
                <Error field={errors.password} />
                <TextField {...register("password", {required: "Enter a password with min 8 characters."})}
                    id="outlined-basic" label="Password" variant="outlined" required fullWidth type="password" />
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
