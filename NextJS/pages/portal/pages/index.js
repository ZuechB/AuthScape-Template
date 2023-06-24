import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import {apiService} from 'authscape';
import Layout from "../../../components/portalLayout";
import Link from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';

import {
    DataGrid,
    GridActionsCellItem,
  } from "@mui/x-data-grid";

const Index = ({currentUser}) => {

    const [title, setTitle] = useState(null);
    const [pageType, setPageType] = useState(1);
    const [open, setOpen] = React.useState(false);
    const [pages, setPages] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSaveChanges = async () => {

        if (title != null)
        {
            let response = await apiService().post("/ContentManagement/CreatePage", {
                Title: title,
                PageType: 1 //parseInt(pageType)
            });

            if (response != null && response.status == 200)
            {
                setTitle(null)
                setOpen(false);
                await RefreshPages();
            }
        }
    }

    const handleDelete = (pageId) => {

        swal({
            title: "Delete Page",
            text: "Are you sure you want to delete this page",
            icon: "warning",
            buttons:  ["No", "Yes"],
            dangerMode: true,
        })
        .then(async (willDelete) => {
            if (willDelete) {
                await apiService().delete("/ContentManagement/Delete?id=" + pageId);
                RefreshPages();
            }
        });
    }

    useEffect(() => {
        RefreshPages();
    }, []);

    const RefreshPages = async () => {

        let response = await apiService().get("/ContentManagement/GetPages");
        if (response != null)
        {
            setPages(response.data);
        }
    }

    const columns = [
        { field: 'title', headerName: 'Title', width: 200, editable: false },
        { field: 'pageType', headerName: 'PageType', width: 200, editable: false },
        {
          field: 'slug',
          headerName: 'Slug',
          width: 200,
          editable: false,
        },
        {
          field: 'created',
          headerName: 'Created',
          width: 200,
          editable: false,
        },
        {
            field: 'lastUpdated',
            headerName: 'LastUpdated',
            width: 200,
            editable: false,
        },
        {
            field: "actions",
            type: "actions",
            width: 200,
            headerName: "Actions",
            cellClassName: "actions",
            getActions: ({ id, row }) => {
              return [
                <GridActionsCellItem key={id}
                  icon={<NoteAltRoundedIcon />}
                  label="Edit"
                  onClick={() => {
                    window.location.href = "/portal/editor/" + row.id;
                  }}
                />,
                <GridActionsCellItem key={id}
                  icon={<DeleteRoundedIcon />}
                  label="Delete"
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
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>Pages</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <Layout currentUser={currentUser}>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h1 className="m-0 font-weight-bold text-primary">Pages</h1>
                    <div className="text-right">

                        <Fab onClick={handleClickOpen} color={"primary"} sx={{position:"absolute", bottom:20, right:20}}>
                            <AddIcon />
                        </Fab>

                    </div>
                </div>
                <Box sx={{width:"100%",  height: 300}}>
                    <DataGrid
                    isRowSelectable={false}
                        rows={pages}
                        columns={columns}
                    />
                </Box>
            </div>
            </Layout>
        </div>


        <Dialog
            open={open}
            fullWidth={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Create your new page"}</DialogTitle>
            <DialogContent>
                <Box>
                    <Box sx={{paddingTop:1}}>
                        <TextField fullWidth={true} onChange={(event) => {
                            setTitle(event.target.value);
                        }} label="Title" />
                    </Box>
                    <Box className="pt-4">
                        <label>What type of editor would you like to use?</label><br/>
                        <select className="form-control" onChange={(e) => {
                            setPageType(e.target.value)
                        }}>
                            <option selected value="1">Visual Editor</option>
                            <option value="2">HTML Editor</option>
                        </select>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSaveChanges} color="primary" autoFocus>
                Save
            </Button>
            </DialogActions>
        </Dialog>

    </div>
    )
}

// Index.getInitialProps = async (ctx) => {

//     let response = await apiService(ctx).get("/ContentManagement");

//     return {
//         pages: response.data
//     };

// };

export default Index;