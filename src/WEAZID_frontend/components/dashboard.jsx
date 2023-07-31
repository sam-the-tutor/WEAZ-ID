import { Box, Button, Card, CardContent, Grid, Typography,List,} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react';
import { useAuth } from '../use-auth-client'
import {DataCard} from './helper/dataView'
import { Principal } from '@dfinity/principal';
import LoadingSpinner from './helper/Loading';


export default  function dashboard (){

  const { weazIDActor, principal,isLoading,setIsLoading } = useAuth();
  const [ userData, setUserData] = useState([]);
  const [change, setChange] = useState("")

  
  useEffect(async () => {
     setIsLoading(true)
    
      await weazIDActor.getallIDS(principal.toString())
      
    .then((results)=>{
      if(!results.err){
        setUserData(results.ok)
      }
    });
    setIsLoading(false)
    },[weazIDActor,change])


  const formik = useFormik({
    initialValues:{
      principalID:"",
      walletName:""   
    },
    validationSchema: Yup.object({
      principalID : Yup.string().required("Principal ID cannot be empty"),
      walletName : Yup.string().required("Please specify wallet name")
    }),
    onSubmit: async (values)=>{
      setIsLoading(true)
      await weazIDActor.setMyWallet(values.walletName,Principal.fromText(values.principalID))
      .then((results)=>{
        setChange(results)
        setIsLoading(false)
      })
  }
  })

  return (

  <Box display="flex" justifyContent="center" alignItems="center" height= '100vh'>
  <Grid container sx={{justifyContent:"center", alignItems:"center"}}>
    <Box display="flex" spacing={4} border="3px outset" width="70%"  justifyContent="center" alignItems="center" bgcolor="#E0E1E2" xs={12}>
      <Grid item xs={5} margin={3}>
        <Card>
          <Card>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                  <input type="text"
                    id="walletName"
                    name="walletName"
                    placeholder='Name your Wallet'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.walletName}
                    size="small"
                  />
                    {formik.errors.walletName && formik.touched.walletName ? 
                    <div>{formik.errors.walletName}</div>: null
                    }
                  <input type="text"
                    id="principalID"
                    name="principalID"
                    placeholder='Enter Your Principal ID'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.principalID}
                    size="small"
                  />
                  {formik.errors.principalID && formik.touched.principalID ? 
                  <div>{formik.errors.principalID}</div>: null
                  }
                <Button type="submit" sx={{width:"100px", color:"black", border:"2px outset"}}> Create</Button>
                {isLoading?<LoadingSpinner/>:null}
              </form>
            </CardContent>
          </Card>
        </Card>
      </Grid>
      
      <Grid item xs={7} borderRadius="10px">
      <Card>
        <Typography variant="h5" component="h5" sx={{textAlign:"center", mt:"20px"}}> Principal IDS and Wallets</Typography>
        <CardContent>
        <Box sx={{ height: 208, overflow: 'auto' , padding : 3, borderTop:"2px solid black "}}>
              <List>
                {userData.map((data, index) => (
                    <DataCard key={index} data={data} />
                ))}
              </List>
            </Box>
        </CardContent>
      </Card>
      </Grid>
    </Box>
  </Grid>
</Box>



  )
}
