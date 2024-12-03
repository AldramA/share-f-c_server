#!/usr/env node
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const os = require('os');

const app = express();
const port = process.env.PORT || 3000;

// Get local IP addresses
function getLocalIPs() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    
    for (const interfaceName in interfaces) {
        const interface = interfaces[interfaceName];
        for (const address of interface) {
            // Skip internal and non-IPv4 addresses
            if (!address.internal && address.family === 'IPv4') {
                addresses.push(address.address);
            }
        }
    }
    return addresses;
}

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

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`\nServer is running on:`);
    console.log(`- Local: http://localhost:${port}`);
    
    // Display all available IP addresses
    const localIPs = getLocalIPs();
    localIPs.forEach(ip => {
        console.log(`- Network: http://${ip}:${port}`);
    });
    
    console.log('\nUse any of these addresses to connect to the server');
    console.log('To make it accessible from other devices, use the Network address');
});
