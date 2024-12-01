# Terminal-Style File Sharing Web App

A modern, terminal-themed web application for real-time file sharing and text messaging. Files are shared directly between users without server storage, using browser-based technologies.

![Terminal File Sharing](https://raw.githubusercontent.com/yourusername/terminal-file-sharing/main/screenshot.png)

## Features

- 🌑 Dark terminal-inspired interface
- 📁 Direct file sharing without server storage
- 💬 Text message sharing
- ⚡ Real-time updates
- 🔒 Browser-based file handling
- 📱 Responsive design
- 🎨 Tokyo Night color scheme

## How It Works

This application uses modern web technologies to enable direct file sharing:
- Files are converted to data URLs in the browser
- No files are stored on the server
- Instant file sharing and downloading
- Real-time updates every 5 seconds

## Technologies Used

- **Frontend:**
  - HTML5
  - CSS3 (with CSS Variables)
  - JavaScript (ES6+)
  - FileReader API
  - Data URLs

- **Backend:**
  - Node.js
  - Express.js
  - In-memory data storage

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/terminal-file-sharing.git
   cd terminal-file-sharing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Sharing Files
1. Click the "SELECT FILE" button
2. Choose a file from your device
3. Click "SHARE"
4. The file will be immediately available for others to download

### Sharing Messages
1. Type your message in the text area
2. Click "SHARE"
3. The message will appear in real-time for all users

### Downloading Files
1. Click on any shared file name
2. The file will automatically download to your device

## Project Structure

```
terminal-file-sharing/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Terminal-themed styles
│   └── script.js       # Client-side JavaScript
├── server.js           # Express server
├── package.json        # Project dependencies
└── README.md          # This file
```

## Limitations

- Maximum file size is limited by browser memory
- Files are temporary (only available while server is running)
- Data URLs can be large for big files
- No persistent storage

## Security Considerations

- Files are handled entirely in the browser
- No server-side file storage
- Data is not persistent
- No user authentication (can be added if needed)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by terminal interfaces
- Uses the Tokyo Night color scheme
- Built with modern web technologies

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with ❤️ by [Your Name]
