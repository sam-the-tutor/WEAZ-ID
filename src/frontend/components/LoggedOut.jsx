import React from "react";
import { Box, Typography, ThemeProvider, Button, Grid } from "@mui/material";
import { useAuth } from "../use-auth-client";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import BasicModal from "./helper/howTo";

const HomePage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated} = useAuth();
  return (
    < >
        <Box display="flex" justifyContent="center" alignItems="center" height= '100vh' >
        <Grid container spacing={2} sx={{justifyContent:"center", alignItems:"center"}} >
          <Box border="3px outset" width="70%"  justifyContent="center" alignItems="center" bgcolor="#E0E1E2" xs={12}>

        <Grid item xs={12} sx={{marginTop:"50px"}}>
        <Typography  variant="h1" align="center">
            WEAZID
          </Typography>
          <Typography  variant="h6" align="center">
            Create and Manage Cycle Wallets
            
          </Typography>
        
          </Grid>
        {isAuthenticated? navigate("/dashboard") : null}
        <Grid container spacing ={4} xs={12} sx={{justifyContent:"center", alignItems:"center", mt:"20px"}}>
          <Grid item={8}>
          <BasicModal/>
          </Grid>
          <Grid item={4}>
          <Button sx={{width:"100px", color:"black", border:"1px outset"}} type="button" id="loginButton" onClick={login}> Sign In</Button>
          </Grid>
        </Grid>

        <Grid item xs={12} textAlign="center" marginTop="80px">
        <Footer />
        </Grid>
          </Box>
      </Grid>
    </Box>
  </>
  );
};


export default HomePage;