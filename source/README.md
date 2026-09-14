# Envizi Impact Quest — 14 settembre

Versione 5.1.0. Progetto React + TypeScript + Vite, modificabile con IBM Bob.

## Avvio

Apri questa cartella `source` in IBM Bob. Usa Node.js 22 o successivo.

```sh
npm ci
npm run dev
```

Apri http://localhost:5175. Per verificare le modifiche:

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

L'anteprima compilata usa `/envizi-quest-14-settembre/`. Per un altro indirizzo imposta `VITE_BASE_PATH` durante la build.

## Struttura e manutenzione

- `src/App.tsx`: percorso, stato del workshop, salvataggi e comandi globali.
- `src/questStorage.ts`: controllo dei file importati e compatibilità con i salvataggi precedenti.
- `src/screens/`: schermate del percorso.
- `src/styles.css`: aspetto e comandi di salvataggio.
- `src/generateTemplatePptx.ts`: esportazione report.
- `public/`: immagini e modelli necessari all'app.
- `tests/`: test di regressione per i salvataggi.
- `dist/`: risultato generato dalla build; modifica i sorgenti, poi ricompila.

Le note della versione precedente sono conservate in `NOTE_VERSIONE_ORIGINALE.md` come riferimento storico. Alcune descrizioni di percorsi e versioni in quel file non sono più attuali.

## Salvataggi

Dopo aver dato un nome al workshop, le modifiche sono salvate sul dispositivo dopo 800 ms di inattività, anche senza cambiare schermata. Il passaggio a un'altra scheda o la chiusura esegue un ulteriore tentativo di salvataggio. “Scarica copia” esporta lo stato corrente, anche se lo spazio del browser è pieno. I file `.envizi-quest` consentono di trasferire il lavoro fra browser, computer e versioni del sito. Importare un file con un nome già esistente crea una copia numerata.

I dati dei workshop restano nel browser; non sono inviati a GitHub. I salvataggi della vecchia app possono essere esportati e importati nella nuova versione. I campi assenti nei vecchi file sono inizializzati con i valori predefiniti.

## Report e pubblicazione

Il download PPTX viene generato nel browser con i dati del workshop. Su GitHub Pages la conversione locale PPTX → PNG non è disponibile: le anteprime PNG preesistenti rimangono statiche. In sviluppo la conversione richiede LibreOffice (`soffice`) e Poppler (`pdftoppm`).

Il workflow di pubblicazione è nella cartella superiore `.github/workflows/deploy-pages.yml`: verifica tipi e test, compila `source`, poi pubblica `source/dist`. Mantieni la cartella superiore quando copi il progetto o lo riapri per pubblicarlo.
