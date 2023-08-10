import { IconButton, ListItem, ListItemText, Typography } from "@mui/material"
import React from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { unixTimeToNormalTime } from "./data"

const DataCard = ({ data }) => (
  <ListItem disableGutters>
    <div>
      <Typography variant='h6' component='h6'>
        Wallet Name : {data.walletName}
        <br></br>
      </Typography>
      <span variant='h6'>{`Wallet ID : ${data.canID.toString()}`}</span>
      <ListItemText primary={`Controller : ${data.controller.toString()}`} />
    </div>
  </ListItem>
)

export default DataCard
