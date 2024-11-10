/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link, Modal, Container, TextField, Button, CircularProgress, Typography, Grid, Box, RadioGroup, FormControlLabel, Radio, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useCart } from '../context/CartContext';
import { ServerURL } from '../server/serverUrl';
import { ImagePathRoutes } from '../routes/ImagePathRoutes';
import Calendar from '../components/datePicker';
import { API_FetchDeliveryTimes } from '../services/settings';
import { API_InsertSaleOrderSave } from '../services/checkoutServices';
import { useTheme } from '@mui/material/styles';
import CircularLoader from '../components/circular-loader';
import OrderSuccess from '../assets/success.gif';
import OrderInfo from '../assets/information.gif';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '100%', sm: '100%', md: 280, lg: 300, xl: 300},
    bgcolor: 'background.paper',
    py: 2,
    borderRadius: 1
};

export default function ProductCheckout() {
    const { cartItems, setCartItems } = useCart();
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [MRPAmount, setMRPAmount] = React.useState(0);
    const [SavingsAmount, setSavingsAmount] = React.useState(0);
    const [TotalPrice, setTotalPrice] = React.useState(0);
    const [ExtraDiscount, setExtraDiscount] = React.useState(0);
    const [HandlingCharge, setHandlingCharge] = React.useState(0);
    const [DeliveryFee, setDeliveryFee] = React.useState(0);
    const [walletAmount, setwalletAmount] = React.useState(0);
    const [DeliveryTimeList, setDeliveryTimeList] = React.useState([]);
    const [DateValue, setDateValue] = React.useState(null);
    const [DeliverytimeId, setDeliverytimeId] = React.useState(0);
    const [Deliverytime, setDeliverytime] = React.useState('');
    const [PaymentType, setPaymentType] = React.useState('');
    const [selectedAddress, setSelectedAddress] = React.useState('');
    const [InfoStatus, setInfoStatus] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [showLoader, setShowLoader] = React.useState(false);

    const [AlertOpen, setAlertOpen] = React.useState(false);
    const handleAlertOpen = () => setAlertOpen(true);

    const handleAlertClose = () => {
        if (InfoStatus === 'Your order has been placed') {
            navigate('/');
        }
        setAlertOpen(false);
    };

    //Load delivery time lists
    const FetchDeliveryTimes = async () => {
        try {
            const list = await API_FetchDeliveryTimes();
            setDeliveryTimeList(list);
        } catch (error) {
            setDeliveryTimeList([]);
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        FetchDeliveryTimes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const encodedWalletAmount = queryParams.get('Wallet');
        let amt = atob(encodedWalletAmount);
        setwalletAmount(Number(amt));

        let address = JSON.parse(sessionStorage.getItem('selectedAddress'));
        setSelectedAddress(address);

    }, [location.search, selectedAddress]);

    useEffect(() => {
        if (cartItems.length > 0) {
            const totalMRP = cartItems.reduce((acc, item) => acc + item.totalMRP, 0);
            const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

            setMRPAmount(totalMRP);
            setTotalPrice(totalPrice);
            setSavingsAmount(totalMRP - totalPrice);

            let useWallet = localStorage.getItem('UseWallet');
            if (useWallet) {
                setTotalPrice((prevPrice) => prevPrice - walletAmount);
            } else {
                setTotalPrice(totalPrice);
            }
        }
    }, [cartItems, walletAmount]);

    //Delivery date function
    const handleSelectDate = (newValue) => {
        setDateValue(newValue);
    };

    const handleDeliveryTime = (id, time) => {
        setDeliverytime(time);
        setDeliverytimeId(id);
    };

    const handlePaymentType = (type) => {
        setPaymentType(type);
    };

    //Place order function
    const handlePlaceOrder = () => {        
        if (Deliverytime === '') {
            setInfoStatus('Please choose delivery time');
            handleAlertOpen(true);
        }
        else if (DateValue === null) {
            setInfoStatus('Please select date');
            handleAlertOpen(true);
        }
        else if (PaymentType === '') {
            setInfoStatus('Please choose payment type');
            handleAlertOpen(true);
        }
        else {
            if(PaymentType === 'COD'){
                setAlertOpen(false);
                setShowLoader(true);
                const OrderDetails = [];
                if (cartItems.length > 0 && cartItems != null) {
                    for (let i = 0; i < cartItems.length; i++) {
                        let detailslist = {};
                        detailslist.ProductId = cartItems[i].Id;
                        detailslist.ProductName = cartItems[i].Description;
                        detailslist.MRP = cartItems[i].MRP;
                        detailslist.ItemQty = cartItems[i].item;
                        detailslist.DiscountAmt = (Number(cartItems[i].MRP) * 0) / 100;
                        detailslist.Salerate = cartItems[i].Price;
                        detailslist.WeightType = cartItems[i].UnitType;
                        detailslist.CPrice = cartItems[i].totalPrice;
                        OrderDetails[i] = detailslist;
                    }
                };
    
                const master = [
                    {
                        Id: 0,
                        CustomerRefId: selectedAddress.Id,
                        CompanyRefid: selectedAddress.CompanyRefId,
                        SaleDate: DateValue,
                        DeliveryDate: DateValue,
                        PaymentMode: PaymentType,
                        AreaMasterId: null,
                        deliveryStoreName: null,
                        DeliveryMode: "PICKUP",
                        DeliveryStatus: 0,
                        DeliveryCharge: DeliveryFee,
                        NewCustomerStatus: 0,
                        CouponDiscount: 0.0,
                        CouponRefId: 0,
                        OrderCount: 1,
                        ReferalAmount: 0.0,
                        Grossamt: Number(TotalPrice),
                        disper: 0,
                        discamount: 0,
                        schargeamount: 0,
                        TodaySaving: SavingsAmount,
                        ReferalBalance: 0,
                        WalletAmount: walletAmount,
                        WalletStatus: walletAmount > 0 ? 1 : 0,
                        WalletPayment: walletAmount,
                        coinage: 0,
                        NetAmount: Number(TotalPrice), //Final Total Amount
                        Remarks: "",
                        DeliveryTime: Deliverytime,
                        CutomerName: selectedAddress.CustomerName,
                        MobileNo: selectedAddress.MobileNo,
                        CompanyMobile: "",
                        CompanyEmail: "",
                        Email: selectedAddress.Email,
                        Address1: selectedAddress.Address1,
                        Address2: selectedAddress.Address2,
                        City: selectedAddress.City,
                        LandMark: selectedAddress.LandMark,
                        Pincode: selectedAddress.Pincode,
                        lattitude: selectedAddress.Latitude,
                        longitude: selectedAddress.Langitude,
                        SaleOrderDetails: OrderDetails,
                        //PaymentMode: $('#payment-method-wrapper').find('[name="paymentmethod"]:checked').val(),
                        // CompanyName: CompanyName != "" ? CompanyName : "",
                        // DeleteReason: "",
                        // PaymentId: PaymentId
                    },
                ];
                InsertSaleOrderSave(master);
            }
            else{
                setInfoStatus('Only COD payment available.');
                handleAlertOpen(true);
            }            
        }
    };

    //Order save API function
    const InsertSaleOrderSave = async (master) => {
        try {
            const response = await API_InsertSaleOrderSave(master);
            if (response.length !== 0) {
                setLoading(false);
                localStorage.removeItem('cartItems');
                setCartItems([]);
                setInfoStatus('Your order has been placed');
                setShowLoader(false);
                handleAlertOpen(true);
            }
            else {
                setLoading(false);
                setInfoStatus('Your order has been rejected.');
                setShowLoader(false);
                handleAlertOpen(true);
            }
        } catch (error) {
            console.error("Error inserting order details:", error);
            setLoading(false);
            setInfoStatus('Your order has been rejected.');
            setShowLoader(false);
            handleAlertOpen(true);
        }
    };


    return (
        <>
            <CircularLoader showLoader={showLoader} />
            <Modal
                open={AlertOpen}
                onClose={handleAlertClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} align='center'>
                    <Box>
                        <img src={InfoStatus === 'Your order has been placed' ? OrderSuccess : OrderInfo} style={{ width: '80px', height: '80px' }} alt='gif' />
                    </Box>
                    <Typography id="modal-modal-description">
                        {InfoStatus}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button sx={{
                            marginLeft: 'auto',
                            width: 'auto',
                            borderRadius: '3px',
                            padding: '2px 15px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            background: theme.palette.shadowcolorCode.main,
                            border: '1px solid',
                            borderColor: theme.palette.basecolorCode.main,
                            color: theme.palette.basecolorCode.main,
                            boxShadow: 'none',
                            '&:hover': {
                                border: '1px solid',
                                background: theme.palette.basecolorCode.main,
                                borderColor: theme.palette.basecolorCode.main,
                                color: theme.palette.whitecolorCode.main,
                                boxShadow: 'none',
                            }
                        }} size='small' onClick={handleAlertClose} variant='contained'>Okay</Button>
                    </Box>
                </Box>
            </Modal>
            <Container maxWidth="lg" sx={{ px: { xs: 0, md: 3, lg: 5 }, py: { xs: 0, md: 3 } }}>
                <Grid container spacing={4} style={{ padding: {xs: '0px', sm: '0px', md: '12px', lg: '20px', xl: '20px'} }}>
                    {/* Left Section - Delivery Address */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ border: '1px solid #3BB77' }} padding={3} mb={2}>
                            <Typography variant="h6" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <CheckCircleIcon color="success" style={{ marginRight: '10px' }} />
                                Delivery Address
                                <Button variant="outlined" size="small"
                                    sx={{
                                        marginLeft: 'auto',
                                        width: 'auto',
                                        borderRadius: '3px',
                                        padding: '2px 15px',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        background: theme.palette.shadowcolorCode.main,
                                        border: '1px solid',
                                        borderColor: theme.palette.basecolorCode.main,
                                        color: theme.palette.basecolorCode.main,
                                        boxShadow: 'none',
                                        '&:hover': {
                                            border: '1px solid',
                                            background: theme.palette.basecolorCode.main,
                                            borderColor: theme.palette.basecolorCode.main,
                                            color: theme.palette.whitecolorCode.main,
                                            boxShadow: 'none',
                                        }
                                    }}>Change address</Button>
                            </Typography>

                            {/* Address Form */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Address-1" value={selectedAddress.Address1} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Address-2" value={selectedAddress.Address2} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="City" value={selectedAddress.City} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Pincode" value={selectedAddress.Pincode} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Landmark" value={selectedAddress.Landmark} />
                                </Grid>
                            </Grid>
                        </Box>


                        {/* Delivery Time and Date */}
                        <Box padding={3} sx={{ paddingTop: 0 }}>
                            <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
                                <CheckCircleIcon color="success" style={{ marginRight: '10px' }} />
                                Delivery Time & Date
                            </Typography>

                            <RadioGroup style={{ marginTop: '10px' }}>
                                {DeliveryTimeList.map((item, index) => (
                                    <FormControlLabel value={item.Id} control={<Radio onChange={() => handleDeliveryTime(item.Id, item.Deliverytime)} value={item.Id} size="small" />} label={item.Deliverytime} />
                                ))}
                            </RadioGroup>
                            <Calendar DateValue={DateValue} handleSelectDate={handleSelectDate} />
                        </Box>

                        {/* Payment Method */}
                        <Box padding={3} sx={{ paddingTop: 1 }}>
                            <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
                                <CheckCircleIcon color="success" style={{ marginRight: '10px' }} />
                                Payment
                            </Typography>
                            <RadioGroup>
                                <FormControlLabel value="PayOnline" control={<Radio onChange={() => handlePaymentType('PayOnline')} size="small" />} label="Pay Online" />
                                <FormControlLabel value="COD" control={<Radio onChange={() => handlePaymentType('COD')} size="small" />} label="Cash on Delivery" />
                            </RadioGroup>

                            <Box sx={{ mt: 2, float: 'left' }}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={handlePlaceOrder}
                                    disabled={loading} // Disable the button while loading
                                    sx={{
                                        marginLeft: 'auto',
                                        float: 'right',
                                        borderRadius: '5px',
                                        padding: '5px 20px',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        border: '1px solid',
                                        borderColor: theme.palette.basecolorCode.main,
                                        background: theme.palette.basecolorCode.main,
                                        color: theme.palette.whitecolorCode.main,
                                        boxShadow: 'none',
                                        '&:hover': {
                                            background: theme.palette.basecolorCode.main,
                                            border: '1px solid',
                                            borderColor: theme.palette.basecolorCode.main,
                                            color: theme.palette.whitecolorCode.main,
                                            boxShadow: 'none',
                                        },
                                    }}
                                >
                                    {loading ? (
                                        <CircularProgress size={20} sx={{ color: theme.palette.whitecolorCode.main }} />
                                    ) : (
                                        'Place Order'
                                    )}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right Section - Order Summary */}
                    <Grid item xs={12} md={4} sx={{ px: { xs: 1, md: 3 } }}>
                        <Box sx={{ px: { xs: 1, md: 0 } }}>
                        <Typography align='left' variant="h6">Order Summary</Typography>
                        <Divider style={{ marginBottom: '20px' }} />
                        {cartItems.map((product, index) => (
                            <>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '7px' }}>
                                    <Box
                                        component="img"
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: '50px',
                                            marginRight: 0,
                                        }}
                                        src={ImagePathRoutes.ProductImagePath + product.Img0}
                                        alt={product.Description}
                                    />
                                    <Box>
                                        <Box align='left'>
                                            <Typography variant="p"
                                                sx={{
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    overflow: 'hidden',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    textOverflow: 'ellipsis',
                                                    lineHeight: '12px',
                                                    fontFamily: 'inherit',
                                                    minHeight: '20px',
                                                    width: '150px',
                                                    marginRight: 0,
                                                }}
                                            >
                                                {product.Description} <Typography variant="p" color="textSecondary"
                                                    sx={{
                                                        fontSize: '10px',
                                                    }}
                                                >
                                                    ({product.UnitType})
                                                </Typography>
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography align='left' variant="body2">Qty: {product.item} X {product.Price.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
                                            {/* <Typography variant="body2" align="right" style={{ color: 'green' }}>{product.totalMRP.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography> */}
                                        </Box>
                                    </Box>
                                </Box>
                                <Typography variant="body2" align="right" style={{ color: 'green' }}>{product.totalPrice.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
                            </Box>
                            </>
                        ))}

                        <Divider style={{ margin: '20px 0' }} />

                        <Box align='left' sx={{ width: '100%' }}>
                            <Grid container>
                                <Grid item xs={8} sx={{ mt: 0.5 }}>
                                    <Typography align='left' sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Item subtotal</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px' }} variant="body1" align="right">
                                        {MRPAmount.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px' }} variant="body1">Savings</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px' }} variant="body1" align="right" color="green">
                                        {SavingsAmount.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Extra discount</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px' }} variant="body1" align="right" color="green">
                                        {ExtraDiscount.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Handling charge</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px' }} variant="body1" align="right">
                                        {HandlingCharge.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </Grid>

                                <Grid item xs={8} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Delivery fee:</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px' }} variant="body1" align="right">
                                        {DeliveryFee.toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </Grid>

                                <Grid item xs={8} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px', borderBottom: 'dashed 1px lightgray', display: 'inline' }} variant="body1">Item total & GST</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ mt: 0.5 }}>
                                    <Typography sx={{ fontSize: '14px' }} variant="body1" align="right">
                                        {(TotalPrice + DeliveryFee + HandlingCharge - ExtraDiscount).toLocaleString('en-IN', { style: 'currency', currency: ServerURL.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
