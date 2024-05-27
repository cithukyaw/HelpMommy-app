import {Alert, Button} from "@mui/material";
import {Link} from "react-router-dom";
import {RedeemOutlined} from "@mui/icons-material";

// eslint-disable-next-line
const TrialWarning = ({ user }) => {
    return (
        user.expiry !== null ?
            <Alert severity="warning" className="mt-0">
                <span className="my">အစမ်းသုံးကာလသည် နောက် {user.expiry.d} ရက် {user.expiry.h} နာရီအတွင်းပြီးဆုံးပါမည်။</span>&nbsp;
                <Button variant="contained" color="success" size="small"
                        component={Link} to="/redeem" startIcon={<RedeemOutlined/>}>
                    <span className="my">တစ်သက်စာသုံးစွဲခွင့်ရယူရန်</span>
                </Button>
            </Alert>
            :
            <></>
    );
};

export default TrialWarning;
