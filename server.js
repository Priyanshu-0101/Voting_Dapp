const express = require("express");
const path = require("path");
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'html/homepage.html'));
});

app.get('/addcandidatepage.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/addcandidatepage.html'));
});

app.get('/votingpage.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/votingpage.html'));
});

app.get('/resultpage.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/resultpage.html'));
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(5500, () => {
  console.log('Server listening on http://localhost:5500');
});
