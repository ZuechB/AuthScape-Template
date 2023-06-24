import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import Layout from "../../../components/portalLayout";
import AddDomain from "../../../components/oem/AddDomainModal";
import OEMEditor from '../../../components/oem/OEMEditor';
import { Button } from '@mui/base';

export default function Home({loadedUser, setIsLoading, currentUser, toast}) {

    const [showOEMDialog, setShowOEMDialog] = useState(false);

    return (
    <div>
        <Head>
            <title>OEM</title>
            <meta name="description" content="AuthScape OEM" />
            <link rel="icon" href="/favicon.ico" />

            
<link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Tangerine"></link>
        </Head>
        <Layout currentUser={currentUser}>
            <Box sx={{width: '100%' }}>
                OEM system

                <Button variant="contained" onClick={() => {
                    setShowOEMDialog(true);
                }} >Add OEM Account</Button>


                <AddDomain open={showOEMDialog} />

                <Box>
                    <OEMEditor loadedUser={loadedUser} toast={toast} />
                </Box>

            </Box>
        </Layout>
    </div>
    )
}