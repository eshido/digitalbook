const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const path = require('path');

let mainWindow = null;
const isDev = !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    title: 'АКТ Цифрлық кітап',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  buildMenu();
}

function buildMenu() {
  const template = [
    {
      label: 'Файл',
      submenu: [
        { label: 'Басып шығару', accelerator: 'CmdOrCtrl+P', click: () => mainWindow.webContents.print() },
        { type: 'separator' },
        process.platform === 'darwin'
          ? { role: 'close', label: 'Шығу' }
          : { role: 'quit', label: 'Шығу' }
      ]
    },
    {
      label: 'Түзету',
      submenu: [
        { role: 'copy', label: 'Көшіру' },
        { role: 'selectAll', label: 'Барлығын таңдау' }
      ]
    },
    {
      label: 'Көрініс',
      submenu: [
        {
          label: 'Қаріпті үлкейту',
          accelerator: 'CmdOrCtrl+=',
          click: () => mainWindow.webContents.send('action:font', 1)
        },
        {
          label: 'Қаріпті кішірейту',
          accelerator: 'CmdOrCtrl+-',
          click: () => mainWindow.webContents.send('action:font', -1)
        },
        {
          label: 'Тақырыпты ауыстыру',
          accelerator: 'CmdOrCtrl+T',
          click: () => mainWindow.webContents.send('action:toggle-theme')
        },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Толық экран' },
        { type: 'separator' },
        { role: 'toggleDevTools', label: 'Әзірлеуші құралдары', visible: isDev }
      ]
    },
    {
      label: 'Анықтама',
      submenu: [
        {
          label: 'Бағдарлама туралы',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Бағдарлама туралы',
              message: 'АКТ Цифрлық кітап',
              detail: [
                'Ақпараттық-коммуникациялық технологиялар',
                'Пәннің оқу-әдістемелік кешені',
                '',
                'М.Дулатов атындағы Қостанай инженерлік-экономикалық университеті',
                'Ақпараттық технологиялар және автоматика кафедрасы',
                '',
                'Нұсқа: 1.0.0'
              ].join('\n')
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
