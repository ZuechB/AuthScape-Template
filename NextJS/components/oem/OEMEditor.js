import React, { useState, useRef, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { apiService } from "authscape";
import { DataGrid } from "@mui/x-data-grid";

export default function OEMEditor({open, handleClose, loadedUser, toast}) {

    const cssEditorRef = useRef(null);
    const htmlEditorRef = useRef(null);

    const [data, setData] = useState('');
    const [value, setValue] = React.useState(0);
    const [fonts, setFonts] = useState(null);
    const [dnsRecordId, setDnsRecordId] = useState(1);
    

    const [selectedFont, setSelectedFont] = useState(null);



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


    useEffect(() => {

      if (loadedUser)
      {
        const fetchData = async () => {

          let response = await apiService().get("/OEM/GetFonts");
          if (response != null && response.status == 200)
          {
            setFonts(response.data);
          }
        }
        fetchData();
      }

    }, [loadedUser]);



    function handleCSSEditorDidMount(editor, monaco) {
      cssEditorRef.current = editor; 
    }

    function handleHtmlEditorDidMount(editor, monaco) {
      htmlEditorRef.current = editor; 
    }

    const monaco = useMonaco();

    const columns = [
      {
        field: "label",
        headerName: "Fonts",
        width: 200,
        editable: false,
        renderCell: (params) => {
          const RenderData = (row) => {
            // const { id, value, field } = params;
            // const apiRef = useGridApiContext();
            return (
              <>
                <Box sx={{fontFamily: row.value, fontSize:20}}>{row.value}</Box>
                <link href={"https://fonts.googleapis.com/css2?family=" + row.value} rel="stylesheet"></link>
              </>
            );
          };
          return RenderData(params);
        },
      }
    ];

    useEffect(() => {

        const fetchData = () => {

            // if (monaco) {
            //     //console.log("here is the monaco instance:", monaco);
            // }

            // let response = await apiService().get("/digitalCatalog");
            // if (response.status == 200)
            // {
            //     setData(response.data);
            // }
        }
        fetchData();

    }, [monaco]);

    return (
        <>
            <Box sx={{ width: '100%' }}>

              {selectedFont != null &&
                <link href={"https://fonts.googleapis.com/css2?family=" + selectedFont} rel="stylesheet"></link>
              }
          
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="General" {...a11yProps(0)} />
                  <Tab label="Font" {...a11yProps(1)} />
                  <Tab label="Style Sheet Editor" {...a11yProps(2)} />
                  <Tab label="HTML Import Editor" {...a11yProps(3)} />
                  </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                dynamic fields here
              </TabPanel>
              <TabPanel value={value} index={1}>

              <Grid container spacing={2}>
                <Grid item xs={6}>

                {(loadedUser) &&

                  <DataGrid
                    rows={fonts}
                    columns={columns}
                    sx={{height:"80vh"}}
                    onRowClick={async (row) => {

                      let response = await apiService().post("/OEM/SetFont", {
                        dnsRecordId: dnsRecordId,
                        value: row.row.label
                      });
                      if (response != null && response.status == 200)
                      {
                        setSelectedFont(row.row.label);
                        toast("Font saved!")
                      }
                    }}
                  />
                }

                </Grid>
                <Grid item xs={6} sx={{marginTop:4}}>
                  <Box sx={{fontFamily: selectedFont}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ultricies odio. Nunc ut quam turpis. In hac habitasse platea dictumst. 
                    Suspendisse potenti. Nullam malesuada, purus id sagittis vestibulum, massa tellus gravida elit, vitae ultrices tortor nulla ac nunc. 
                    Aenean tempus semper est vel convallis. Sed feugiat, risus eu tincidunt eleifend, purus metus vulputate nulla, et condimentum sapien erat in nisi. 
                    Nunc non malesuada libero. Donec tempus tincidunt mi at vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
                    Suspendisse potenti. Etiam nec eleifend orci. Suspendisse in est vel nunc rhoncus bibendum vitae id felis. 
                    Integer bibendum dolor elit, at tincidunt lacus tempor ac. Maecenas lobortis, mauris at condimentum feugiat, nulla orci condimentum massa, sed facilisis tellus ligula vitae metus. 
                    Aliquam erat volutpat. Quisque dignissim felis augue, at semper nisl posuere ut. Proin fringilla diam vitae faucibus finibus.
                    <br/><br/>
                    Aenean tempus semper est vel convallis. Sed feugiat, risus eu tincidunt eleifend, purus metus vulputate nulla, et condimentum sapien erat in nisi. Nunc non malesuada libero. Donec tempus tincidunt mi at vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse potenti
                  </Box>
                </Grid>
              </Grid>

              </TabPanel>
              <TabPanel value={value} index={2}>

              <Grid container spacing={2}>
                  <Grid item xs={6}>
                      <h4 style={{marginBottom:"0px"}}>Global CSS edits</h4>
                      <small>You can make edits to your stylesheet</small>
                  </Grid>
                  <Grid item xs={6} sx={{textAlign:"right"}}>
                      <Button startIcon={<CheckIcon/>} sx={{marginTop:4}} variant="contained" onClick={async () => { 

                        let response = await apiService().post("/OEM/SetGlobalCSS", {
                          dnsRecordId: dnsRecordId,
                          value: cssEditorRef.current.getValue()
                        });
                        if (response != null && response.status == 200)
                        {
                          toast("CSS Saved!")
                        }

                      }}>Save Changes</Button>
                  </Grid>
              </Grid>

              <Box sx={{paddingTop:1}}>
                  
                  <Editor
                      height="70vh"
                      onMount={handleCSSEditorDidMount}
                      defaultLanguage="css"
                      theme="vs-dark" 
                      defaultValue={data.prettyCSS == null ? "" : data.prettyCSS}
                  />
              </Box>

              </TabPanel>
              <TabPanel value={value} index={3}>
                  

                  <Grid container spacing={2}>
                      <Grid item xs={6}>
                          <h4 style={{marginBottom:"0px"}}>HTML import Edits</h4>
                          <small>You can add imports such as google analytics or clarity</small>
                      </Grid>
                      <Grid item xs={6} sx={{textAlign:"right"}}>
                          <Button startIcon={<CheckIcon/>} sx={{marginTop:4}} variant="contained" onClick={async () => {

                            let response = await apiService().post("/OEM/SetGlobalHTML", {
                              dnsRecordId: dnsRecordId,
                              value: htmlEditorRef.current.getValue()
                            });
                            if (response != null && response.status == 200)
                            {
                              toast("HTML saved!")
                            } 

                           }}>Save Changes</Button>
                      </Grid>
                  </Grid>
                  
                  <Box sx={{paddingTop:1}}>
                      <Editor
                          height="70vh"
                          onMount={handleHtmlEditorDidMount}
                          defaultLanguage="html"
                          theme="vs-dark"
                          defaultValue={data.prettyHTML == null ? "" : data.prettyHTML}
                      />
                  </Box>


              </TabPanel>
            </Box>
        </>
    )
}