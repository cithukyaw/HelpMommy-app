import Header from "../../components/Header/Header";
import Error from "../../components/Error";
import {Button, TextField, Typography} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import {useForm} from "react-hook-form";
import {makeRequest} from "../../helpers/httpRequest";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getConfig} from "../../helpers/common";
import {getItemDecrypted, storeItemEncrypted} from "../../helpers/storage";

const Redeem = () => {
    const config = getConfig();
    const user = getItemDecrypted(config.userStoreKey);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        setError,
        formState: {errors},
        handleSubmit
    } = useForm();

    const onSubmit = async data => {
        const {result, error} = await makeRequest(`users/${user.id}/redeem`, "POST", data, {
            loading: setLoading
        });

        if (result && result.data.id) {
            storeItemEncrypted(config.userStoreKey, result.data);

            navigate("/dashboard");
        }

        if (error) {
            error.map(err => setError(err.field, {type: "custom", message: err.message}));
        }
    };

    return (
        <>
            <Header title="Redeem"/>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <div className="label paragraph">တစ်သက်စာသုံးစွဲခွင့်ကုဒ်ကိုရိုက်ထည့်ပေးပါ။</div>
                        <Error field={errors.code} />
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
                           required fullWidth inputProps={{ minLength: 6, maxLength: 6 }}
                           id="outlined-code" label="Redeem Code" variant="outlined" />
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
                        <p className="text-center">တစ်သက်စာသုံးစွဲခွင့်ကုဒ်မရှိသေးပါက Facebook page မှတစ်ဆင့် (သို့) ဖုန်းဖြင့် ဆက်သွယ်၍ အစောဆုံးအသုံးပြုခွင့် အထူးနှုန်း <strong>၃၀၀၀ ကျပ်</strong>ဖြင့် ဝယ်ယူနိုင်ပါသည်။</p>
                        <Button href="https://facebook.com" target="_blank" rel="noopener"
                                variant="contained"
                                size="large"
                                startIcon={<SendIcon/>}
                                fullWidth>FB Messenger မှဆက်သွယ်ရန်</Button>

                        <Button href={`tel:${process.env.REACT_APP_CONTACT_NO}`} className="mt-2"
                                variant="outlined"
                                size="large"
                                startIcon={<LocalPhoneIcon/>}
                                fullWidth>ဖုန်းဖြင့်ဆက်သွယ်ရန်</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Redeem;
