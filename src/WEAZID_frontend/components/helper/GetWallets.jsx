import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  CardHeader,
  TextField,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useAuth } from "../../use-auth-client"
import DataView from "./dataView"

import { Principal } from "@dfinity/principal"
import { useNavigate } from "react-router-dom"

export default function GetWallets() {
  const {
    weazIDActor,
    setIsLoading,
    isAuthenticated,
    setNotification,
    changes,
    principal,
    logout,
  } = useAuth()
  const [data, setData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && weazIDActor != null && principal !== null) {
      Promise.all([weazIDActor.getallIDS(principal.toString())])
        .then((results) => {
          console.log("Results", results[0].ok)
          setData(results[0].ok)
        })
        .catch((e) => {
          console.log("error", e)
        })
    } else {
      navigate("/")
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated && weazIDActor != null) {
      console.log("Here is the pzib", principal)
      Promise.all([weazIDActor.getallIDS(principal.toString())])
        .then((results) => {
          console.log("Results", results[0].ok)
          setData(results[0].ok)
        })
        .catch((e) => {
          console.log("error", e)
        })
    } else {
      navigate("/")
    }
  }, [isAuthenticated, changes])

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant='h4' align='center' sx={{ mt: "10px" }}>
              Your Wallets
            </Typography>
          }
        />
        <CardContent>
          <List sx={{ height: "250px", overflowY: "auto" }}>
            {data != null ? (
              data.map((item, index) => {
                return <DataView data={item} key={index} />
              })
            ) : (
              <Typography>No Wallets Created Yet</Typography>
            )}
          </List>
        </CardContent>
      </Card>
    </>
  )
}
