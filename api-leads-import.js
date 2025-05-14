const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/api/leads/import", (req, res) => {
  console.log("✅ Received leads:", req.body);
  res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}`);
});
