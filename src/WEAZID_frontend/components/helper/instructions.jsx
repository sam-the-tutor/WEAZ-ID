import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Paper } from '@mui/material';
import { Star, Folder, Delete } from '@mui/icons-material';

const MyList = () => {
  return (
    <Paper elevation={3}>
      <video width="100%" 
      controls 
      source src="../../assets/tutorial.mp4" 
      type="video/mp4"
      />
    </Paper>
  );
};

export default MyList;
