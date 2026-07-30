const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');

// nut-js — OS level keyboard control (any app-la work aagum)
const { keyboard, Key } = require('@nut-tree-fork/nut-js');
keyboard.config.autoDelayMs = 0; // namma manually delay control panrom

let win;
let stopFlag = false;
let typing = false;

function createWindow() {
  win = new BrowserWindow({
    width: 560,
    height: 780,
    minWidth: 460,
    minHeight: 600,
    title: 'HumanTyper',
    backgroundColor: '#0d0d0f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.setMenuBarVisibility(false);
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  // Global hotkey: Esc-a stop panna (typing nadakkumbodhu)
  globalShortcut.register('Escape', () => {
    if (typing) stopFlag = true;
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();
  if (process.platform !== 'darwin') app.quit();
});

const rand = (min, max) => Math.random() * (max - min) + min;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const NEIGHBORS = {
  a:'sqwz', b:'vghn', c:'xdfv', d:'sferc', e:'wrsdf', f:'dgrtvc',
  g:'fhtybv', h:'gjyubn', i:'ujko', j:'hknmu', k:'jlmi', l:'kop',
  m:'njk', n:'bhjm', o:'iklp', p:'ol', q:'wa', r:'etdf',
  s:'adwxz', t:'rygf', u:'yihj', v:'cfgb', w:'qeas', x:'zsdc',
  y:'tuhg', z:'asx'
};

function neighborKey(ch) {
  const low = ch.toLowerCase();
  const n = NEIGHBORS[low];
  if (!n) return null;
  const pick = n[Math.floor(Math.random() * n.length)];
  return ch === ch.toUpperCase() ? pick.toUpperCase() : pick;
}

async function pressBackspace() {
  await keyboard.pressKey(Key.Backspace);
  await keyboard.releaseKey(Key.Backspace);
}

async function pressEnter() {
  await keyboard.pressKey(Key.Enter);
  await keyboard.releaseKey(Key.Enter);
}

// nut-js type — single char
async function typeChar(ch) {
  await keyboard.type(ch);
}

ipcMain.handle('start-typing', async (event, { text, cfg }) => {
  if (typing) return { ok: false, msg: 'Already typing' };
  stopFlag = false;
  typing = true;

  // countdown so user can click into target app
  for (let s = cfg.startDelay; s > 0; s--) {
    if (stopFlag) { typing = false; return { ok: false, msg: 'Stopped' }; }
    win.webContents.send('countdown', s);
    await sleep(1000);
  }
  win.webContents.send('countdown', 0);
  win.webContents.send('status', 'typing');

  const total = text.length;

  for (let i = 0; i < text.length; i++) {
    if (stopFlag) break;
    const ch = text[i];

    // typo simulation
    if (Math.random() < cfg.typoChance && /[a-z]/i.test(ch)) {
      const wrong = neighborKey(ch);
      if (wrong) {
        await typeChar(wrong);
        await sleep(rand(cfg.baseDelay, cfg.baseDelay + cfg.jitter * 1.5));
        // sometimes overshoot by one char then fix both
        if (Math.random() < 0.3 && i + 1 < text.length) {
          const nextCh = text[i + 1];
          if (nextCh !== '\n') {
            await typeChar(nextCh);
            await sleep(rand(cfg.baseDelay, cfg.baseDelay + cfg.jitter));
            await pressBackspace();
            await sleep(rand(120, 300));
          }
        }
        await pressBackspace();
        await sleep(rand(150, 400));
      }
    }

    if (stopFlag) break;

    if (ch === '\n') {
      await pressEnter();
    } else {
      await typeChar(ch);
    }

    let delay = rand(cfg.baseDelay - cfg.jitter / 2, cfg.baseDelay + cfg.jitter);
    if (ch === ' ') delay *= cfg.wordGapExtra;
    if ('.!?'.includes(ch)) delay += rand(cfg.sentPauseMin, cfg.sentPauseMax);
    if (ch === ',') delay += rand(cfg.commaPauseMin, cfg.commaPauseMax);
    await sleep(Math.max(5, delay));

    if (ch === ' ' && Math.random() < cfg.thinkChance) {
      await sleep(rand(cfg.thinkPauseMin, cfg.thinkPauseMax));
    }

    // progress update every few chars
    if (i % 3 === 0) {
      win.webContents.send('progress', Math.round(((i + 1) / total) * 100));
    }
  }

  win.webContents.send('progress', 100);
  const wasStopped = stopFlag;
  typing = false;
  stopFlag = false;
  win.webContents.send('status', 'done');
  return { ok: true, msg: wasStopped ? 'Stopped' : 'Done' };
});

ipcMain.handle('stop-typing', () => {
  if (typing) stopFlag = true;
  return { ok: true };
});
