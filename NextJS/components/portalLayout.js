import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Home from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import ArrowRight from '@mui/icons-material/ArrowRight';
import NavigationItem from '../components/navigationBar/navigationItem';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

import People from '@mui/icons-material/People';
import Dns from '@mui/icons-material/Dns';
import PermMedia from '@mui/icons-material/PermMedia';
import Public from '@mui/icons-material/Public';

export default function PortalLayout({children, currentUser}) {

  const drawerWidth = 250;
  const open = true;

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const FireNav = styled(List)({
    '& .MuiListItemButton-root': {
      paddingLeft: 24,
      paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
      minWidth: 0,
      marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
      fontSize: 20,
    },
  });


  const adminData = [
      { icon: <Public />, label: 'Dashboard' },
      { icon: <People />, label: 'Users', href: "/portal/users" },
      { icon: <People />, label: 'Roles', href: "/portal/users/roles" },
      { icon: <DescriptionRoundedIcon />, label: 'Invoices', href: "/portal/invoices" },
  ];


  const inboxData = [
      { icon: <People />, label: 'Create Ticket' },
      { icon: <Dns />, label: 'View Tickets', href: "/portal/tickets" }
  ];

  const ManageData = [
      { icon: <People />, label: 'Pages', href: "/portal/pages" },
      { icon: <People />, label: 'Products', href: "/portal/products" },
      { icon: <People />, label: 'Locations', href: "/portal/location" },
      { icon: <People />, label: 'Companies', href: "/portal/company" },
      { icon: <People />, label: 'Email Templates', href: "/portal/emailtemplates" },
      { icon: <People />, label: 'Document Manager', href: "/portal/documentManager" },
  ];

  const IdentityServer = [
    { icon: <People />, label: 'Applications', href: "/portal/identityserver/applications" },
    { icon: <People />, label: 'Third Party Authentication', href: "/portal/thirdPartyAuthentication" },
  ];


  const drawer = (
    <Box sx={{ background: 'rgb(5, 30, 52)',}}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}>
        <Paper elevation={0} sx={{ maxWidth: drawerWidth }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="#customized-list">
              <ListItemText
                sx={{ my: 0 }}
                primary={"Welcome " + (currentUser != null && currentUser.firstName)}
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                  padding:1
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemText
                  primary={process.env.CompanyName}
                  primaryTypographyProps={{
                    color: 'white',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }}
                />
              </ListItemButton>
              <Tooltip title="Company Settings">
                <IconButton
                  size="large"
                  sx={{
                    '& svg': {
                      color: 'rgba(255,255,255,0.8)',
                      transition: '0.2s',
                      transform: 'translateX(0) rotate(0)',
                    },
                    '&:hover, &:focus': {
                      bgcolor: 'unset',
                      '& svg:first-of-type': {
                        transform: 'translateX(-4px) rotate(-20deg)',
                      },
                      '& svg:last-of-type': {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      height: '80%',
                      display: 'block',
                      left: 0,
                      width: '1px',
                      bgcolor: 'divider',
                    },
                  }}
                >
                  <Settings />
                  <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />

            <NavigationItem title={"Admin"} subNav={adminData} />
            <NavigationItem title={"Inbox"} subNav={inboxData} />
            <NavigationItem title={"Manage"} subNav={ManageData} />
            <NavigationItem title={"Identity Server"} subNav={IdentityServer} />

          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );

    return (
      <>
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {children}
          </Box>
        </Box>
      </>
    )
};