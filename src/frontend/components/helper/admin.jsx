import React, { useState } from 'react'
import Footer from '../footer'

import {useAuth} from '../../use-auth-client'

 
const Admin = () => {

  const { weazIDActor } = useAuth();
  const [file, setWasmFile] = useState(null);

  const handleFileChange =(event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);

        await weazIDActor.uploadWasm(uint8Array).then((res)=>{
          console.log("Wasm upload status : ", res)
        })
        
        // You can now use the Uint8Array as needed (e.g., send it to a server, process it, etc.)
      };
      reader.readAsArrayBuffer(selectedFile);
      setWasmFile(selectedFile);
    }
  };

  return (
    <>
    <Header/>
     <h2>File Upload and Convert to Uint8Array</h2>
      <input type="file" onChange={handleFileChange} />
      {file && <p>Selected File: {file.name}</p>}
     <Footer/>
    
    </>



   
  )
}

export default Admin