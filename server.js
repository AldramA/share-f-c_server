const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));

// Store shared items in memory (in a real app, you'd use a database)
let sharedItems = [];

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/share', (req, res) => {
    const { text, fileInfo } = req.body;
    
    if (text || fileInfo) {
        const item = {
            id: Date.now(),
            text: text,
            file: fileInfo,
            timestamp: new Date().toISOString()
        };
        sharedItems.unshift(item);
        res.json({ success: true, item });
    } else {
        res.status(400).json({ success: false, message: 'No content provided' });
    }
});

app.get('/items', (req, res) => {
    res.json(sharedItems);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
