import {Button} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import './Home.scss';

function Home() {
    return (
        <>
            <h1 className="text-center">Help Mommy</h1>
            <div className="block-img">
                <img src="/img/undraw_family.svg" alt="Help Mommy" className="img-fluid" />
            </div>
            <Button variant="contained" size="large" fullWidth="true" href="/login" startIcon={<LoginIcon/>}>Login</Button>
            <Button variant="outlined" size="large" fullWidth="true" href="/signup" startIcon={<HowToRegIcon/>}>Signup</Button>
        </>
    );
}

export default Home;
