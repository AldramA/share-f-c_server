// Update selected file name
document.getElementById('file').addEventListener('change', function(e) {
    const fileName = e.target.files[0] ? e.target.files[0].name : 'No file selected';
    document.getElementById('selected-file-name').textContent = fileName;
});

// Function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Function to convert file to data URL
function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Function to create download link
function createDownloadLink(dataUrl, fileName) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    a.textContent = fileName;
    return a;
}

// Function to load shared items
async function loadItems() {
    try {
        const response = await fetch('/items');
        const items = await response.json();
        const itemsList = document.getElementById('itemsList');
        itemsList.innerHTML = items.map(item => `
            <div class="item">
                ${item.text ? `
                    <div class="message-container">
                        <p class="message-text">${item.text.replace(/\n/g, '<br>')}</p>
                        <button class="copy-button" data-text="${encodeURIComponent(item.text)}">
                            <span class="copy-icon">📋</span>
                            <span class="copy-tooltip">Copy</span>
                        </button>
                    </div>
                ` : ''}
                ${item.file ? `
                    <div class="file-info">
                        <a href="${item.file.dataUrl}" download="${item.file.name}" class="download-link">
                            ${item.file.name}
                        </a>
                        <span class="file-size">(${formatFileSize(item.file.size)})</span>
                    </div>
                ` : ''}
                <div class="timestamp">${new Date(item.timestamp).toLocaleString()}</div>
            </div>
        `).join('');

        // Add click event listeners to copy buttons
        document.querySelectorAll('.copy-button').forEach(button => {
            button.addEventListener('click', async function() {
                const textToCopy = decodeURIComponent(this.dataset.text);
                const tooltip = this.querySelector('.copy-tooltip');

                try {
                    // Try modern clipboard API first
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(textToCopy);
                        showTooltip(tooltip, 'Copied!');
                    } else {
                        // Fallback for mobile and non-HTTPS
                        const textArea = document.createElement('textarea');
                        textArea.value = textToCopy;
                        textArea.style.position = 'fixed';
                        textArea.style.left = '-999999px';
                        textArea.style.top = '-999999px';
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();

                        try {
                            document.execCommand('copy');
                            textArea.remove();
                            showTooltip(tooltip, 'Copied!');
                        } catch (err) {
                            console.error('Fallback: Oops, unable to copy', err);
                            showTooltip(tooltip, 'Press & hold to copy');
                            textArea.remove();
                        }
                    }
                } catch (err) {
                    console.error('Failed to copy text:', err);
                    showTooltip(tooltip, 'Press & hold to copy');
                }
            });
        });

        // Helper function to show tooltip message
        function showTooltip(tooltip, message) {
            tooltip.textContent = message;
            setTimeout(() => {
                tooltip.textContent = 'Copy';
            }, 2000);
        }

        document.getElementById('status').textContent = 'Items loaded successfully';
    } catch (error) {
        console.error('Error loading items:', error);
        document.getElementById('status').textContent = 'Error loading items';
    }
}

// Function to copy text to clipboard
async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        const tooltip = document.activeElement.querySelector('.copy-tooltip');
        tooltip.textContent = 'Copied!';
        setTimeout(() => {
            tooltip.textContent = 'Copy';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text:', err);
        const tooltip = document.activeElement.querySelector('.copy-tooltip');
        tooltip.textContent = 'Failed to copy';
        setTimeout(() => {
            tooltip.textContent = 'Copy';
        }, 2000);
    }
}

// Handle form submission
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('file');
    const textInput = document.getElementById('text');
    const statusBar = document.getElementById('status');
    const file = fileInput.files[0];
    const text = textInput.value;

    statusBar.textContent = 'Processing...';

    try {
        let fileInfo = null;
        if (file) {
            const dataUrl = await fileToDataURL(file);
            fileInfo = {
                name: file.name,
                size: file.size,
                type: file.type,
                dataUrl: dataUrl
            };
        }

        const response = await fetch('/share', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                fileInfo: fileInfo
            })
        });

        const result = await response.json();
        if (result.success) {
            fileInput.value = '';
            textInput.value = '';
            document.getElementById('selected-file-name').textContent = 'No file selected';
            statusBar.textContent = 'Share successful';
            loadItems();
        } else {
            statusBar.textContent = 'Share failed: ' + (result.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error sharing:', error);
        statusBar.textContent = 'Share failed: ' + (error.message || 'Network error');
    }
});

// Load items on page load
loadItems();
// Refresh items every 5 seconds
setInterval(loadItems, 5000);
