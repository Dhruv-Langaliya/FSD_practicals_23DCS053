const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Helper function: render HTML with optional result/error
function renderPage(resultMessage = "") {
  return `
    <html>
      <head>
        <title>Kids Calculator</title>
        <style>
          body { 
            font-family: Comic Sans MS, Arial, sans-serif; 
            background: linear-gradient(135deg, #fdfbfb, #ebedee);
            padding: 40px; 
            text-align: center; 
          }
          .container {
            background: #fff;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 6px 15px rgba(0,0,0,0.1);
            display: inline-block;
            min-width: 320px;
          }
          h1 { color: #ff6f61; margin-bottom: 20px; }
          input, select {
            padding: 12px; 
            margin: 8px; 
            border-radius: 12px; 
            border: 2px solid #ccc; 
            font-size: 16px;
            width: 80%;
          }
          button {
            background: #4CAF50; 
            color: white; 
            font-size: 18px;
            border: none; 
            border-radius: 12px; 
            padding: 12px 20px; 
            cursor: pointer;
            margin-top: 10px;
          }
          button:hover { background: #45a049; }
          .result { 
            margin-top: 20px; 
            font-size: 22px; 
            color: #2196F3; 
            font-weight: bold;
          }
          .error { 
            margin-top: 20px; 
            font-size: 20px; 
            color: red; 
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎉 Kids Calculator 🎉</h1>
          <form action="/calculate" method="post">
            <input type="text" name="num1" placeholder="Enter first number" required /><br/>
            <input type="text" name="num2" placeholder="Enter second number" required /><br/>
            <select name="operation">
              <option value="add">➕ Add</option>
              <option value="subtract">➖ Subtract</option>
              <option value="multiply">✖ Multiply</option>
              <option value="divide">➗ Divide</option>
            </select><br/>
            <button type="submit">Calculate</button>
          </form>
          ${resultMessage}
        </div>
      </body>
    </html>
  `;
}

// Serve the calculator form
app.get("/", (req, res) => {
  res.send(renderPage());
});

// Handle calculation
app.post("/calculate", (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const operation = req.body.operation;

  if (isNaN(num1) || isNaN(num2)) {
    return res.send(renderPage(`<div class="error">❌ Invalid input! Please enter numbers only.</div>`));
  }

  let result;
  switch (operation) {
    case "add": result = num1 + num2; break;
    case "subtract": result = num1 - num2; break;
    case "multiply": result = num1 * num2; break;
    case "divide":
      if (num2 === 0) {
        return res.send(renderPage(`<div class="error">❌ Cannot divide by zero!</div>`));
      }
      result = num1 / num2; break;
    default:
      return res.send(renderPage(`<div class="error">❌ Unknown operation!</div>`));
  }

  res.send(renderPage(`<div class="result">✅ Result: ${result}</div>`));
});

app.listen(port, () => {
  console.log(`Kids Calculator running at http://localhost:${port}`);
});
