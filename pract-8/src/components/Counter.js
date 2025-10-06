import React, { useState, useEffect } from 'react';

// This component encapsulates all the counter functionality.
const Counter = () => {
    // --- State Management with useState ---
    const [count, setCount] = useState(() => {
        const savedCount = localStorage.getItem('repCount');
        return savedCount !== null ? parseInt(savedCount, 10) : 0;
    });

    // --- Side Effects with useEffect ---
    useEffect(() => {
        localStorage.setItem('repCount', count);
    }, [count]);

    // --- Event Handler Functions ---
    const handleIncrease = () => setCount(prevCount => prevCount + 1);
    const handleDecrease = () => setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    const handleReset = () => setCount(0);

    // --- JSX with plain CSS class names ---
    return (
        <div className="counter-card">
            <header className="card-header">
                <h1>Rep Counter (React)</h1>
                <p>Your count is saved automatically.</p>
            </header>

            <div className="counter-display-container">
                <div className="counter-display">
                    {count}
                </div>
            </div>

            <div className="button-group">
                <button 
                    onClick={handleDecrease} 
                    className="action-button decrease-button"
                >
                    -
                </button>
                <button 
                    onClick={handleIncrease} 
                    className="action-button increase-button"
                >
                    +
                </button>
            </div>
            
            <div className="reset-container">
                 <button 
                    onClick={handleReset} 
                    className="reset-button"
                 >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Counter;
