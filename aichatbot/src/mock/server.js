// src/mock/server.js or in your local server setup
app.post("/api/ask", (req, res) => {
    const { question } = req.body;
    res.json({ answer: `Here's a mock answer for: "${question}"` });
  });
  