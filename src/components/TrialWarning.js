import {Alert, Button} from "@mui/material";
import {Link} from "react-router-dom";
import {RedeemOutlined} from "@mui/icons-material";

// eslint-disable-next-line
const TrialWarning = ({ user }) => {
    return (
        user.expiry !== null ?
            <Alert severity="warning" className="mt-0">
                Your trial period will end in {user.expiry.d} days and {user.expiry.h} hrs.&nbsp;
                <Button variant="contained" color="success" size="small"
                        component={Link} to="/redeem" startIcon={<RedeemOutlined/>}>
                    Redeem
                </Button>
            </Alert>
            :
            <></>
    );
};

export default TrialWarning;
