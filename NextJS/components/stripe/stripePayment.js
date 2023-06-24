import React, {useEffect, useState} from 'react';
import {Elements, useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Box from '@mui/material/Box';
import { Button, Tab, Tabs } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import { apiService } from 'authscape';


const CheckoutForm = ({payButtonText, clientSecret, onResponse, amount, name, email}) => {

    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  
    const stripe = useStripe();
    const elements = useElements();
  
    const [errorMessage, setErrorMessage] = useState(null);
  
    const handleSubmit = async (event) => {
  
      setIsPaymentProcessing(true);
  
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
  
        //setIsPaymentProcessing(false);
        return;
      }
  
    //   alert(clientSecret)
    //   if (amount == null)
    //   {
        const {error} = await stripe.confirmSetup({
          //`Elements` instance that was used to create the Payment Element
          elements,
          redirect:"if_required",
          // confirmParams: {
          //   return_url: process.env.WebsiteBaseUri + '/confirmSetup?redirectUrl=' + encodeURIComponent(window.location.search),
          // },
        });
    
        if (error) {
          // This point will only be reached if there is an immediate error when
          // confirming the payment. Show error to your customer (for example, payment
          // details incomplete)
          setIsPaymentProcessing(false);
          setErrorMessage(error.message);
        } else {
          // Your customer will be redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer will be redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
    
          //setIsPaymentProcessing(false);
    
          let response = null;
    
          response = await stripe.retrieveSetupIntent(clientSecret);
  
          let setupIntent = response.setupIntent;
    
          switch (setupIntent.status) {
            case 'succeeded':

                // response contains the wallet Id after creating the Payment Method
                let response = await apiService().post("/Payment/AddPaymentMethod", {
                    paymentMethodId: setupIntent.payment_method
                });

                if (response != null && response.status == 200)
                {
                    // charge the account
                    let chargeResponse = await apiService().post("/Payment/Charge", {
                        walletId: response.data,
                        chargeAmount: amount
                    });

                    if (chargeResponse != null && chargeResponse.status == 200)
                    {
                        alert("Account Should be charged");
                    }
                }

    
              // need to store the payment intent with the customer if they are logged in... currentUser
              onResponse("succeeded", setupIntent.id, setupIntent.payment_method);
              break;
    
            case 'processing':
              onResponse("processing", setupIntent.id, setupIntent.payment_method);
              setIsPaymentProcessing(false);
              break;
    
            case 'requires_payment_method':
              onResponse("requires_payment_method", null);
              setIsPaymentProcessing(false);
              break;
    
            default:
              onResponse("failed", null);
              setIsPaymentProcessing(false);
              break;
          }
        }
  
    //   }
    //   else
    //   {
    //     const {error} = await stripe.confirmPayment({
    //       //`Elements` instance that was used to create the Payment Element
    //       elements,
    //       redirect:"if_required",
    //       confirmParams: {
    //         return_url: process.env.WebsiteBaseUri + '/confirmPayment?redirectUrl=' + encodeURIComponent(window.location.search),
    //       },
    //     });
    
    //     if (error) {
    //       // This point will only be reached if there is an immediate error when
    //       // confirming the payment. Show error to your customer (for example, payment
    //       // details incomplete)
    //       setIsPaymentProcessing(false);
    //       setErrorMessage(error.message);
    //     } else {
    //       // Your customer will be redirected to your `return_url`. For some payment
    //       // methods like iDEAL, your customer will be redirected to an intermediate
    //       // site first to authorize the payment, then redirected to the `return_url`.
    
    //       let response = null;
    
    //       if (amount == null)
    //       {
    //         response = await stripe.retrieveSetupIntent(clientSecret);
    //       }
    //       else
    //       {
    //         response = await stripe.retrievePaymentIntent(clientSecret);
    //       }
          
    //       let paymentIntent = response.paymentIntent;
    
    //       switch (paymentIntent.status) {
    //         case 'succeeded':
    
    //           // need to store the payment intent with the customer if they are logged in... currentUser
    //           onResponse("succeeded", paymentIntent.id);
    //           break;
    
    //         case 'processing':
    //           onResponse("processing", paymentIntent.id);
    //           setIsPaymentProcessing(false);
    //           break;
    
    //         case 'requires_payment_method':
    //           onResponse("requires_payment_method", null);
    //           setIsPaymentProcessing(false);
    //           break;
    
    //         default:
    //           onResponse("failed", null);
    //           setIsPaymentProcessing(false);
    //           break;
    //       }
  
          
    //     }
    //   }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <Button startIcon={<PaymentRoundedIcon/>} type="submit" fullWidth={true} variant="contained" disabled={(!stripe || isPaymentProcessing)} sx={{marginTop:2, padding:2}}>{payButtonText}</Button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    )
};




const StripePayment = ({loadedUser, currentUser, paymentType = 3, amount, priceId, name = null, email = null, payButtonText = "Pay", onResponse}) => {

    const stripePromise = loadStripe(process.env.stripePublicKey);
    const [options, setOptions] = useState(null);
    const [value, setValue] = useState(0);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(null);

    const paymentMethodOpened = async (name, email) => {

        let response = null;
        if (currentUser == null)
        {
            response = await apiService().post("/Payment/ConnectCustomerNoAuth", {
                paymentRequestType: paymentType,
                amount: amount,
                priceId: priceId,
                name: name,
                typeOfPayment: 1,
                email: email,
            });
        }
        else
        {
            response = await apiService().post("/Payment/ConnectCustomer", {
                paymentRequestType: paymentType,
                amount: amount,
                priceId: priceId,
                typeOfPayment: 1,
            });
        }
        

        if (response != null && response.status == 200)
        {
            setOptions({
                clientSecret: response.data,
            });

            let responsePayments = await apiService().get("/Payment/GetPaymentMethods");
            if (responsePayments != null && responsePayments.status == 200)
            {
                if (responsePayments.data.length > 0)
                {
                    setValue(1);
                }
                setPaymentMethods(responsePayments.data);
            }
        }
    }

    useEffect(() => {
        if (loadedUser)
        {
            const fetchData = async () => {
                await paymentMethodOpened(name, email);
            }
            fetchData();
        }
    }, [loadedUser]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const PaymentMethod = ({paymentMethod, clicked}) => {
        return (
            <Box fullWidth={true} sx={{height: 160, width:"100%", marginTop:2, backgroundColor:"#2196F3", position:"relative", border: "1px solid #2196F3", borderRadius: 1, display:"flex", flexDirection:"column", justifyContent:"center", textAlign:"center", cursor:"pointer"}}
                onClick={() => {
                    clicked(paymentMethod.id);
                }}>
                <Typography gutterBottom variant="body" component="div" sx={{fontSize:14, position:"absolute", left:15, top:10, color:"white"}}>
                    {paymentMethod.brand}
                </Typography>
                <Typography gutterBottom variant="body" component="div" sx={{verticalAlign:"middle", fontSize:18, color:"white"}}>
                    * * * * &nbsp; * * * * &nbsp; * * * * &nbsp; {paymentMethod.last4}
                </Typography>

                <Grid container spacing={1} sx={{position:"absolute", bottom:8, marginLeft:0, width: "100%"}}>
                    <Grid item xs={12} sx={{textAlign:"right", paddingRight:2}}>
                        <Typography gutterBottom variant="body" component="div" sx={{fontSize:12, marginLeft:2, marginTop:1, color:"#e9e9e9"}}>
                            EXPIRES
                        </Typography>

                        <Typography gutterBottom variant="body" component="div" sx={{fontSize:12, marginLeft:2, marginTop:"-9px", color:"white"}}>
                            {paymentMethod.expMonth}/{paymentMethod.expYear}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        );
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                {children}
              </Box>
            )}
          </div>
        );
    }

    const PaymentContent = ({name, email, payButtonText}) => {
        return (            
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Add Payment Method" {...a11yProps(0)} />
                        {paymentMethods.length > 0 &&
                            <Tab label="Existing Payment Method" {...a11yProps(1)} />
                        }
                    </Tabs>
                </Box>
                {paymentMethods.length > 0 &&
                <TabPanel value={value} index={1}>

                    <Select
                        sx={{marginTop:4}}
                        fullWidth={true}
                        value={paymentMethod}
                        onChange={(val) => {
                            setPaymentMethod(val.target.value);
                        }}>
                            {paymentMethods != null && paymentMethods.map((paymentMethod, index) => {
                                return (
                                <MenuItem key={index} value={paymentMethod.id} fullWidth={true} sx={{width:"100%"}}>
                                    <PaymentMethod paymentMethod={paymentMethod} clicked={() => {
                                    }} />
                                </MenuItem>)
                            })}
                    </Select>

                    <Button startIcon={<PaymentRoundedIcon/>} type="submit" variant="contained" disabled={paymentMethod == null} sx={{marginTop:2}} onClick={async () => {

                        if (invoiceId != null)
                        {
                            setIsLoading(true);
                            let response = await apiService().post("/Invoices/PayInvoice", {
                                InvoiceId: invoiceId,
                                WalletId: paymentMethod
                            });
                            setIsLoading(false);

                            if (response != null && response.status == 200)
                            {
                                window.location.reload();
                            }
                            else
                            {
                                alert("We had an issue with the payment method");
                            }
                        }

                    }}>{payButtonText}</Button>

                </TabPanel>
                }

                <TabPanel value={value} index={0}>
                    <Box mt={4}>
                        {(options != null && process.env.stripePublicKey != null) &&
                            <Elements stripe={stripePromise} options={options}>
                                <CheckoutForm payButtonText={payButtonText} clientSecret={options != null ? options.clientSecret : null} onResponse={onResponse} amount={amount} />
                            </Elements>
                        }
                    </Box>
                </TabPanel>
            </Box>
        )
    }

    return (
        <>
            <PaymentContent name={name} email={email} payButtonText={payButtonText} />
        </>
    )


}




export default StripePayment;