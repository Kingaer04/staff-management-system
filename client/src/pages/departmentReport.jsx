import { React, useState } from 'react'
import { useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import CurrentQuarterDate, {currentQuarterDateRange} from '../components/currentQuarter.jsx'
import DepartmentFormGrid from '../components/departmentFormGrid.jsx'
import DepartmentEmployeeFormGrid from '../components/departmentEmployeeFormGrid.jsx'
import DepartmentRecordsAchievement from '../components/departmentRecordsAchievement.jsx'
import DepartmentCodeConductA from '../components/departmentCodeAData.jsx'
import DepartmentCodeConductB from '../components/departmentCodeBData.jsx'
import DepartmentCodeConductC from '../components/departmentCodeCData.jsx'
import DepartmentNewGoal from '../components/departmentNewGoal.jsx'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function DepartmentReport() {
    const navigate = useNavigate()
    const theme = useTheme()
    const location = useLocation()
    const { userReport } = location.state
    // console.log(userReport._id)
    const {currentUser} = useSelector((state) => state.user)
    const SN = [
        '1', '', '', '', '',
        '2', '', '', '', '',
        '3', '', '', '', ''
    ]

    const [formData, setFormData] = useState(userReport ? { review: userReport.review, reviewDate: userReport.reviewDate, employeeName: userReport.employeeName, idNumber: userReport.idNumber, jobTitle: userReport.jobtitle, department: userReport.department, division: userReport.division, unit: userReport.unit, managerName: userReport.managerName, supervisorName: userReport.supervisorName, commentOne: userReport.commentOne, commentTwo: userReport.commentTwo, commentThree: userReport.commentThree } : {review: '', reviewDate: currentQuarterDateRange, employeeName: '', idNumber: '', jobTitle: '', department: '', division: '', unit: '', managerName: '', supervisorName: '', commentOne: '', commentTwo: '', commentThree: '' })
    const [formGridData, setFormGridData] = useState(userReport.formGridData ? userReport.formGridData : Array.from({ length: 13 }, () => ({ selfRating: '', supervisorRating: '', average: '' })))
    const [employeeFormData, setEmployeeFormData] = useState(userReport.employeeFormData ? userReport.employeeFormData : Array.from({ length: 6 }, () => ({ employeeTopJobDescription: '', supervisorRating: '', average: '', supervisorComment: '' })))
    const [recordData, setRecordData] = useState(userReport.recordData ? userReport.recordData : Array.from({ length: 10 }, () => ({ times: '', scores: '', description: ''})))
    const [codeAData, setCodeAData] = useState(userReport.codeAData ? userReport.codeAData : Array.from({ length: 7 }, () => ({ times: '', scores: '', description: ''})))
    const [codeBData, setCodeBData] = useState(userReport.codeBData ? userReport.codeBData : Array.from({ length: 7 }, () => ({ times: '', scores: '', description: ''})))
    const [codeCData, setCodeCData] = useState(userReport.codeCData ? userReport.codeCData : Array.from({ length: 7 }, () => ({ times: '', scores: '', description: ''})))
    const [newGoalData, setNewGoalData] = useState(userReport.newGoalData ? userReport.newGoalData : Array.from({ length: 15 }, () => ({ description: '' })))
    console.log(currentUser._id, userReport._id, userReport.userId)
    const updateFormGridData = (index, field, value) => {
        setFormGridData(prevData => {
          const updatedData = [...prevData];
          updatedData[index][field] = value;
    
          // Update the average for all rows
          for (let i = 0; i < updatedData.length; i++) {
            if (updatedData[i].selfRating !== '' && updatedData[i].supervisorRating !== '') {
              const supervisorRatings = updatedData.slice(i).map(row => parseFloat(row.supervisorRating));
              const average = supervisorRatings.reduce((sum, rating) => sum + rating, 0) / supervisorRatings.length;
              updatedData[i].average = average.toFixed(2);
            } else {
              updatedData[i].average = '';
            }
          }
          return updatedData;
        });
      }

      const updateEmployeeFormGridData = (index, field, value) => {
        setEmployeeFormData(prevData => {
          const updatedData = [...prevData];
          updatedData[index][field] = value;
    
          // Update the average for all rows
          for (let i = 0; i < updatedData.length; i++) {
            if (updatedData[i].selfRating !== '' && updatedData[i].supervisorRating !== '') {
              const supervisorRatings = updatedData.slice(i).map(row => parseFloat(row.supervisorRating));
              const average = supervisorRatings.reduce((sum, rating) => sum + rating, 0) / supervisorRatings.length;
              updatedData[i].average = average.toFixed(2);
            } else {
              updatedData[i].average = '';
            }
          }
          return updatedData;
        })
      }

    const updateRecordData = (index, field, value) => {
        setRecordData(prevData => {
          const updatedData = [...prevData]
          updatedData[index][field] = value
          return updatedData
        })
    }

    const updateCodeConductA = (index, field, value) => {
        setCodeAData(prevData => {
          const updatedData = [...prevData]
          updatedData[index][field] = value
          return updatedData
        })
    }
    const updateCodeConductB = (index, field, value) => {
        setCodeBData(prevData => {
          const updatedData = [...prevData]
          updatedData[index][field] = value
          return updatedData
        })
    }
    const updateCodeConductC = (index, field, value) => {
        setCodeCData(prevData => {
          const updatedData = [...prevData]
          updatedData[index][field] = value
          return updatedData
        })
    }
    const updateNewGoal = (index, field, value) => {
        setNewGoalData(prevData => {
          const updatedData = [...prevData];
          updatedData[index] = { ...updatedData[index], [field]: value };
          return updatedData;
        })
      }
    

    const handleSubmit = async (event) => {
        event.preventDefault()
        const combinedState = {
            ...formData,
            formGridData: [...formGridData],
            employeeFormData: [...employeeFormData],
            recordData: [...recordData],
            codeAData: [...codeAData],
            codeBData: [...codeBData],
            codeCData: [...codeCData],
            newGoalData: [...newGoalData],
          }
        console.log(combinedState)
        try {
            const res = await fetch(`/report/reports/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(combinedState)
            })
            const data = await res.json()
            console.log(data)

        } catch (error) {
            console.log(error)
            console.log(combinedState)
        }
    }

    function handleChange(event) {
        const{id, value, name} = event.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name] : value
            }
        })
    }

    const handleSubmitAdmin = async (event) => {
        event.preventDefault()
        const combinedState = {
            ...formData,
            formGridData: [...formGridData],
            employeeFormData: [...employeeFormData],
            recordData: [...recordData],
            codeAData: [...codeAData],
            codeBData: [...codeBData],
            codeCData: [...codeCData],
            newGoalData: [...newGoalData],
        }
        console.log(combinedState)
        try {
        const response = await fetch(`/department/supervisee/${currentUser._id}/${userReport._id}/${userReport.userId}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(combinedState)
        })
    
        const data = await response.json()
        console.log(data)
        // navigate('/department')
        } catch (error) {
        console.error('Error sending to admin:', error)
        // Display an error message or handle the error as needed
        }
    }

    const handleSubmitBack = async (event) => {
        event.preventDefault()
        const combinedState = {
            ...formData,
            formGridData: [...formGridData],
            employeeFormData: [...employeeFormData],
            recordData: [...recordData],
            codeAData: [...codeAData],
            codeBData: [...codeBData],
            codeCData: [...codeCData],
            newGoalData: [...newGoalData],
        }
        try {
            const response = await fetch('/department/supervisee', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(combinedState),
            });
            const data = await response.json()
            console.log(data)
            // navigate('/department')
        }
        catch (error) {
            console.error('Error sending back to employee:', error)
        }
    }
    

    return (
        <div className='p-5 w-screen h-screen' style={{ backgroundColor: theme.palette.secondary[700], height: '100%' }}>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-blue-700 bg-blue-100 w-full text-center p-1 font-bold uppercase'>Employee performance Appraisal Form</h2>
                <h5 className='bg-gray-300 text-black w-full text-center p-1 uppercase font-bold'>Background Information</h5>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col text-black w-full' style={{ border: '1px solid gray', backgroundColor: '#fff' }}>
                    <div className='flex w-full justify-between items-center' style={{ border: '1px solid gray' }}>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Review Period:</h5>
                            </div>
                            <div className='flex-1'>
                                <select className=' focus:outline-none' id='review' name='review' onChange={handleChange} value={formData.review}>
                                    <option value="">Review Period</option>
                                    <option value="first">January - March</option>
                                    <option value="second">April - June</option>
                                    <option value="third">July - September</option>
                                    <option value="fourth">October - December</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Review Date:</h5>
                            </div>
                            <div className='flex-1'>
                                <CurrentQuarterDate/>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-between items-center' style={{ border: '1px solid black' }}>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Employee Name:</h5>
                            </div>
                            <div className='flex-1'>
                                <input type='text' style={{ border: '1px solid black' }} name='employeeName' onChange={handleChange} value={formData.employeeName}/>
                            </div>
                        </div>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>ID Number:</h5>
                            </div>
                            <div className='flex-1'>
                                <input type='text' style={{ border: '1px solid black' }} name='idNumber' onChange={handleChange} value={formData.idNumber}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-between items-center' style={{ border: '1px solid black' }}>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Job Title/Rank:</h5>
                            </div>
                            <div className='flex-1'>
                                <input type='text' style={{ border: '1px solid black' }} name='jobTitle' onChange={handleChange} value={formData.jobTitle}/>
                            </div>
                        </div>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Department:</h5>
                            </div>
                            <div className='flex-1'>
                                <select className='focus:outline-none' id='department' name='department' onChange={handleChange} value={formData.department}>
                                    <option value="">Department</option>
                                    <option value="DAS">DAS</option>
                                    <option value="DEM">DEM</option>
                                    <option value="DPA">DPA</option>
                                    <option value="RCD">RCD</option>
                                    <option value="AHR">AHR</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-between items-center' style={{ border: '1px solid black' }}>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Division:</h5>
                            </div>
                            <div className='flex-1'>
                                <input type='text' style={{ border: '1px solid black' }} name='division' onChange={handleChange} value={formData.division}/>
                            </div>
                        </div>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Unit:</h5>
                            </div>
                            <div className='flex-1'>
                                <input type='text' style={{ border: '1px solid black' }} name='unit' onChange={handleChange} value={formData.unit}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-between items-center' style={{ border: '1px solid black' }}>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Manager's Name:</h5>
                            </div>
                            <div className='flex-1'>
                                <input type='text' style={{ border: '1px solid black' }} name='managerName' onChange={handleChange} value={formData.managerName}/>
                            </div>
                        </div>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Evaluated by (Supervisor) Name and Sign:</h5>
                            </div>
                            <div className='flex-1'>
                                <input type='text' style={{ border: '1px solid black' }} name='supervisorName' onChange={handleChange} value={formData.supervisorName}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-cyan-900 bg-cyan-400 w-full text-center p-3 font-bold uppercase'></h2>
                        <h5 className='bg-blue-600 text-black w-full text-center p-1 uppercase font-bold'>General performance Rating (Max.Score = 30, Factor = 5.0)</h5>
                    </div>
                    <DepartmentFormGrid updateFormGridData={updateFormGridData} userReport={userReport}/>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-cyan-900 bg-cyan-400 w-full text-center p-3 font-bold uppercase'></h2>
                        <h5 className='bg-blue-600 text-black w-full text-center p-1 uppercase font-bold'>Employee Job Description Rating (Max.Score = 30, Factor = 5.0)</h5>
                    </div>
                    <DepartmentEmployeeFormGrid updateEmployeeFormGridData={updateEmployeeFormGridData} userReport={userReport}/>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-cyan-900 bg-cyan-400 w-full text-center p-3 font-bold uppercase'></h2>
                        <h5 className='bg-blue-600 text-black w-full text-center p-1 uppercase font-bold'>Records of achievement (Max.Score = 30, Factor = 5.0)</h5>
                    </div>
                    <DepartmentRecordsAchievement updateRecordData={updateRecordData} userReport={userReport}/>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-cyan-900 bg-cyan-400 w-full text-center p-3 font-bold uppercase'></h2>
                        <h5 className='bg-blue-600 text-black w-full text-center p-1 uppercase font-bold'>Conduct and disciplinary Actions (Max.Score = 30)</h5>
                    </div>
                    <DepartmentCodeConductA updateCodeConductA={updateCodeConductA} userReport={userReport}/>
                    <h5 className='bg-blue-300' style={{ border: '1px solid black' }}>B</h5>
                    <DepartmentCodeConductB updateCodeConductB={updateCodeConductB} userReport={userReport}/>
                    <h5 className='bg-blue-300' style={{ border: '1px solid black' }}>C</h5>
                    <DepartmentCodeConductC updateCodeConductC={updateCodeConductC} userReport={userReport}/>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-cyan-900 bg-cyan-400 w-full text-center p-3 font-bold uppercase'></h2>
                        <h5 className='bg-blue-600 text-black w-full text-center p-1 uppercase font-bold'>New Project Goals (Max.Score = 5)</h5>
                    </div>
                    <DepartmentNewGoal updateNewGoal={updateNewGoal} userReport={userReport}/>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-cyan-900 bg-cyan-400 w-full text-center p-3 font-bold uppercase'></h2>
                        <h5 className='bg-blue-600 text-black w-full text-center p-1 uppercase font-bold'>General comments</h5>
                    </div>
                    <div className='flex flex-col'>
                        <div>
                            <h5>
                                1. What do you consider as the major strength of this employee and in what further area can the company make good use of such strength?
                            </h5>
                            <textarea name="commentOne" className='w-full' style={{ border: '1px solid black' }} onChange={handleChange} value={formData.commentOne}></textarea>
                        </div>
                        <div>
                            <h5>
                                2. In what major area does the employee require improvement and suggest what can be done by the company and employee in such area?
                            </h5>
                            <textarea name="commentTwo" className='w-full' style={{ border: '1px solid black' }} onChange={handleChange} value={formData.commentTwo}></textarea>
                        </div>
                        <div>
                            <h5>
                                3. What specific needs (e.g. training, facilities, counselling, redeployment, separation etc) does the employee require to further improve his/her contribution?
                            </h5>
                            <textarea name="commentThree" className='w-full' style={{ border: '1px solid black' }} onChange={handleChange} value={formData.commentThree}></textarea>
                        </div>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <button onClick={handleSubmitAdmin} className='p-3 rounded-lg uppercase text-xl mt-4' style={{ backgroundColor: theme.palette.primary[700] }}>Send to Admin</button>
                    <button onClick={handleSubmitBack} className='p-3 rounded-lg uppercase text-xl mt-4 bg-red-700'>Send back to {userReport.employeeName}</button>
                </div>
            </form>
        </div>
    )
}
