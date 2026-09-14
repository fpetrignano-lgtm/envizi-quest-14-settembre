# Envizi Quest — 14 settembre

Questa cartella contiene la nuova versione completa dell’app. La cartella originale del 7 settembre non è stata modificata.

## Riprendere con IBM Bob

1. Apri IBM Bob e scegli “Apri cartella”.
2. Seleziona `14 settembre` (oppure `source` per il solo sviluppo).
3. Nel terminale entra in `source`, esegui `npm ci` e poi `npm run dev`.
4. Apri l’indirizzo indicato. I file modificabili sono in `source/src`; immagini e modelli sono in `source/public`.

## Miglioramenti

- Salvataggio automatico anche durante la compilazione, senza dover cambiare pagina.
- Ripristino delle valutazioni di tutte e sei le missioni, esclusioni delle priorità, filtri, note e cronologia del percorso.
- Comandi Salva e Scarica copia più leggibili, in italiano e inglese, con etichette accessibili.
- Importazione controllata: file non validi segnalati e copie numerate per evitare sovrascritture.
- Correzioni dei pulsanti Indietro, delle finestre aziendali e dei dati passati alle schermate finali.
- Generazione report senza modificare globalmente i download della pagina; caricamento dell'esportazione su richiesta.
- Controlli TypeScript e test ripetibili; pubblicazione automatica tramite GitHub Actions.

Repository pubblico; pubblicazione automatica su GitHub Pages.

Repository: https://github.com/fpetrignano-lgtm/envizi-quest-14-settembre
App: https://fpetrignano-lgtm.github.io/envizi-quest-14-settembre/


Per trasferire un workshop già iniziato usa il file `.envizi-quest`: scaricalo dalla vecchia versione e caricalo nella nuova.

Consulta `source/README.md` per i dettagli e i limiti delle anteprime PNG dei report.
