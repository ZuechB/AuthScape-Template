import React from 'react';
import '../styles/globals.css'
import {AuthorizationComponent} from 'authscape';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import "../components/blocky/BlocklyComponent.css";
import LoginModal from '../components/loginModal';
import '@mikk3lro/mc-fontpicker/dist/mc-fontpicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [loadedUser, setLoadedUser] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);

  return (
    <>
      <AuthorizationComponent setCurrentUser={setCurrentUser} userLoaded={() => {
          setLoadedUser(true);
      }}>
        <Component {...pageProps} currentUser={currentUser} toast={toast} setIsLoading={setIsLoading} loadedUser={loadedUser} setOpenLoginModal={setOpenLoginModal} />
      </AuthorizationComponent>

      <LoginModal loadedUser={loadedUser} setIsLoginOpen={(modal) => {
        setOpenLoginModal(false);
      }} open={openLoginModal} />

      <Backdrop sx={{ color: '#fff', zIndex: 99999 }} open={isLoading}>
          <CircularProgress color="inherit" />
      </Backdrop>

      <ToastContainer />
    </>
  )
}

export default MyApp
