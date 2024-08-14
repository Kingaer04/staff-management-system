import { React, useState, useEffect } from 'react'
import { Box, useTheme, Button, Link } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'
import DepartmentCard from '../components/departmentCard.jsx'

export default function Department() {
  const { loading, currentUser } = useSelector((state) => state.user);
  const theme = useTheme()
  const [superviseeData, setSuperviseeData] = useState([])
  // console.log(superviseeData)

  useEffect(() => {
    async function fetchData() {
      try {
        const hodID = currentUser._id
        console.log(hodID)
        const res = await fetch(`/department/supervisee/${hodID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await res.json()
        setSuperviseeData(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData();
  }, [])

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5
    },
    {
      field: "userName",
      headerName: "Staff_Name",
      flex: 1,
      renderCell: (params) => (
        <a href={`/staff-profile/${params.row._id}`} target="_blank">
          {params.row.userName}
        </a>
      )
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1
    },
    {
      field: "department",
      headerName: "Department",
      flex: 0.5
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5
    }
  ]
  const cardData = superviseeData.map((data) => {
    return (<div style={{ display: 'inline-block', marginRight: '20px' }}>
      <DepartmentCard 
      key={data.key}
      data={data}
      />
    </div>)
  })

  return (
    <Box m="1.5rem 2.5rem">
      {cardData}
      <Box mt="40px" height="75vh" 
        sx={{
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none"
          },
          "& .MuiDataGrid-virtualScroller": {
            background: theme.palette.primary.light
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.secondary[100],
            borderTop: "none"
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`
          }
        }}>
        <DataGrid
          loading={loading || !superviseeData}
          getRowId={(row) => row._id}
          rows={superviseeData || []}
          columns={columns}
        />
      </Box>
    </Box>
  )
}
