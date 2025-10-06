import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// Button Component
function Button({ value, onClick, className }) {
  return (
    <button className={`button ${className}`} onClick={() => onClick(value)}>
      {value}
    </button>
  );
}

// Screen Component
function Screen({ input, result }) {
  const inputRef = useRef(null);

  // Auto-scroll input to the right if it overflows
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [input]);

  return (
    <div className="screen">
      <div className="history-display">{result}</div> {/* For the previous result/operation if any */}
      <div className="current-input-wrapper"> {/* Wrapper for scrolling */}
        <div ref={inputRef} className="current-input">{input || '0'}</div>
      </div>
    </div>
  );
}

// Calculator Component
function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(''); // This will hold the previous calculation or empty
  const [previousInput, setPreviousInput] = useState(''); // To display the entire calculation string

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        if (input === '') return; // Don't do anything if input is empty
        const finalExpression = input;
        const calculatedResult = eval(finalExpression.replace('−', '-').replace('×', '*').replace('÷', '/')).toString(); // Replace custom symbols
        setResult(finalExpression + "=" + calculatedResult); // Display full equation
        setInput(calculatedResult); // Set current input to the result for further calculations
        setPreviousInput(''); // Clear previous input to avoid displaying it twice
      } catch (error) {
        setResult('Error');
        setInput('');
        setPreviousInput('');
      }
    } else if (value === 'DEL') {
      setInput(input.slice(0, -1));
      setResult(''); // Clear previous result display when modifying input
    } else if (value === 'AC') { // Clear All button (add this to UI if desired)
      setInput('');
      setResult('');
      setPreviousInput('');
    }
    else if (['÷', '×', '−', '+'].includes(value)) { // Handle operators
      const lastChar = input.slice(-1);
      // If the last character is an operator, replace it with the new one
      if (['÷', '×', '−', '+'].includes(lastChar)) {
        setInput(input.slice(0, -1) + value);
      } else if (input === '' && value === '−') { // Allow negative sign at the beginning
        setInput(value);
      }
      else {
        setInput(input + value);
      }
      setResult(''); // Clear previous result display when adding new operation
    } else if (value === '.') {
      // Prevent multiple decimals in the current number
      const parts = input.split(/[\÷\×\−\+]/); // Split by all operators
      const currentNumber = parts[parts.length - 1];
      if (!currentNumber.includes('.') && currentNumber !== '') { // Only add decimal if not already present and not empty
        setInput(input + value);
      } else if (currentNumber === '' && !input.endsWith('.')) { // Allow . at the beginning if input is empty
          setInput('0.'); // Start with 0. if '.' is pressed first
      }
    }
    else { // Number input
      setInput(input + value);
      setResult(''); // Clear previous result display
    }
  };

  return (
    <div className="calculator">
      <Screen input={input} result={result} />
      <div className="button-grid">
        {/* Top row with operators and DEL */}
        <Button value="÷" onClick={handleButtonClick} className="operator" />
        <Button value="×" onClick={handleButtonClick} className="operator" />
        <Button value="+" onClick={handleButtonClick} className="operator" />
        <Button value="−" onClick={handleButtonClick} className="operator" /> {/* Custom minus sign */}
        <Button value="DEL" onClick={handleButtonClick} className="del-button" />

        {/* Number buttons */}
        <Button value="1" onClick={handleButtonClick} />
        <Button value="2" onClick={handleButtonClick} />
        <Button value="3" onClick={handleButtonClick} />
        <Button value="4" onClick={handleButtonClick} />
        <Button value="5" onClick={handleButtonClick} />
        <Button value="6" onClick={handleButtonClick} />
        <Button value="7" onClick={handleButtonClick} />
        <Button value="8" onClick={handleButtonClick} />
        <Button value="9" onClick={handleButtonClick} />

        {/* Bottom row: 0, ., = */}
        <Button value="0" onClick={handleButtonClick} className="zero-button" />
        <Button value="." onClick={handleButtonClick} className="decimal-button" />
        <Button value="=" onClick={handleButtonClick} className="equals-button" />
      </div>
    </div>
  );
}

// Main App component
function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;