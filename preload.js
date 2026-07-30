const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  startTyping: (payload) => ipcRenderer.invoke('start-typing', payload),
  stopTyping: () => ipcRenderer.invoke('stop-typing'),
  onCountdown: (cb) => ipcRenderer.on('countdown', (_e, v) => cb(v)),
  onProgress: (cb) => ipcRenderer.on('progress', (_e, v) => cb(v)),
  onStatus: (cb) => ipcRenderer.on('status', (_e, v) => cb(v)),
});
