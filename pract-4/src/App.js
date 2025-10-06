import React, { useState, useEffect } from 'react';

function App() {
  // Track app open count in localStorage
  useEffect(() => {
    // Prevent double increment in React StrictMode (development)
    if (window.__appOpenCountIncremented) return;
    window.__appOpenCountIncremented = true;
    const key = 'appOpenCount';
    let count = parseInt(localStorage.getItem(key), 10);
    if (isNaN(count)) count = 0;
    count += 1;
    localStorage.setItem(key, count);
    // Expose a getter for 'count' on window
    Object.defineProperty(window, 'count', {
      get: function() {
        return parseInt(localStorage.getItem(key), 10) || 0;
      },
      configurable: true
    });
  }, []);

  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);
  const reset = () => setCount(0);
  const incrementFive = () => setCount(prevCount => prevCount + 5);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Count: {count}</h1>
      <button onClick={reset}>Reset</button>{' '}
      <button onClick={increment}>Increment</button>{' '}
      <button onClick={decrement}>Decrement</button>{' '}
      <button onClick={incrementFive}>Increment 5</button>

      <h1 style={{ marginTop: '40px' }}>Welcome to CHARUSAT!!!</h1>

      <div style={{ margin: '20px' }}>
        <label>First Name: </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br /><br />
        <label>Last Name: </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
    </div>
  );
}

export default App;
