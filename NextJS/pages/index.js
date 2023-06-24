import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {apiService, authService} from 'authscape';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import StripePayment from '../components/stripe/stripePayment';
import Comments from '../components/comments';


export default function Home({loadedUser, setIsLoading, currentUser, setOpenLoginModal}) {

  const [paymentLink, setPaymentLink] = useState("");

  const [showInvoicePayment, setShowInvoicePayment] = useState(false);
  const [invoicePayload, setInvoicePayload] = useState(null);
  const [ticketId, setTicketId] = useState(null);

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome to AuthScape</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {currentUser == null &&
        <>
          <Button variant="contained" sx={{marginRight:1}} onClick={async () => {
            await authService().login();
          }}>Login</Button>

          <Button variant="contained" sx={{marginRight:1}} onClick={async () => {
            setOpenLoginModal(true);
          }}>Login With Modal (Experimental)</Button>

          <Button variant="contained" sx={{marginRight:1}} onClick={async () => {

            await authService().signUp();

          }}>Create Account</Button>
        </>
      }

      {currentUser != null &&
      <>
        <div>
          Welcome {currentUser.firstName}!
        </div>

        <Button variant="contained" onClick={async () => {
            await authService().logout();
          }}>Logout</Button>
      </>
      }



    <Box sx={{marginTop:6}}>
      Payments System
    </Box>

    <Box sx={{marginTop:1}}>
      <Button variant="contained" onClick={async () => {
        
        let response = await apiService().post("/Payment/GeneratePaymentLink", {
          productName: "Hello World",
          price: 5.96,
          qty: 3
        });

        if (response != null && response.status == 200)
        {
          setPaymentLink(response.data)
        }

      }} sx={{marginTop:1}}>Generate Payment Link</Button>

      <Button variant="contained" onClick={async () => {
        
        setIsLoading(true);
        let response = await apiService().get("/Payment/SetupStripeConnect");
        if (response != null && response.status == 200)
        {
          window.open(response.data);
        }
        setIsLoading(false);

      }} sx={{marginTop:1, marginLeft:1}}>Setup Connect with Partner (In Development)</Button>


      <Button variant="contained" onClick={async () => {
        
        window.location.href = "/portal";

      }} sx={{marginTop:1, marginLeft:1}}>Portal</Button>

      <Button variant="contained" onClick={async () => {
        
        await authService().manageAccount();

      }} sx={{marginTop:1, marginLeft:1}}>Manage Account</Button>


      {paymentLink &&
        <Box sx={{marginTop:1}}>
          <span>Payment Link: {paymentLink}</span>
        </Box>
      }
    </Box>
    
      

    <Box sx={{marginTop:6}}>
      Payment Methods
    </Box>






    <StripePayment
        loadedUser={loadedUser}
        currentUser={currentUser}
        amount={50.20}
        payButtonText={"Pay"}
        invoiceId={null} // this is the authscape invoice number (long type)
        onResponse={async (response, id, paymentMethod) => {

          switch (response) {
            case 'succeeded':
              alert("succeeded: " + id + " paymentMethod: " + paymentMethod);
              
              break;
    
            case 'processing':
              alert("processing: " + id);
              break;
    
            case 'requires_payment_method':
              alert("requires_payment_method");
              break;
    
            default:
              alert("failed");
              break;
          }

          setShowInvoicePayment(false);

        }}
    />






    </div>
  )
}
