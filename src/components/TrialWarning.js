import {Alert, Button} from "@mui/material";
import {Link} from "react-router-dom";
import {RedeemOutlined} from "@mui/icons-material";

// eslint-disable-next-line
const TrialWarning = ({ user }) => {
    let duration = null;
    if (user.expiry !== null) {
        const time = [];
        if (user.expiry.d > 0) time.push(`${user.expiry.d} ရက်`);
        if (user.expiry.h > 0) time.push(`${user.expiry.h} နာရီ`);
        if (user.expiry.m > 0) time.push(`${user.expiry.m} မိနစ်`);

        if (time.length > 0) {
            duration = time.join(" ");
        }
    }

    return (
        duration !== null ?
            <Alert severity="warning" className="mt-0">
                <span className="my mb-1 d-inline-block">အစမ်းသုံးကာလသည် နောက် {duration}အတွင်းပြီးဆုံးပါမည်။</span>&nbsp;
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
