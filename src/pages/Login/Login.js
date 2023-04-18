import {Button, TextField} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/dashboard");
    };

    return (
        <div>
            <div className="text-center">
                <LoginIcon fontSize="large" className="rounded-icon icon-primary"/>
            </div>
            <h2 className="text-center">Login</h2>
            <div className="form-control">
                <TextField id="outlined-basic" label="Username" variant="outlined" required fullWidth />
            </div>
            <div className="form-control">
                <TextField id="outlined-basic" label="Password" variant="outlined" required fullWidth type="password" />
            </div>
            <div className="form-control">
                <Button variant="contained" size="large" fullWidth={true} onClick={handleClick}>Login</Button>
            </div>
            <div className="text-center">
                <Link to="/signup">If you don&apos;t have an account, create an account here</Link>
            </div>
        </div>
    );
}

export default Login;

