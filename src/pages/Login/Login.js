import {useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import {Link, useNavigate} from "react-router-dom";
import Error from "../../components/Error";

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm();

    const onSubmit = () => {
        navigate("/dashboard");
    };

    return (
        <div className="container">
            <div className="text-center">
                <LoginIcon fontSize="large" className="rounded-icon icon-primary"/>
            </div>
            <h2 className="text-center">Login</h2>
            <div className="form-control">
                <Error field={errors.username} />
                <TextField {...register("username", {required: "Enter username."})}
                    id="outlined-basic" label="Username" variant="outlined" required fullWidth />
            </div>
            <div className="form-control">
                <Error field={errors.password} />
                <TextField {...register("password", {required: "Enter password."})}
                    id="outlined-basic" label="Password" variant="outlined" required fullWidth type="password" />
            </div>
            <div className="form-control">
                <Button onClick={handleSubmit(onSubmit)}
                    className="margin-button" variant="contained" size="large" fullWidth={true}>Login</Button>
            </div>
            <div className="text-center">
                <Link to="/signup">If you don&apos;t have an account, create an account here</Link>
            </div>
        </div>
    );
};

export default Login;

