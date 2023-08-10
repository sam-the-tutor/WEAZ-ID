import React, { useState, useEffect } from 'react';
import { useAuth } from '../../use-auth-client';

const notificationContainer = {
    position:"fixed",
    bottom: "20px",
    left: "20px",
    zIndex: "9999",
    
  }
  
  const dNotification = {
    backgroundColor: "rgba(240, 240, 240,0.2)",
    padding: "10px",
    border: "1px solid #ccc",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    borderRadius :"10px"
  }

const Notifications = () => {
    const{ notification,setNotification} = useAuth();

  const showNotification = (taskName) => {
    setNotification(taskName);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div style={notificationContainer}>
      {notification && <span style={dNotification}>{notification}</span>}
    </div>
  );
};
export default Notifications;