import { React, useEffect, useState } from 'react'
import { Box, Divider, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from '@mui/material'
import { SettingsOutlined, ChevronLeft, ChevronRightOutlined, HomeOutlined,  TrendingUpOutlined, PeopleAltOutlined, GroupOutlined, ReportOutlined, PersonOutline } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './flexBetween'
import { useSelector } from 'react-redux'
import logoImage from '/Images/ADSR.png'

const navItem =  [
  {
    text: "Home",
    icon: <HomeOutlined/>
  },
  {
    text: "Department",
    icon: <GroupOutlined/>
  },
  {
    text: "Staffs",
    icon: <PeopleAltOutlined/>
  },
  {
    text: "Report",
    icon: <ReportOutlined/>
  },
  {
    text: "Profile",
    icon: <PersonOutline/>
  },
  {
    text: "Notepad",
    icon: <TrendingUpOutlined/>
  },
]

export default function SideBar(props) {
    const {currentUser} = useSelector((state) => state.user)
    const { pathname } = useLocation() //To grab current location
    const [active, setActive] = useState("") //To determine the current page
    const navigate = useNavigate()
    const theme = useTheme()

    useEffect(() => {
        setActive(pathname.substring(1))
    }, [pathname]) // to set the current url

    // Filter navItem based on user role
    const filteredNavItem = currentUser && (currentUser.role === 'HOD' || currentUser.role === 'admin') ? navItem : [
        {
            text: "Home",
            icon: <HomeOutlined/>
        },
        {
            text: "About Me",
            icon: <PersonOutline/>
        },
        {
          text: "Staffs",
          icon: <PeopleAltOutlined/>
        },
        {
          text: "Report",
          icon: <ReportOutlined/>
        },
        {
          text: "Profile",
          icon: <PersonOutline/>
        },
        {
          text: "Notepad",
          icon: <TrendingUpOutlined/>
        }
    ]

  return (
    <Box componet="nav">
      {props.isSidebarOpen && (
        <Drawer
          open={props.isSidebarOpen}
          onClose={() => props.setIsSidebarOpen(false)}
          variant="permanent"
          sx={{
            width: props.drawerWidth,
            [`& .MuiDrawer-paper`]: {
              color: theme.palette.secondary[900],
              backgroundColor: "#512381",
              boxSizing: "border-box",
              borderWidth: props.isNonMobile ? 0 : "2px",
              width: props.drawerWidth,
              flexShrink: 0,
              overflow: "hidden"
            }
          }}>
            <Box sx={{ border: `solid 1px ${theme.palette.primary[300]}`, padding: '5px'}} >
                <FlexBetween color="#fff" m="0rem 3rem">
                  <img
                    alt="Logo"
                    src={logoImage}
                    width="92px"
                    sx={{ objectFit: "cover" }}
                  />
                  {!props.isNonMobile && (
                    <IconButton onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)}
                  >
                    <ChevronLeft/>
                  </IconButton>
                  )}
                </FlexBetween>
            </Box> 
            <List>
              {filteredNavItem.map(({text, icon}) => {
                if(!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                    </Typography>
                  )
                }
                const lcText = text.toLowerCase()

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => { navigate(`/${lcText}`) 
                    setActive(lcText)}}
                    sx={{
                      backgroundColor: active === lcText ? theme.palette.primary[100] : "transparent",
                      color: active === lcText ? "#fff" : "#fff"
                    }}>
                      <ListItemIcon sx={{
                        ml: "2rem",
                        color: active === lcText ? theme.palette.primary[500] : theme.palette.primary[300]
                      }}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }}/>
                      )}
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
            <Box position="absolute" bottom="0" width="100%" mb="2rem">
              <Divider/>
              <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                <Box 
                component={currentUser ? "img": "h2"}
                alt={currentUser ? "profile": ""}
                src={currentUser ? currentUser.avatar: "Login"}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{objectFit: "cover"}}
                />
                {!currentUser && <Link href="/sign-In" fontSize="0.9rem"
                        fontWeight="bold" sx={{color: theme.palette.secondary[100], ml: '-80px'}}>Sign In</Link>}
                  <Box textAlign="left">
                      <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: "#fff" }}>
                        {currentUser? currentUser.userName.charAt(0).toUpperCase() + currentUser.userName.slice(1) : ""}
                      </Typography>
                      <Typography  fontSize="0.8rem" sx={{ color: "#fff"}}>
                        {currentUser? currentUser.role || "staff":""}
                      </Typography>
                  </Box>
                  <SettingsOutlined sx={{ color: "#fff", fontSize: "25px" }}/>
              </FlexBetween>
            </Box>
          </Drawer>
      )}

    </Box>
  )
}
