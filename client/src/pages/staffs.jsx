import { React, useState, useEffect } from 'react'
import { Box, useTheme, Button, Link } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'
import EditStaffInfo from './editStaffInfo.jsx';

export default function Staffs() {
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const theme = useTheme()
  const [staffData, setStaffData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/employee/staffs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await res.json()
        setStaffData(data.staffs)
      } catch (error) {
        console.log(error);
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
      field: "address",
      headerName: "Address",
      flex: 1.5
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

  // Remove the action buttons if the user has the 'admin' role
  const finalColumns = currentUser && currentUser.role !== 'admin' ? columns : [
    ...columns,
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <ActionsComponent params={params} />
      )
    },
  ]

  function ActionsComponent({ params }) {
    const id = params.row._id
  
    return (
      <Box>
        <Link href={`/staffs/edit/${id}`} id={id}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(params)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
        </Link>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params)}
        >
          Delete
        </Button>
      </Box>
    );
  }

  const handleEdit = (params) => {
    // Add your edit logic here
    console.log('Editing staff:', params.row)

    // Make an API call to delete the staff member
    fetch(`/employee/staffs/${params.row._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        console.log('Staff member data edited successfully')
        window.location.reload()
      } else {
        console.error('Error in editing staff data:', response.status);
      }
    })
    .catch(error => {
      console.error('Error in editing staff data:', error)
    })
  }

  const handleDelete = (params) => {
    // Add your delete logic here
    console.log('Deleting staff:', params.row);
  
    // Make an API call to delete the staff member
    fetch(`/employee/staffs/${params.row._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        console.log('Staff member deleted successfully')
        window.location.reload()
      } else {
        console.error('Error deleting staff member:', response.status);
      }
    })
    .catch(error => {
      console.error('Error deleting staff member:', error)
    })
  }

  return (
    <Box m="1.5rem 2.5rem">
      {
        currentUser.role === "admin" ? (
          <div className='flex items-end justify-end'>
            <Link href="/sign-Up">
              <button className='p-3 text-white rounded-lg' style={{backgroundColor: theme.palette.primary[300]}}>
                ADD STAFF
              </button>
            </Link>
      </div>
        ) : ''
      }
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
          loading={loading || !staffData}
          getRowId={(row) => row._id}
          rows={staffData || []}
          columns={finalColumns}
        />
      </Box>
    </Box>
  )
}