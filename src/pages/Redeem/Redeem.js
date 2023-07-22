import Header from "../../components/Header/Header";
import Error from "../../components/Error";
import {Button, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {useForm} from "react-hook-form";
import {makeRequest} from "../../helpers/httpRequest";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getConfig} from "../../helpers/common";
import {getItem} from "../../helpers/storage";

const Redeem = () => {
    const config = getConfig();
    const user = getItem(config.userStoreKey);
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
                        <div className="label paragraph">စာလုံး(၆)လုံးပါ Redeem ကုဒ်ကို ရိုက်ထည့်ပေးပါ။</div>
                        <Error field={errors.code} />
                        <TextField {...register("code", {
                                required: "သင်ဝယ်ထားသော redeem code ကိုရိုက်ထည့်ပေးပါ",
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
                                fullWidth>Continue</Button>
                    </div>
                    <div className="card">
                        <p className="text-center">Redeem code မရှိသေးပါက Facebook page မှတစ်ဆင့် ဆက်သွယ်၍ (သို့) ဖုန်းဖြင့်ဆက်သွယ်၍ ၃၀၀၀ ကျပ်ဖြင့် ဝယ်ယူနိုင်ပါသည်။</p>
                        <Button href="https://facebook.com" target="_blank" rel="noopener"
                                variant="contained"
                                size="large"
                                startIcon={<SendIcon/>}
                                fullWidth>Contact on Messenger</Button>

                        <Button href={`tel:${process.env.REACT_APP_CONTACT_NO}`} className="mt-2"
                                variant="outlined"
                                size="large"
                                startIcon={<LocalPhoneIcon/>}
                                fullWidth>Call</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Redeem;
