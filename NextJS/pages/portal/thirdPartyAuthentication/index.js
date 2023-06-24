import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {apiService, authService} from 'authscape';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Home({loadedUser, setIsLoading, currentUser}) {

  const [archiveTicketId, setArchiveTicketId] = useState(null);
  
  const columns = [
    { field: 'title', flex:1, headerName: 'Name', width: 150 },
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
      <title>Companies</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Layout currentUser={currentUser}>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='inherit' elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Companies
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

            }}>Create Company</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{height: 600, width: '100%' }}>
        
        
        
        <EditableDatagrid loadedUser={loadedUser} url={"/Companies"} height={"85vh"} columns={columns} />


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
