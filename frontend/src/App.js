import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bank, setBank] = useState('');
  const [customMapping, setCustomMapping] = useState({
    date_column: '',
    description_column: '',
    amount_column: '',
    category_column: '',
    merchant_column: '',
  });

  const handleBankChange = (event) => {
    setBank(event.target.value);
    // Reset custom mapping when changing banks
    setCustomMapping({
      date_column: '',
      description_column: '',
      amount_column: '',
      category_column: '',
      merchant_column: '',
    });
  };

  const handleCustomMappingChange = (event) => {
    const { name, value } = event.target;
    setCustomMapping((prevMapping) => ({
      ...prevMapping,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/processdata')
    .then(response => response.json())
    .then(data => console.log("success!"))
    .catch(error => console.error('Error:', error));
    console.log({ bank, customMapping });
  };

  fetch('http://localhost:5000/test')
      .then(response => response.json())
      .then(data => console.log("success!"))
      .catch(error => console.error('Error:', error));

  return (
    <div className="App">
      <h1>RetroSpend</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="bank">Select Bank:</label>
        <select name="bank" id="bank" value={bank} onChange={handleBankChange} required>
          <option value="" disabled>Select a bank</option>
          <option value="Discover">Discover</option>
          <option value="Bank of America">Bank of America</option>
          <option value="Other">Other</option>
        </select>

        {bank === 'Other' && (
          <div>
            <h2>Custom Mapping</h2>
            <label htmlFor="date_column">Date Column:</label>
            <input type="text" name="date_column" id="date_column" required value={customMapping.date_column} onChange={handleCustomMappingChange} />

            <label htmlFor="description_column">Description Column:</label>
            <input type="text" name="description_column" id="description_column" required value={customMapping.description_column} onChange={handleCustomMappingChange} />

            <label htmlFor="amount_column">Amount Column:</label>
            <input type="text" name="amount_column" id="amount_column" required value={customMapping.amount_column} onChange={handleCustomMappingChange} />

            <label htmlFor="category_column">Category Column:</label>
            <input type="text" name="category_column" id="category_column" value={customMapping.category_column} onChange={handleCustomMappingChange} />

            <label htmlFor="merchant_column">Merchant Column:</label>
            <input type="text" name="merchant_column" id="merchant_column" value={customMapping.merchant_column} onChange={handleCustomMappingChange} />
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
