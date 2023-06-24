import { AppBar, Box, Button, Toolbar, Typography, Grid, Paper } from '@mui/material';
import React, {useEffect, useState, useRef} from 'react';
import Layout from "../../../components/portalLayout";
import { DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { FileUploader, apiService } from 'authscape';
import YesNoDialog from '../../../components/yesNoDialog';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import Image from 'next/image';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const DocumentManager = ({loadedUser, currentUser, setIsLoading}) => {

    const fileUploaderRef = useRef();
    const [files, setFiles] = useState(null);
    const [update, setUpdate] = useState(false);
    const [folderParentId, setFolderParentId] = useState(null);

    useEffect(() => {

      if (loadedUser)
      {
        const fetchDocuments = async () => {
        
          if (folderParentId != null)
          {
            let response = await apiService().get("/DocumentProcessing/GetDocumentsAndFiles?parentFolderId=" + folderParentId);
            if (response != null && response.status == 200)
            {
              setFiles(response.data);  
            }
          }
          else
          {
            let response = await apiService().get("/DocumentProcessing/GetDocumentsAndFiles");
            if (response != null && response.status == 200)
            {
              setFiles(response.data);  
            }
          }

        };
        fetchDocuments();
      }

    }, [loadedUser, folderParentId, update])



    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const StyledMenu = styled((props) => (
      <Menu
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        {...props}
      />
    ))(({ theme }) => ({
      '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
          theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
          'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
          padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
          '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5),
          },
          '&:active': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity,
            ),
          },
        },
      },
    }));


    const handleFileClick = async (file) => {
      
      if (file.type == "folder")
      {
        setFolderParentId(file.id);
      }
      else
      {
        setIsLoading(true);
        await apiService().post("/DocumentProcessing/RunAnalysisOnDocument", {
          documentId: file.id,
          documentFieldCategoryId: 2
        });
        setIsLoading(false);
      }

    }


    return (
        <Layout currentUser={currentUser}>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='inherit' elevation={0}>
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    Document Manager
                    </Typography>

                  <Box>
                    <Button
                      id="demo-customized-button"
                      aria-controls={open ? 'demo-customized-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      variant="contained"
                      disableElevation
                      onClick={handleClick}
                      startIcon={<AddRoundedIcon />}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      New
                    </Button>
                    <StyledMenu
                      id="demo-customized-menu"
                      MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={async () => {

                        let newDocumentName = prompt("New folder name");
                        if (newDocumentName != null && newDocumentName != "")
                        {
                          let response = await apiService().post("/DocumentProcessing/CreateFolder", {
                            folderName:  newDocumentName,
                            parentFolderId: folderParentId
                          });

                          if (response != null && response.status == 200)
                          {
                            // refresh
                            setUpdate(!update);
                          }

                        }

                        handleClose();
                      }} disableRipple>
                        <EditIcon />
                        Folder
                      </MenuItem>
                      <Divider sx={{ my: 0.5 }} />
                      

                      <FileUploader refOveride={fileUploaderRef} url={"/DocumentProcessing/UploadFile"} params={(folderParentId != null ? {
                              parentFolderId: folderParentId
                            } : null)} multiple={true} variant='custom' onUploadCompleted={() => {
                              setUpdate(!update);
                              handleClose();
                            }}>

                            <MenuItem disableRipple>
                            <Box><ArchiveIcon />
                              Upload File(s)</Box>
                            </MenuItem>

                      </FileUploader>
                      
                        
                    </StyledMenu>
                  </Box>
                </Toolbar>

                </AppBar>


                <Breadcrumbs aria-label="breadcrumb" sx={{marginLeft:3, marginBottom:4}}>
                  <Link underline="hover" color="inherit" href="/">
                    Documents
                  </Link>
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/">
                    Core
                  </Link>
                  <Typography color="text.primary">Breadcrumbs</Typography>
                </Breadcrumbs>

                
            </Box>



            <Box sx={{height: "85vh", width: '100%' }}>

              <Grid container spacing={2}>
                {files != null && files.map((file, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
                    <Paper
                      sx={{
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer',
                        position:"relative",
                        '&:hover': {
                          backgroundColor: '#F5F5F5'
                        }
                      }}
                      onClick={() => handleFileClick(file)}>

                        {file.type === 'folder'  && 
                        <Box sx={{position:"absolute", top:45, color:"white"}}>
                          {file.count}
                        </Box>}

                      {file.type === 'folder' ? (
                        <FolderIcon sx={{ fontSize: 80, color:"orange" }} />
                      ) : (

                          file.documentFileExtentionType == 0 ? <InsertDriveFileOutlinedIcon sx={{ fontSize: 60 }} /> : <Image src={file.uri} width={80} height={80} />
                        
                      )}
                      <Typography variant="subtitle1" sx={{paddingTop:1}}>{file.name}</Typography>
                      <Typography variant="subtitle2" sx={{paddingTop:0}}>{file.lastUpdated}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

            </Box>



        </Layout>
    );

};

export default DocumentManager;