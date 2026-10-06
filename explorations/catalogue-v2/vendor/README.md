# vendor · the board's runtime, pinned

The board pages (`board.html`, `drafts-archive.html`, `legacy-index.html`) load these instead of a CDN, so the
board renders offline, in cloud sessions whose network blocks unpkg / jsdelivr / cdnjs, and in the share bundle.
Same versions the pages used from unpkg before 21 Sep 2026; the files are the untouched UMD builds from npm.

| File | Package | Version |
|---|---|---|
| `react.production.min.js`, `react.development.js` | `react` | 18.3.1 |
| `react-dom.production.min.js`, `react-dom.development.js` | `react-dom` | 18.3.1 |
| `babel.min.js` | `@babel/standalone` | 7.29.0 |
| `lucide.min.js` | `lucide` | 0.460.0 |

`?dev` on a page swaps the two React files for the development builds (readable errors). Licences: `LICENSE.react`
(react and react-dom), `LICENSE.babel`, `LICENSE.lucide`, all MIT / ISC.

To bump a version: download the new UMD file from npm (`https://registry.npmjs.org/<pkg>/-/<pkg>-<ver>.tgz`, the
`umd/` or `dist/umd/` file inside), replace it here under the same name, update this table. Only the Google Fonts
still come from the network.
