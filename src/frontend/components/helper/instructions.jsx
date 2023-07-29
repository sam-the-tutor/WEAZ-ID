import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Star, Folder, Delete } from '@mui/icons-material';

const MyList = () => {
  return (
    <List component="nav">
      <ListItem >
        <ListItemText primary="Create a new Identity in the terminal " secondary="dfx identity new sampleID" />
      </ListItem>

      <ListItem >
        <ListItemText primary="Copy the Principal ID of the Identity" secondary="dfx identity use sampleID && dfx identity get-principal "/>
      </ListItem>
      <ListItem>
        <ListItemText primary="call the WEAZID canister to generate the wallet and bind it on the mainnet" secondary="dfx canister call WEAZID setMyWallet (principal-id)" />
      </ListItem>
      <ListItem>
        
        <ListItemText primary=" Set the Identity to use the newly configured wallet" secondary="dfx identity set-wallet wallet-ID" />
      </ListItem>
    </List>
  );
};

export default MyList;
