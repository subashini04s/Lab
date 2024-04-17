import React, { useState, useEffect } from 'react';
import './Appl.css';
function App() {
  const [fees, setFees] = useState([]);
  const [examName, setExamName] = useState('');
  const [amount, setAmount] = useState('');
  useEffect(() => {
    fetchFees();
  }, []);
  const fetchFees = async () => {
    try {
      const response = await fetch('/api/fees');
      const data = await response.json();
      setFees(data);
    } catch (error) {
      console.error('Error fetching fees:', error);
    }
  };
  const handleAddFee = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/fees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ examName, amount })
      });
      if (!response.ok) {
        throw new Error('Failed to add fee');
      }
      fetchFees();
      setExamName('');
      setAmount('');
    } catch (error) {
      console.error('Error adding fee:', error);
    }
  };
  const handleUpdateFee = async (id, newExamName, newAmount) => {
    try {
      const response = await fetch(`/api/fees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ examName: newExamName, amount: newAmount })
      });
      if (!response.ok) {
        throw new Error('Failed to update fee');
      }
      fetchFees();
    } catch (error) {
      console.error('Error updating fee:', error);
    }
  };
  return (
    <div className="App">
      <h1>Fee Calculation System</h1>
      <h2>Add Fee</h2>
      <form onSubmit={handleAddFee}>
        <label htmlFor="examName">Exam Name:</label>
        <input type="text" id="examName" value={examName} onChange={(e) => setExamName(e.target.value)} required />
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <button type="submit">Add Fee</button>
      </form>
      <h2>All Fees</h2>
      <ul>
        {fees.map(fee => (
          <li key={fee.id}>
            ID: {fee.id}, Exam Name: {fee.examName}, Amount: {fee.amount}
            <button onClick={() => handleUpdateFee(fee.id, `${fee.examName} Updated`, fee.amount * 2)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
