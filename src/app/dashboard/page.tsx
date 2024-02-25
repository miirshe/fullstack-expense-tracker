import { auth , signIn , signOut } from '@/auth'
import React from 'react'
const Dashboard = async () => {
  const user = await auth();
  console.log("user :", user);
  
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard