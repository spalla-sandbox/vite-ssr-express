import { definePage } from "../page"

function Index() {
  return {
    head: `<script @asset(src/pages/index.script.ts) defer></script>`,
    html: `
      <h1>Index</h1>
      <button>Botão 0</button>
    `
  }
}

export default definePage(Index)