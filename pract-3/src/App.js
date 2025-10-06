import React, { useState, useEffect } from 'react';
import './App.css'; // You can keep this for basic styling or remove if not needed

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Set up an interval to update the currentDateTime state every second (1000ms)
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  // --- Date and Time Formatting ---
  // Options for formatting the date
  const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  };

  // Options for formatting the time (12-hour format with AM/PM, including seconds)
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true // Use 12-hour clock (e.g., 1:01:41 PM)
  };

  // Format the date string based on the currentDateTime state
  // Using 'en-US' for a common date format like "MM/DD/YYYY"
  const formattedDate = currentDateTime.toLocaleDateString('en-US', dateOptions);

  // Format the time string based on the currentDateTime state
  const formattedTime = currentDateTime.toLocaleTimeString('en-US', timeOptions);
  // --- End Formatting ---

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to CHARUSAT!!!!</h1>
      <p style={{ fontSize: '1.2em', margin: '10px 0' }}>It is {formattedDate}</p>
      <p style={{ fontSize: '1.2em', margin: '10px 0' }}>It is {formattedTime}</p>
    </div>
  );
}

export default App;