import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/Error";
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WalletIcon from "@mui/icons-material/Wallet";
import {getItemDecrypted} from "../../helpers/storage";
import {toast} from "react-toastify";
import {api} from "../../helpers/api";
import {checkRedeem, getConfig} from "../../helpers/common";
import NoHeart from "../../components/NoHeart/NoHeart";
import Loading from "../../components/Loading";
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line
const Exchange = () => {
    const config = getConfig();
    const user = getItemDecrypted(config.userStoreKey);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [amountReceived, setAmountReceived] = useState(0);
    const [balanceHearts, setBalanceHearts] = useState(0);
    const [balanceAmount, setBalanceAmount] = useState(0);
    const {
        register,
        setError,
        formState: {errors},
        handleSubmit
    } = useForm();
    let totalHearts, amount;
    let ratingData = {
        result: null,
        loading: false
    };
    if (user) {
        ratingData = useFetch(`users/${user.id}/ratings`);
        totalHearts = ratingData.result?.meta.rating;
        amount = totalHearts * config.exchangeRate;
    }

    useEffect(() => {
        if (user) {
            if (!checkRedeem(user)) {
                navigate("/redeem");
            }

            setBalanceHearts(totalHearts);
            setBalanceAmount(amount);
        } else {
            navigate("/");
        }
    }, [totalHearts, amount]);

    const calculateAmountReceived = e => {
        const hearts = e.target.value * 1;
        const value = hearts * config.exchangeRate;
        const diffHearts = totalHearts - hearts;
        const diffAmount = amount - value;

        setAmountReceived(value);
        setBalanceHearts(diffHearts > 0 ? diffHearts : 0);
        setBalanceAmount(diffAmount > 0 ? diffAmount : 0);
    };

    const onSubmit = async data => {
        const {result, error} = await api(`users/${user.id}/exchange`, "POST", data, {
            loading: setLoading
        });

        if (result && result.data.id) {
            toast.success(`Congrats! You got ${data.hearts * config.exchangeRate} ${config.currencyUnit}.`, config.toastOptions);
        }

        if (error) {
            error.map(err => setError(err.field, {type: "custom", message: err.message}));
        }
    };

    return (
        <>
            {(ratingData?.loading || loading) && <Loading/>}
            <Header title="အသည်းနှင့်မုန့်ဖိုးလဲလှယ်ရန်" customClass="my"/>
            <div className="container">
                {!ratingData?.loading ?
                    <>
                        <Card className="mb-2">
                            <CardContent>
                                <Typography variant="subtitle1" component="div">
                                    <FavoriteIcon/> <span className="my">အသည်းလက်ကျန်စုစုပေါင်း <strong>{balanceHearts} ခု</strong></span>
                                </Typography>
                                <Typography variant="subtitle1" component="div">
                                    <WalletIcon/> <span className="my">တန်ဖိုးငွေ</span> <strong>{balanceAmount.toLocaleString()} {config.currencyUnit}</strong>
                                </Typography>
                            </CardContent>
                        </Card>
                        { totalHearts >= config.minHeart ?
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <div className="label paragraph my">မုန့်ဖိုးနှင့်လဲမည့်အသည်းအရေအတွက်ထည့်ရန်</div>
                                    <Error field={errors.hearts}/>
                                    <TextField label="No. of Hearts to be exchanged"
                                               {...register("hearts", {
                                                   required: "မုန့်ဖိုးနှင့်လဲမည့်အသည်းအရေအတွက်ကိုထည့်ပေးပါ",
                                                   min: {
                                                       value: config.minHeart,
                                                       message: `အနည်းဆုံး အသည်းအခု ${config.minHeart} ထည့်ရန်လိုပါသည်`
                                                   },
                                                   max: {
                                                       value: totalHearts,
                                                       message: `အများဆုံး အသည်း ${totalHearts} ခုပဲ လဲလို့ရပါမည်`
                                                   },
                                               })}
                                               inputProps={{
                                                   type: "number",
                                                   inputMode: "numeric",
                                                   pattern: "[0-9]*",
                                                   autoFocus: true
                                               }}
                                               required fullWidth id="outlined-name" variant="outlined"
                                               onChange={calculateAmountReceived} />
                                </div>
                                <div className="form-control">
                                    <div className="label paragraph my">ရရှိမည့်မုန့်ဖိုး</div>
                                    <Typography variant="h5" component="div">
                                        {(amountReceived).toLocaleString()} {config.currencyUnit}
                                    </Typography>
                                </div>
                                <div className="form-control">
                                    <div className="label paragraph my">မှတ်ချက်</div>
                                    <TextField label="Remarks"
                                               {...register("remarks")}
                                               multiline fullWidth rows={2}/>
                                </div>
                                <div className="form-control">
                                    <Button onClick={handleSubmit(onSubmit)}
                                            disabled={loading}
                                            className="margin-button"
                                            variant="contained"
                                            size="large"
                                            fullWidth={true}>
                                        <span className="my">လဲမယ်</span>
                                    </Button>
                                </div>
                            </form>
                            :
                            <NoHeart msg={`အနည်းဆုံး အသည်း (${config.minHeart})ခု ရှိရန်လိုပါသည်။`} />
                        }
                    </>
                    : ""
                }
            </div>
            <Navbar/>
        </>
    );
};

export default Exchange;
