import {Button, TextField} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {Link} from "react-router-dom";

const Signup  = () => {
    return (
        <div className="container">
            <div className="text-center">
                <HowToRegIcon fontSize="large" className="rounded-icon icon-primary"/>
            </div>
            <h2 className="text-center">Create an Account</h2>
            <div className="form-control">
                <TextField id="outlined-basic" label="Username" variant="outlined" required fullWidth />
            </div>
            <div className="form-control">
                <TextField id="outlined-basic" label="Password" variant="outlined" required fullWidth type="password" />
            </div>
            <div className="form-control">
                <Button variant="contained" size="large" fullWidth={true}>Create</Button>
            </div>
            <div className="text-center">
                <Link to="/login">If you already have an account, login here</Link>
            </div>
        </div>
    );
};

export default Signup;
