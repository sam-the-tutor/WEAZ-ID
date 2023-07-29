import React from 'react'
import { Outlet } from 'react-router-dom'

const sharedLayout = () => {
  return (
    <>
    <Outlet/>
    </>
  )
}

export default sharedLayout