import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  CardHeader,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useAuth } from "../use-auth-client"
import { Principal } from "@dfinity/principal"

import { Navigate } from "react-router-dom"
import CreateWallet from "./helper/WalletForm"
import LoadingComponent from "./Utils/LoadingComponent"
import Notifications from "./Utils/Notifications"
import GetWallets from "./helper/GetWallets"

export default function dashboard() {
  const {
    weazIDActor,
    isAuthenticated,
    principal,
    isLoading,
    notification,
    setIsLoading,
    logout,
  } = useAuth()

  return (
    <>
      {isAuthenticated ? (
        <Box justifyContent='center' alignContent='center' display='flex'>
          <Grid
            container
            display='flex'
            spacing={2}
            justifyContent='center'
            alignContent='center'
          >
            <Grid item alignItems='center' xs={12} sm={5}>
              <Box
                display='flex'
                spacing={4}
                justifyContent='center'
                alignItems='center'
                xs={12}
              >
                <CreateWallet />
              </Box>
            </Grid>
            <Grid item alignItems='center' xs={12} sm={7}>
              <GetWallets />
            </Grid>
            {isLoading ? <LoadingComponent /> : null}
            {notification ? <Notifications /> : null}
          </Grid>
        </Box>
      ) : (
        <Navigate to='/' />
      )}
    </>
  )
}
