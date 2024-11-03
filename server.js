const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Use the PORT provided by Render or default to 3000

// Middleware to parse JSON data
app.use(express.json());

// Serve static files from the public folder
app.use(express.static('public'));

// POST route to save data
app.post('/submit_names', (req, res) => {
    const { name1, name2, loveScore } = req.body;

    // Read existing data
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const jsonData = data ? JSON.parse(data) : [];

        // Add new entry
        jsonData.push({ name1, name2, loveScore });

        // Write updated data to data.json
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to data file:', err);
                return res.status(500).json({ message: 'Failed to save data' });
            }
            res.json({ message: 'Data saved successfully' });
        });
    });
});

// GET route to serve data.json contents
app.get('/data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(JSON.parse(data || '[]'));
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
