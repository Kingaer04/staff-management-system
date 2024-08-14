import React, { useState } from 'react'

const CodeConductA = ({updateCodeConductA}) => {
  const SN = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7'
  ]
  const questions = [
    'Lateness/disappearance/sleeping (-1pt)', 'Violation of safety/health rules (-1pt)', 'Unchecked visitor entertainment (-1pt)', 'Company car misuse/traffic rule violation (-1pt)', 'Inappropraite and Unprofessional dressing (-1pt)', 'Mixing personal andprofessional dressing (-1pt)', 'Inappropraite use of commputers, internet, social mediaand phone (-1pt)'
  ]

  const [formData, setFormData] = useState([
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' }
  ])

  const handleInputChange = (index, field, value) => {
    setFormData(prevData => {
      const updatedData = [...prevData]
      updatedData[index][field] = value
      return updatedData
    })
    updateCodeConductA(index, field, value)
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
                  value={formData[index].times}
                  onChange={(e) => handleInputChange(index, 'times', e.target.value)}
                  style={{ border: '1px solid black' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData[index].scores}
                  onChange={(e) => handleInputChange(index, 'scores', e.target.value)}
                  style={{ border: '1px solid black' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData[index].description}
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

export default CodeConductA