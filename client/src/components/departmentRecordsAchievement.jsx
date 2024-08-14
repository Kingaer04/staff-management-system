import React, { useState } from 'react'

const DepartmentRecordsAchievement = ({updateRecordData, userReport}) => {
  const SN = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
  ]
  const questions = [
    'Commendation (written=1pt; award=2pts)', 'Training (departmental=0.5pt; organisational=pts; invitation=1.5pts;online=2pts;external=3pts)', 'Publications (internal or online blog=1-2pts)', 'Publications (academic research papers=3 - 5pts)', 'Seminar/conference (attendance=2pts;organizing=3pts; speaking=3pts)', 'Certification (professional=2-3pts; academic (3-10pts))', 'Ratio of business brought to period remuneration (1=5pts)', 'Overtime/extra hours (2hrs=1pt)', 'Interdepartmental activities/committee participation (1-1pt)', 'Suggestions/innovation to improve job function (1-1pt)'
  ]

  const [recordData, setRecordData] = useState(userReport.recordData ? userReport.recordData : Array.from({ length: 10 }, () => ({ times: '', scores: '', description: ''})))

  const handleInputChange = (index, field, value) => {
    setRecordData(prevData => {
      const updatedData = [...prevData]
      updatedData[index][field] = value
      return updatedData
    })
    updateRecordData(index, field, value)
  }

  return (
    <div className='flex w-full justify-between items-center' style={{ border: '1px solid black' }}>
      <table className='w-full'>
        <thead>
          <tr className='border-b border-black'>
            <th className='text-left'>SN</th>
            <th className='text-left'>ACHIEVEMENT/ COMMENDATION</th>
            <th className='text-left'>TIMES</th>
            <th className='text-left'>SCORES (TIMES X PTS)</th>
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
                  value={recordData[index].times}
                  onChange={(e) => handleInputChange(index, 'times', e.target.value)}
                  style={{ border: '1px solid black' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={recordData[index].scores}
                  onChange={(e) => handleInputChange(index, 'scores', e.target.value)}
                  style={{ border: '1px solid black' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={recordData[index].description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  style={{ border: '1px solid black' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DepartmentRecordsAchievement