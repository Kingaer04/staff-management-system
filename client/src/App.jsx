import React, { useMemo } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from '../theme.js' 
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout.jsx'
import SignUp from "./pages/signUp.jsx"
import SignIn from "./pages/signIn.jsx"
import Admin from './pages/admin.jsx'
import Profile from './pages/profile.jsx'
import PrivateRoute from './components/privateRoute.jsx'
import Staffs from './pages/staffs.jsx'
import Report from './pages/report.jsx'
import { SkeletonTheme } from 'react-loading-skeleton'
import { ToastContainer } from 'react-toastify'
import Department from './pages/department.jsx'
import EditStaffInfo from './pages/editStaffInfo.jsx'
import DepartmentReport from './pages/departmentReport.jsx'
import AboutMe from './pages/about-me.jsx'
import Notepad from './pages/notepad.jsx'


export default function App() {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  // Get the current user's role from the state
  const currentUser = useSelector((state) => state.user)

  return (
    <div className=''>
        <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <ToastContainer/>
          <Routes>
            <Route path='/sign-In' element={<SignIn/>}/>
            <Route path='/sign-Up' element={<SignUp/>}/>
            <Route element={<PrivateRoute/>}>
              <Route element={<Layout/>}>
                <Route path="/" element={<Navigate to="/home" replace/>}/>
                <Route path='/home' element={<Admin/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/staffs' element={<Staffs/>}/>
                <Route path='/Report' element={<Report/>}/>
                <Route path='/Department' element={<Department/>}/>
                <Route path='/About Me' element={<AboutMe/>}/>
                <Route path='/staffs/edit/:id' element={<EditStaffInfo/>}/>
                <Route path='/editReport' element={<DepartmentReport/>}/>
                <Route path='/notepad' element={<Notepad/>}/>
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
        </BrowserRouter>
    </div>
  )
}