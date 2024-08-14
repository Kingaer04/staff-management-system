import React, { useState } from 'react'

const EmployeeFormGrid = ({updateEmployeeFormGridData}) => {
  const questions = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
  ]

  const [formData, setFormData] = useState(Array.from({ length: 6 }, () => ({ employeeTopJobDescription: '', supervisorRating: '', average: '', supervisorComment: '' })))

  const handleInputChange = (index, field, value) => {
    setFormData(prevData => {
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
    updateEmployeeFormGridData(index, field, value)
  }

  const getAverageColor = (average) => {
    if (average >= 25) {
      return 'bg-green-500 text-white';
    } else if (average >= 20) {
      return 'bg-green-300 text-black';
    } else if (average >= 15) {
      return 'bg-green-100 text-black';
    } else if (average >= 10) {
      return 'bg-pink-300 text-black';
    } else {
      return 'bg-red-300 text-black';
    }
  };

  return (
    <div className='flex w-full justify-between items-center' style={{ border: '1px solid black' }}>
      <table className='w-full'>
        <thead>
          <tr className='border-b border-black'>
            <th className='text-left'>SN</th>
            <th className='text-left'>EMPLOYEE TOP 6 JOB DESCRIPTION (LIST)</th>
            <th className='text-left'>SUPERVISOR'S RATING</th>
            <th className='text-left'>AVERAGE</th>
            <th className='text-left'>SUPERVISOR'S COMMENT</th>
          </tr>
        </thead>
        <tbody className=''>
          {questions.map((question, index) => (
            <tr key={index} className='border-b border-black'>
              <td>{question}</td>
              <td>
                <input
                  type="text"
                  value={formData[index].employeeTopJobDescription}
                  onChange={(e) => handleInputChange(index, 'employeeTopJobDescription', e.target.value)}
                  style={{ border: '1px solid black', width: '80%' }}
                  max='30'
                  min='0'
                />
              </td>
              <td>
                <input
                  type="number"
                  value={formData[index].supervisorRating}
                  onChange={(e) => handleInputChange(index, 'supervisorRating', e.target.value)}
                  style={{ border: '1px solid black', width: '80%' }}
                  max='30'
                  min='0'
                />
              </td>
              <td>
                <input
                  type="number"
                  value={formData[index].average}
                  readOnly
                  className={getAverageColor(parseFloat(formData[index].average))}
                  style={{
                    border: '1px solid black',
                    width: '80%'
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData[index].supervisorComment}
                  onChange={(e) => handleInputChange(index, 'supervisorComment', e.target.value)}
                  style={{ border: '1px solid black', width: '80%' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeFormGrid;