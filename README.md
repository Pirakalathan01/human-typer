# HumanTyper

Windows portable app. Enna text vena paste pannunga, "Start" click pannunga,
apram **enga vena** (Google Docs, Word, Notepad, browser, chat box — any app)
click panni cursor vachaa, andha text **human type pannura maari** type aagum.

nut-js OS-level keyboard control use panradhu — so browser mattum illa, **any
Windows application-la** work aagum.

---

## Build panradhu eppadi (portable .exe undaakka)

Idhu **oru thadava** mattum — .exe kittinaa, apram andha file-a enga vena copy
panni direct-a run pannalaam (install venaam).

### 1. Node.js venum (build panna mattum)
https://nodejs.org — LTS install pannunga. Check:
```
node --version
```

### 2. Ella file-um oru folder-la podunga
`main.js`, `preload.js`, `index.html`, `package.json` — ella file-um `human-typer` folder-la.

### 3. Dependencies install
Command Prompt-la, folder-ku போய்:
```
cd path\to\human-typer
npm install
```
(nut-js and electron download aagum — konjam neram edukkum.)

### 4. Direct-a test panna (build panna munnadi)
```
npm start
```
App open aagum. Sari-a irundha, portable .exe build pannunga.

### 5. Portable .exe build
```
npm run build
```
`dist\` folder-la **HumanTyper-1.0.0-portable.exe** varum. Adhu dhaan
ungaloda portable app. Install venaam — double-click panna run aagum.
Andha .exe-a USB, another PC, Desktop — enga vena copy panni use pannalaam.

---

## App eppadi use panradhu

1. **HumanTyper.exe** run pannunga.
2. **Type** tab-la text paste pannunga (Claude/GPT/Gemini output — anything).
3. **Start typing** click pannunga.
4. Countdown (default 3s) varum — andha neram-la neenga type panna vendiya
   window-ku (Google Docs, Word, etc.) போய் **cursor place pannunga**.
5. Type aaga aarambikkum. Human maari — konjam slow, typo panni fix pannum,
   naduvula yosikkura maari pause.
6. Niruthanum-na **Esc** press pannunga (global — enga irundhaalum work aagum).

---

## Settings tab — ellam inga control pannalaam

| Setting | Enna | Slow/human-ku |
|---|---|---|
| Start delay | Type start aaga munnadi countdown | 3-5s |
| Base speed | ms per char | periya = slow (110-160) |
| Randomness | speed variation | periya = human maari uneven |
| Typo chance | evlo mistake | 5-8% |
| Thinking pauses | word aprom pause frequency | 4-6% |
| Think pause min/max | pause neelam | — |
| Sentence pause | . ! ? aprom | — |
| Comma pause | , aprom | — |
| Word gap multiplier | space-la slowdown | 1.3-1.5 |

Slider illa number box — rendilaiyum maathalaam. Settings auto-save aagum.
"Reset to defaults" button irukku.

---

## Notes / troubleshooting

- **npm install fail (nut-js)** → nut-js-ku build tools venum. Windows-la
  usually auto work aagum. Fail aana:
  ```
  npm install --global windows-build-tools
  ```
  (illa Visual Studio Build Tools install pannunga.)
- **Type aagala** → target window-la cursor proper-a place aagala, illa admin
  app-la type panra — HumanTyper-ah "Run as administrator" try pannunga.
- **Ubuntu/Mac** → indha version Windows-ku. Vera OS venumna solunga.
- Automation policy: platform TOS check pannikonga. Personal use-ku fine.
