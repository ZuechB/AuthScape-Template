import React, {useEffect, useState} from 'react';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import FmdBadRoundedIcon from '@mui/icons-material/FmdBadRounded';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { parseDomain, ParseResultType } from "parse-domain";

export default function AddDomain({open, handleClose}) {

    const steps = ['Enter a domain', 'Setup DNS Record', 'Go Live'];

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const [domain, setDomain] = React.useState(null);
    const [subDomains, setSubDomains] = React.useState(null);
    const [topLevelDomains , setTopLevelDomains ] = React.useState(null);

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
          isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

    
    };

    const handleStep = (step) => () => {
    setActiveStep(step);
    };

    const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
    };

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    }));

    const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    };

    function BootstrapDialogTitle(props) {
        const { children, onClose, ...other } = props;
      
        return (
          <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
        );
    }

    return (
        <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" sx={{backgroundColor: "rgba(0, 0, 0, 0.6)"}} fullWidth={true} maxWidth={"md"} open={open}>
            <Box sx={{padding:4}}>

            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel sx={{color:"#fff"}}>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>

            {activeStep == 0 &&
            <>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} sx={{textAlign:"center", fontSize:30, marginTop:2}}>
                    What domain would you like to connect to {process.env.CompanyName}?
                </BootstrapDialogTitle>
                <DialogContent>
                    
                    <Box>
                        <TextField id="outlined-basic" label="Enter subdomain URL e.g catalog.mydomain.com" fullWidth={true} variant="outlined" sx={{color:"white", marginTop:2 }} />
                    </Box>
                    <Box sx={{marginTop:2}}>
                    <Typography gutterBottom sx={{textAlign:"center", fontSize:14}}>
                        <FmdBadRoundedIcon sx={{color:"#1976d2", position:"relative", top:8}} /> You must own the domain and have the ability to add records
                    </Typography>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => {

                        var domainLand = parseDomain("emeco.reseat.com");
                        setDomain(domainLand.domain);
                        setSubDomains(domainLand.subDomains);
                        setTopLevelDomains(domainLand.topLevelDomains);

                        handleNext();
                    }}>
                        Next: Setup DNS
                    </Button>
                </DialogActions>
            </>
            }




            {activeStep == 1 &&
            <>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} sx={{textAlign:"center", fontSize:30, marginTop:2}}>
                    Configure your DNS
                </BootstrapDialogTitle>
                <DialogContent>

                    <Box>
                        <Typography gutterBottom sx={{textAlign:"center", fontSize:14}}>
                            Add a CNAME and TXT Record to your domain by visiting your DNS provider.
                        </Typography>
                    </Box>
                    
                    <Box sx={{backgroundColor:"#f7f7f7", marginTop:5, paddingLeft:4, paddingRight:4}}>
                        <Grid container spacing={2} fullWidth={true} >
                            <Grid item xs={2}>
                                Type
                                
                                <FormControl fullWidth sx={{paddingTop:2}}>
                                    <Select
                                        value={1} readOnly={true}>
                                        <MenuItem value={1}>CNAME</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={5}>
                                Name
                                <TextField id="outlined-basic" label="" fullWidth={true} value={subDomains} variant="outlined" sx={{color:"white", paddingTop:2 }} />
                            </Grid>
                            <Grid item xs={5}>
                                Target
                                <TextField id="outlined-basic" label="" fullWidth={true} value={"616ec155f5"} variant="outlined" sx={{color:"white", paddingTop:2 }} />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{backgroundColor:"#f7f7f7", paddingLeft:4, paddingRight:4, marginTop:2, paddingBottom:4}}>
                        <Grid container spacing={2} fullWidth={true} >
                            <Grid item xs={2}>
                                Type
                                
                                <FormControl fullWidth sx={{paddingTop:2}}>
                                    <Select
                                        value={1} readOnly={true}>
                                        <MenuItem value={1}>TXT</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={5}>
                                Name
                                <TextField id="outlined-basic" label="" fullWidth={true} value={"asuid." + subDomains} variant="outlined" sx={{color:"white", marginTop:2 }} />
                            </Grid>
                            <Grid item xs={5}>
                                Target
                                <TextField id="outlined-basic" label="" fullWidth={true} value={"616ec155f5"} variant="outlined" sx={{color:"white", marginTop:2 }} />
                            </Grid>
                        </Grid>
                    </Box>
                    

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => {
                        handleNext();
                    }}>
                        Go Live
                    </Button>
                </DialogActions>
            </>
            }

            {activeStep == 2 &&
                <Box>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} sx={{textAlign:"center", fontSize:30, marginTop:4}}>
                        Creating Web App and SSL Certificates
                    </BootstrapDialogTitle>
                    <DialogContent>

                        <Box>
                            <Typography gutterBottom sx={{textAlign:"center", fontSize:20}}>
                            Loading...
                            </Typography>
                        </Box>

                    </DialogContent>
                </Box>
            }


            </Box>
        </BootstrapDialog>
    )
}