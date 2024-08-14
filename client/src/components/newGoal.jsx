import React, { useState } from 'react'

const NewGoal = ({updateNewGoal}) => {
    const SN = [
        '1', '', '', '', '',
        '2', '', '', '', '',
        '3', '', '', '', ''
    ]
    const questions = [
        'GOAL NAME', 'Objectives', 'Due Date', 'Action Items / Steps /Milestones', 'Measures of Success (KPI)','GOAL NAME', 'Objectives', 'Due Date', 'Action Items / Steps /Milestones', 'Measures of Success (KPI)','GOAL NAME', 'Objectives', 'Due Date', 'Action Items / Steps /Milestones', 'Measures of Success (KPI)'
    ]

  const [formData, setFormData] = useState(Array.from({ length: 15 }, () => ({ description: '' })));

  const handleInputChange = (index, field, value) => {
    setFormData(prevData => {
      const updatedData = [...prevData]
      updatedData[index][field] = value
      return updatedData
    })
    updateNewGoal(index, field, value)
  }

  return (
    <div className='flex w-full justify-between items-center' style={{ border: '1px solid black' }}>
      <table className='w-full'>
        <thead>
        <tr className='border-b border-black'>
            <th className='text-left'>SN</th>
            <th className='text-left'>NEW GOAL CRITERIA</th>
            <th className='text-left'>DESCRIPTION</th>
        </tr>
        </thead>
        <tbody className=''>
          {SN.map((sn, index) => (
            <tr key={index} className='border-b border-black'>
              <td>{sn}</td>
              <td>{questions[index]}</td>
              <td>
                <input
                    type="text"
                    value={formData[index].description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    className={`
                        border-1 border-black w-4/5
                        ${index % 2 === 0 ? 'bg-blue-600 text-white' : 'bg-cyan-400 text-white'}
                    `}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NewGoal