const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

// Endpoint to fetch data from Google Sheets
app.get('/data', async (req, res) => {
    try {
        // Replace 'YOUR_SHEET_URL' with the URL of your Google Sheet
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/1J_NZ-Fnok0mC_i9rCVVpr65_cUdhJx0D5cMkOfgiPsQ/edit?resourcekey#gid=104536495';
        const response = await fetch(sheetUrl);
        const data = await response.text();
        // Send the fetched data as response
        res.send(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});