import { definePage } from "../page"

function Index() {
  return {
    head: [
      '<script @asset(src/pages/index.script.ts) defer></script>',
      '<style type="text/css" @asset(src/styles/base.css)></style>'
    ],
    body: `
      <h1>Index</h1>
      <button>Botão 0</button>
    `
  }
}

export default definePage(Index)