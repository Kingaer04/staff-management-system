import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react"
import { Button } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

export default function DepartmentCard(props) {
  const navigate = useNavigate()
  const [employeeAppraisal, setEmployeeAppraisal] = useState({
    formData: {
      formGridData: [],
    },
  })

  const handleReadMoreClick = async (userId) => {
    try {
      const response = await fetch(`/report/userReports/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        setEmployeeAppraisal({ formData: data })
        navigate('/editReport', { state: { userReport: data } })
      } else {
        console.error('Error fetching user report data:', response.status)
      }
    } catch (error) {
      console.error('Error fetching user report data:', error)
    }
  }

  return (
    <Card className="mt-6 w-60 rounded-lg text-black">
      <CardHeader color="blue-gray" className="relative h-48">
        <img
          src={props.data.avatar}
          alt="card-image"
          width="100%"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.data.userName}
        </Typography>
        <Typography>
          Role: {props.data.role}
        </Typography>
        <Typography>
          Joined: {props.data.createdAt}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={() => handleReadMoreClick(props.data._id)}>Read More</Button>
      </CardFooter>
    </Card>
  )
}