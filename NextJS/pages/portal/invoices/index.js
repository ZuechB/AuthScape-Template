import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {FileUploader, apiService, authService} from 'authscape';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Layout from "../../../components/portalLayout";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import YesNoDialog from '../../../components/yesNoDialog';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {EditableDatagrid} from 'authscape';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GridActionsCellItem } from '@mui/x-data-grid';

export default function Home({loadedUser, setIsLoading, currentUser}) {

  const [archiveTicketId, setArchiveTicketId] = useState(null);
  
  const columns = [
    { field: 'total', headerName: 'Total', width: 150 },
    { field: 'client', flex: 1, headerName: 'Client', width: 200 },
    { field: 'location', flex: 1, headerName: 'Location', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'billingPeriod', headerName: 'Billing Period', width: 150 },
    { field: 'dueDate', headerName: 'Due Date', width: 150 },
    {
      field: "actions",
      type: "actions",
      width: 200,
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem key={id}
            icon={<VisibilityRoundedIcon />}
            label="View"
            onClick={() => {
              window.location.href = "/ticket/" + row.id;
            }}
          />,
          <GridActionsCellItem key={id}
            icon={<DeleteRoundedIcon />}
            label="Archive"
            className="textPrimary"
            onClick={() => {
              setArchiveTicketId(row.id);
            }}
          />,
        ];
      },
    }
  ];

  return (
  <div>
    <Head>
      <title>Invoices</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Layout currentUser={currentUser}>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='inherit' elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Invoices
            </Typography>
            <Button color="primary" variant="contained" startIcon={<AddRoundedIcon/>} onClick={async () => {

              // upload a invoice for a customer
              
              let response = await apiService().post("/Invoices/CreateInvoice");
              if (response != null && response.status == 200)
              {
                let invoiceId = response.data.item1;
                let secret = response.data.item2;
              }

              // window.location.href = "/ticket/" + response.data;

            }}>Create Invoice</Button>


            

            <FileUploader url={"/Invoices/UploadInvoiceFile"} params={null} multiple={true} variant='custom' onUploadCompleted={() => {
                    setUpdate(!update);
                    handleClose();
                  }}>

                  <Button color="primary" variant="contained" startIcon={<PublishRoundedIcon/>} sx={{marginLeft:2}}>Upload Invoice</Button>

            </FileUploader>




          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{height: 600, width: '100%' }}>
        
        
        
        <EditableDatagrid loadedUser={loadedUser} url={"/Invoices/GetInvoices"} height={"85vh"} columns={columns} />


      </Box>

      <YesNoDialog open={archiveTicketId != null ? true : false} title={"Remove Ticket"} message={"Are you sure you want to archive this ticket?"} 
        YesAction={async () => {
          await apiService().delete("/Ticket/ArchiveTicket?id=" + archiveTicketId);
          await reloadTickets();
          setArchiveTicketId(null);
        }} 
        NoAction={() => {
          setArchiveTicketId(null);
        }} />
    </Layout>
  </div>
    
  )
}