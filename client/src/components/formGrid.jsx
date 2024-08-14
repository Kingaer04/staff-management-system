import React, { useState } from 'react'

const FormGrid = ({updateFormGridData}) => {
  const questions = [
    'JOB KNOWLEDGE',
    'QUALITY OF WORK',
    'PRODUCTIVITY',
    'DEPENDABILITY',
    'ATTENDANCE',
    'UTILIZATION OF RESOURCES',
    'REALTIONS WITH OTHERS',
    'FLEXIBILITY',
    'COMMUNICATION SKILLS',
    'SUPERVISOR ABILITY',
    'BEHAVIOUR/ETHICS',
    'MARKETING',
    'DESIRE FOR IMPROVEMENT'
  ]

  const [formData, setFormData] = useState(Array.from({ length: 13 }, () => ({ selfRating: '', supervisorRating: '', average: '' })));

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
      // updateFormGridData(index, field, value)

      return updatedData;
    })
    updateFormGridData(index, field, value)
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
            <th className='text-left'>RATING FACTORS</th>
            <th className='text-left'>SELF RATING</th>
            <th className='text-left'>SUPERVISOR'S RATING</th>
            <th className='text-left'>AVERAGE</th>
          </tr>
        </thead>
        <tbody className=''>
          {questions.map((question, index) => (
            <tr key={index} className='border-b border-black'>
              <td>{question}</td>
              <td>
                <input
                  type="number"
                  value={formData[index].selfRating}
                  onChange={(e) => handleInputChange(index, 'selfRating', e.target.value)}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormGrid;