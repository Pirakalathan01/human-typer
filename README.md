# HumanTyper

A portable Windows desktop app that types any text into **any application** as real, human-like keystrokes.

Paste your text, hit **Start**, click into any window (Google Docs, Word, Notepad, a browser, a chat box — anything), and the text is typed out character by character: natural speed variation, occasional typos that self-correct, and realistic thinking pauses. Instead of an instant paste, the output reads like a real person at the keyboard.

Built with **Electron** and **nut-js** for OS-level keyboard control — so it works system-wide, not just inside a browser.

---

## Features

- Types into **any Windows application** (real keystrokes, not clipboard paste)
- Natural, human-like rhythm with adjustable speed
- Automatic typos that get corrected — just like real typing
- Thinking pauses between words, and pauses after sentences and commas
- Full settings panel — tune every parameter live
- **Portable** — build once, run the `.exe` anywhere, no installation required
- Global **Esc** hotkey to stop typing instantly

---

## Building the portable .exe

You only need to do this **once**. After the `.exe` is built, you can copy it anywhere and run it directly — no installation needed.

### 1. Install Node.js (required only for building)

Download the LTS version from [nodejs.org](https://nodejs.org) and install it. Verify:

```
node --version
```

### 2. Put all files in one folder

Place `main.js`, `preload.js`, `index.html`, `package.json`, and `icon.ico` together in a `human-typer` folder.

### 3. Install dependencies

In a terminal, navigate to the folder and run:

```
cd path\to\human-typer
npm install
```

(This downloads Electron and nut-js — it may take a few minutes.)

### 4. Test before building

```
npm start
```

The app window should open. If everything works, build the portable executable.

### 5. Build the portable .exe

```
npm run build
```

The output **HumanTyper-1.0.0-portable.exe** will appear in the `dist\` folder. That single file is your portable app — double-click to run. Copy it to a USB drive, another PC, or your Desktop; it runs anywhere without installation.

---

## How to use

1. Run **HumanTyper.exe**.
2. In the **Type** tab, paste your text.
3. Click **Start typing**.
4. A countdown begins (3 seconds by default). During it, switch to your target window (Google Docs, Word, etc.) and **place your cursor** where you want the text.
5. Typing begins automatically — human-paced, with self-correcting typos and natural pauses.
6. Press **Esc** anytime to stop (works globally, from any window).

---

## Settings

Every aspect of the typing behaviour can be tuned from the **Settings** tab. Use either the slider or the number box; changes are saved automatically. A **Reset to defaults** button is included.

| Setting | Controls | Suggested for slow / human feel |
|---|---|---|
| Start delay | Countdown before typing begins | 3–5 s |
| Base speed | Milliseconds per character | Higher = slower (110–160) |
| Randomness | Variation in speed | Higher = more uneven / human |
| Typo chance | How often mistakes occur | 5–8% |
| Thinking pauses | How often it pauses after a word | 4–6% |
| Think pause min/max | Length of thinking pauses | — |
| Sentence pause | Pause after `.` `!` `?` | — |
| Comma pause | Pause after `,` | — |
| Word gap multiplier | Extra slowdown on spaces | 1.3–1.5 |

---

## Troubleshooting

- **`npm install` fails (nut-js)** — nut-js needs native build tools. These usually work automatically on Windows. If the install fails, install the [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) and try again.
- **Build fails with a "cannot create symbolic link" error** — run the build in a terminal opened as **Administrator**, or enable **Windows Developer Mode** (Settings → System → For developers), then run `npm run build` again.
- **Nothing gets typed** — make sure your cursor is placed in the target window. If typing into an app running as administrator, run HumanTyper as administrator too.
- **Windows SmartScreen warning** — because the app isn't code-signed, SmartScreen may warn on first run. Click **More info → Run anyway**. This is normal for unsigned indie apps.
- **macOS / Linux** — this build targets Windows. Let me know if another OS is needed.

---

## A note on responsible use

HumanTyper sends real keystrokes on your behalf. Please use it for legitimate purposes such as automating your own data entry. Avoid using it to bypass anti-cheat systems, academic integrity checks, or any platform's terms of service.

---

## Tech stack

- [Electron](https://www.electronjs.org/) — desktop shell
- [nut-js](https://nutjs.dev/) — OS-level keyboard simulation
- [electron-builder](https://www.electron.build/) — portable packaging

---

Developed by **Pirakalathan** with ♥
