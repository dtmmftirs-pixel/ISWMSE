const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static assets and static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Send main web application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`ISWMSE 2026 Portal is running on port ${PORT}`);
});
