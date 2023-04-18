import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import './Home.scss';

const Home = () => {
    return (
        <>
            <h1 className="text-center">HelpMommy</h1>
            <div className="block-img">
                <img src="/img/undraw_family.svg" alt="Help Mommy" className="img-fluid" />
            </div>
            <Button fullWidth
                variant="contained"
                size="large"
                component={Link} to="/login"
                startIcon={<LoginIcon/>}>Login
            </Button>
            <Button fullWidth
                variant="outlined"
                size="large"
                component={Link} to="/signup"
                startIcon={<HowToRegIcon/>}>Create an Account
            </Button>
        </>
    );
}

export default Home;
