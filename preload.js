const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

let cachedContent = null;

function getContent() {
  if (cachedContent) return cachedContent;
  try {
    const filePath = path.join(__dirname, 'app', 'content.json');
    cachedContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return cachedContent;
  } catch (err) {
    console.error('Failed to load content.json:', err);
    return null;
  }
}

contextBridge.exposeInMainWorld('electronAPI', {
  getContent,
  onAction: (callback) => {
    const channels = ['action:font', 'action:toggle-theme'];
    channels.forEach((ch) => {
      ipcRenderer.on(ch, (_event, payload) => callback(ch, payload));
    });
  }
});
