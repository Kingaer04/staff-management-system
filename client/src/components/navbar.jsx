import { React, useState } from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from "@mui/icons-material"
import FlexBetween from './flexBetween'
import { useDispatch, useSelector } from 'react-redux'
import { setMode } from '../redux/modeSlice'
import { AppBar, IconButton, Toolbar, useTheme, InputBase, Button, MenuItem, Box, Typography, Menu, Divider, Badge } from '@mui/material'
import { signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/userSlice'
import { Link } from '@mui/material'
import { NotificationsOutlined } from '@mui/icons-material'

export default function Navbar({isSidebarOpen, setIsSidebarOpen}) {
    const {currentUser} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null)
    const [notification, setNotification] = useState([])
    function handleClick(event) {
        setAnchorEl(event.currentTarget)
    }
    function handleClose() {
        setAnchorEl(null)
    }
    async function handleSignOut() {
        dispatch(signOutUserStart())
        try {
          const res = await fetch('/user/signOut')
          const data = await res.json()
          if (data.error) {
            dispatch(signOutUserFailure(data.error))
            setError(data.error)
            return
          }
          dispatch(signOutUserSuccess(data))
        } catch (error) {
          dispatch(signOutUserFailure(error))
            setError(error)
        }}

  return (
    <Box sx={{ position: 'relative' }}>
        <AppBar sx={{
        position: "fixed",
        background: "#512381",
        boxShadow: "none",
        width: isSidebarOpen ? `calc(100% - 240px)` : '100%',
        left: isSidebarOpen ? '240px' : '0',
        transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
        }}>
        <Toolbar sx={{justifyContent: "space-between"}}>
            <FlexBetween>
                <IconButton sx={{ color: "#fff" }} onClick={() => setIsSidebarOpen(!isSidebarOpen)}> 
                    <MenuIcon/>
                </IconButton>
                <FlexBetween backgroundColor="#fff" borderRadius="9px" gap="3rem" p="0.1rem 1.5rem">
                <InputBase placeholder='Search...' sx={{ color: '#000' }}/>
                <IconButton sx={{ color: "#000" }}>
                    <Search/>
                </IconButton>
                </FlexBetween>
            </FlexBetween>
            <FlexBetween gap="1.5rem">
                <IconButton sx={{ color: "#fff" }} onClick={()=>dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (<DarkModeOutlined sx={{ fontSize: "25px" }}/>) : (<LightModeOutlined sx={{ fontSize: "25px" }}/>)}
                </IconButton>
                <SettingsOutlined sx={{ fontSize: "25px" }}/>
                <Badge badgeContent={100} color='primary' showZero max={99}>
                    <NotificationsOutlined/>
                </Badge>
                <FlexBetween>
                    <Button onClick={handleClick} sx={{
                        display: "flex", justifyContent: "space-between", alignItems:"center", textTransform: "none", gap: "1rem" 
                    }}>
                        <Box 
                        component={currentUser ? "img" : "h5"}
                        alt={currentUser ?"profile" : ""}
                        src={currentUser ? currentUser.avatar: "Login"}
                        height="32px"
                        width="32px"
                        borderRadius="50%"
                        sx={{objectFit: "cover"}}
                        />
                        {!currentUser && <Link href="/sign-In" fontSize="0.8rem"
                        fontWeight="bold" sx={{color: theme.palette.secondary[100]}}>Sign In</Link>}
                        <Box textAlign="left">
                            <Typography fontWeight="bold" fontSize="0.85rem" sx={{ color: theme.palette.secondary[100] }}>
                            {currentUser? currentUser.userName.charAt(0).toUpperCase() + currentUser.userName.slice(1) : ""}
                            </Typography>
                            <Typography  fontSize="0.75rem" sx={{ color: theme.palette.secondary[200] }}>
                            {currentUser? currentUser.role || "Staff":""}
                            </Typography>
                        </Box>
                        {currentUser ? (<ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px"}}/>):''}
                        
                    </Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} anchorOrigin={{ vertical: "buttom", horizontal: "center" }}>
                        <MenuItem onClick={handleClose}>
                        <MenuItem onClick={handleSignOut}>
                        Log Out
                        </MenuItem>
                        </MenuItem>
                    </Menu>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
    </Box>
    
  )
}

