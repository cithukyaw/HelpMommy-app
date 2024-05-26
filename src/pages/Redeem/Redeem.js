import Header from "../../components/Header/Header";
import Error from "../../components/Error";
import {Button, TextField, Typography} from "@mui/material";
// import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ChatIcon from "@mui/icons-material/Chat";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import {useForm} from "react-hook-form";
import {makeRequest} from "../../helpers/httpRequest";
import {useEffect, useRef, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {getConfig} from "../../helpers/common";
import {getItemDecrypted, storeItemEncrypted} from "../../helpers/storage";

const Redeem = () => {
    const config = getConfig();
    const user = getItemDecrypted(config.userStoreKey);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const tawkMessengerRef = useRef();
    const {
        register,
        setError,
        formState: {errors},
        handleSubmit
    } = useForm();

    const tawkCustomStyle = {
        visibility: {
            desktop: {
                yOffset: 60,
            },
            mobile: {
                yOffset: 60,
            }
        }
    };

    const onLoadChat = () => {
        if (user) {
            tawkMessengerRef.current.setAttributes({
                account: user.id,
                username: user.username
            });
        }
    };

    const showChat = () => {
        tawkMessengerRef.current.maximize();
    };

    const onSubmit = async data => {
        const {result, error} = await makeRequest(`users/${user.id}/redeem`, "POST", data, {
            loading: setLoading
        });

        if (result && result.data.id) {
            storeItemEncrypted(config.userStoreKey, result.data);
            tawkMessengerRef.current.hideWidget();

            navigate("/dashboard");
        }

        if (error) {
            error.map(err => setError(err.field, {type: "custom", message: err.message}));
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    });

    return (
        user &&
        <>
            <Header title="Redeem"/>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <div className="label paragraph my">တစ်သက်စာသုံးစွဲခွင့်ကုဒ်ကိုရိုက်ထည့်ပေးပါ။</div>
                        <Error field={errors.code}/>
                        <TextField {...register("code", {
                            required: "သင်ဝယ်ထားသောအသုံးပြုခွင့်ကုဒ်ကိုရိုက်ထည့်ပေးပါ",
                            minLength: {
                                value: 6,
                                message: "စာလုံးရေ(၆)လုံးထိရိုက်ထည့်ပေးပါ"
                            },
                            maxLength: {
                                value: 6,
                                message: "စာလုံးရေ(၆)လုံးသာရိုက်ထည့်ပေးပါ"
                            }
                        })}
                                   required fullWidth inputProps={{minLength: 6, maxLength: 6}}
                                   id="outlined-code" label="Redeem Code" variant="outlined"/>
                    </div>
                    <div className="form-control">
                        <Button onClick={handleSubmit(onSubmit)}
                                disabled={loading}
                                className="margin-button"
                                variant="contained"
                                size="large"
                                color="success"
                                fullWidth>စတင်အသုံးပြုမည်</Button>
                    </div>
                    <div className="card">
                        <Typography gutterBottom variant="h6" component="div" className="text-center">
                            <CardGiftcardIcon/> EARLY ACCESS <CardGiftcardIcon/>
                        </Typography>
                        <p className="text-center my">တစ်သက်စာသုံးစွဲခွင့်ကုဒ်
                            မရှိသေးပါက <strong>HelpMommy</strong> Facebook page chatbox မှတစ်ဆင့် (သို့) အောက်မှာ LIVE
                            CHAT ဖြင့်ဆက်သွယ်၍ အစောဆုံးအသုံးပြုခွင့် အထူးနှုန်း <strong>၅၀၀၀ ကျပ်</strong>ဖြင့်
                            ဝယ်ယူနိုင်ပါသည်။</p>
                        <Button onClick={showChat}
                                variant="contained"
                                size="large"
                                startIcon={<ChatIcon/>}
                                fullWidth>LIVE CHAT</Button>

                        {/*<Button href={`tel:${process.env.REACT_APP_CONTACT_NO}`} className="mt-2"*/}
                        {/*        variant="outlined"*/}
                        {/*        size="large"*/}
                        {/*        startIcon={<LocalPhoneIcon/>}*/}
                        {/*        fullWidth>*/}
                        {/*    <span className="my">ဖုန်းဖြင့်ဆက်သွယ်ရန်</span>*/}
                        {/*</Button>*/}
                    </div>
                </form>
                <p className="text-center">
                    <NavLink to="/dashboard">Back to Home</NavLink>
                </p>
            </div>
            <TawkMessengerReact
                propertyId={process.env.REACT_APP_TAWK_PROPERTY_ID}
                widgetId={process.env.REACT_APP_TAWK_WIDGET_ID}
                customStyle={tawkCustomStyle}
                onLoad={onLoadChat}
                ref={tawkMessengerRef}/>
        </>
    );
};

export default Redeem;
