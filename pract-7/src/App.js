import React, { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Close sidebar after clicking
    }
  };

  return (
    <div className="container">
      <div className="navbar">
        <button onClick={toggleSidebar} className="menu-button">
          ☰
        </button>
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="link" onClick={() => scrollToSection("home")}>🏠 Home</button>
        <button className="link" onClick={() => scrollToSection("about")}>ℹ️ About</button>
        <button className="link" onClick={() => scrollToSection("contact")}>📞 Contact</button>
      </div>

      <div className="content">
        <section id="home">
          <h1>Welcome to <span>My Website</span></h1>
          <p>This is the <strong>main content</strong> of the homepage.</p>
        </section>

        <section id="about">
          <h2>About Us</h2>
          <p>This section tells you more about the website or person.</p>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <p>Reach out via email or phone. This section can hold a form too.</p>
        </section>
      </div>
    </div>
  );
}

export default App;
