import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Layout from "../../../components/portalLayout";
import Grid from '@mui/material/Grid';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { apiService } from 'authscape';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Comments from '../../../components/comments';

export default function Home({loadedUser, setIsLoading, currentUser}) {
  
  const [value, setValue] = React.useState(0);
  const [status, setStatus] = React.useState(null);
  const [ticketType, setTicketType] = React.useState(null);
  const [ticket, setTicket] = React.useState(null);
  const [priorty, setPriority] = React.useState(0);
  const [participants, setParticipants] = React.useState([]);
  


  const [createdByList, setCreatedByList] = useState([]);
  const [selectedCreatedBy, setSelectedCreatedBy] = useState(null);

  const router = useRouter();

  useEffect(() => {

    if (loadedUser, router.isReady)
    {
      const fetchData = async () => {
        setIsLoading(true);
        let response = await apiService().get("/Ticket/GetTicket?ticketId=" + router.query.id);
        if (response != null && response.status == 200)
        {
          setTicket(response.data);

          setIsLoading(false);
          setStatus(response.data.selectedTicketStatusId);
          setTicketType(response.data.selectedTicketTypeId);
          setPriority(response.data.selectedPriortyId);
          setSelectedCreatedBy(response.data.selectedCreatedBy);
          setParticipants(response.data.participants);
          
        }
      }

      fetchData();
    }

  }, [loadedUser, router.isReady]);

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
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const refreshCreatedByList = async (query) => {

    let response = await apiService().get("/ticket/findUser?query=" + query);
    if (response != null && response.status == 200)
    {
      setCreatedByList(response.data);
    }
  }

  return (
    <div>
      <Head>
        <title>Ticket</title>
        <meta name="description" content="Authscape Ticketing System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout currentUser={currentUser}>

        <Box sx={{width: '100%' }}>

          <Box>
            <h2>{ticket != null && ticket.name}</h2>
          </Box>
      
          <Grid container spacing={2}>
            <Grid item xs={4}>

              <Box sx={{ minWidth: 120 }}>
                <Box>
                  Status:
                </Box>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    InputLabelProps={{ shrink: true }}
                    onChange={async (val) =>{
                      setStatus(val.target.value);

                      await apiService().put("/ticket/UpdateStatus", {
                        id: ticket.id,
                        ticketStatusId: val.target.value
                      });

                    }}>

                      {ticket != null && ticket.ticketStatuses.map((status, index) => {
                        return (
                          <MenuItem key={index} value={status.id}>{status.name}</MenuItem>
                        )
                      })}
                    
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{paddingTop:2}}>
                <Box>
                  Assigned to:
                </Box>
                <Autocomplete
                    disablePortal
                    options={createdByList}
                    value={selectedCreatedBy}
                    onChange={async (event, newValue) => {
                        setSelectedCreatedBy(newValue.id);
                    }}
                    renderInput={(params) => <TextField {...params} label={""} onChange={(val) => {
                      refreshCreatedByList(val.currentTarget.value);
                    }} />}
                  />
              </Box>

              {/* <Box>
              Company
              </Box> */}

              <Box sx={{paddingTop:2}}>
                <Box sx={{ minWidth: 120 }}>
                  <Box>
                    Priority:
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={priorty}
                      label=""
                      onChange={async (val) =>{
                        setPriority(val.target.value);

                        await apiService().put("/ticket/UpdateTicketPriority", {
                          id: ticket.id,
                          priorityLevel: val.target.value
                        });

                      }}>
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>Low</MenuItem>
                        <MenuItem value={2}>Medium</MenuItem>
                        <MenuItem value={3}>High</MenuItem>
                        <MenuItem value={4}>Urgent</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              

            </Grid>
            <Grid item xs={4}>
              
              <Box sx={{ minWidth: 120 }}>
                <Box>
                  Ticket Type:
                </Box>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="ticketType"
                    value={ticketType}
                    label=""
                    onChange={async (val) =>{
                      setTicketType(val.target.value);

                      await apiService().put("/ticket/UpdateTicketType", {
                        id: ticket.id,
                        TicketTypeId: val.target.value
                      });

                    }}>
                      {ticket != null && ticket.ticketTypes.map((status, index) => {
                        return (
                          <MenuItem key={index} value={status.id}>{status.name}</MenuItem>
                        )
                      })}
                    
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{paddingTop:2}}>
                
                <Box>
                  Participants:
                </Box>
                <Autocomplete
                    multiple={true}
                    disablePortal
                    value={participants}
                    options={createdByList}
                    onChange={async (event, newValue) => {

                      // alert(JSON.stringify(newValue));

                      await apiService().put("/ticket/UpdateParticipants", {
                        ticketId: router.query.id,
                        participants: newValue
                      });

                        setParticipants(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label={""} onChange={(val) => {
                      refreshCreatedByList(val.currentTarget.value);
                    }} />}
                  />

                
                {/* <TextField id="lastUpdated" fullWidth={true} InputLabelProps={{ shrink: true }} disabled={true} label="Participants" variant="outlined" autoFocus={true} value={(ticket != null ? ticket.lastUpdated : "")} /> */}
              </Box>

            </Grid>

            <Grid item xs={4}>
              
              <Box>
                <Box>
                  Created:
                </Box>
                <TextField id="created" fullWidth={true} InputLabelProps={{ shrink: true }} disabled={true} label="" variant="outlined" autoFocus={true} value={(ticket != null ? ticket.created : "")} />
              </Box>

              <Box sx={{paddingTop:2}}>
                <Box>
                  Last Updated:
                </Box>
                <TextField id="lastUpdated" fullWidth={true} InputLabelProps={{ shrink: true }} disabled={true} label="" variant="outlined" autoFocus={true} value={(ticket != null ? ticket.lastUpdated : "")} />
              </Box>



            </Grid>
          </Grid>

        </Box>

        <Box sx={{ width: '100%', marginTop:2 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Chat" {...a11yProps(0)} />
              <Tab label="Notes" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>

            {ticket != null &&
              <Comments ticketId={ticket.id} isDisabled={false} isNote={false} />
            }
          </TabPanel>
          <TabPanel value={value} index={1}>
            {ticket != null &&
              <Comments ticketId={ticket.id} isDisabled={false} isNote={true} />
            }
          </TabPanel>
        </Box>

      </Layout>
    </div>
  )
}