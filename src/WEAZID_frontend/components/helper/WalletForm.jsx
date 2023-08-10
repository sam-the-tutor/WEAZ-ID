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
import React, { useState } from "react"
import { useAuth } from "../../use-auth-client"

import { Principal } from "@dfinity/principal"

export default function CreateWallet() {
  const { weazIDActor, setIsLoading, setNotification, setChanges, logout } =
    useAuth()
  const [formData, setFormData] = useState({
    walletName: "",
    principalID: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  async function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    let results = await weazIDActor.setMyWallet(
      formData.walletName,
      Principal.fromText(formData.principalID)
    )
    setChanges(formData.walletName)
    console.log(results)

    setIsLoading(false)
    if (results.ok) {
      setNotification("New Cycles Wallet created Successfully!!!")
    } else setNotification(results.err)

    setFormData({
      walletName: "",
      principalID: "",
    })
  }

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Button
              sx={{
                width: "100px",
                color: "black",
                border: "2px outset",
              }}
              onClick={logout}
            >
              Logout
            </Button>
          }
          subheader={
            <Typography
              position='sticky'
              variant='h4'
              align='center'
              sx={{ mt: "10px" }}
            >
              Create New Wallet
            </Typography>
          }
        />
        <CardContent>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", marginTop: "10px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label='Wallet Name'
                  name='walletName'
                  value={formData.walletName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label='Principal ID of the controller'
                  name='principalID'
                  value={formData.principalID}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              sx={{
                width: "100px",
                color: "black",
                border: "2px outset",
              }}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
