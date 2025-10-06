import React from 'react';
import Counter from './components/Counter';
import './index.css'; // This now imports our custom CSS

function App() {
  return (
    <div className="app-container">
      <Counter />
      <footer className="app-footer">
        <p>Built with React. Ready to go.</p>
      </footer>
    </div>
  );
}

export default App;
