import { Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';


const footer = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <Typography>
        Designed with <FavoriteIcon/> By <a href="https://twitter.com/samthetutor2">Sam-the-tutor <TwitterIcon/></a>
      </Typography>
      <br></br>
      <Typography >
    <a href="https://github.com/sam-the-tutor"> <GitHubIcon/></a>
      </Typography>
    </div>
  )
}

export default footer