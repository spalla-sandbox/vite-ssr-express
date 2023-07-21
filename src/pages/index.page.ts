import { definePage } from "../page"

function Index() {
  return {
    head: [
      `<script @source(src/assets/scripts/index.script.ts) defer></script>`,
      `<style type="text/css">@content(src/assets/styles/base.css)</style>`
    ],
    body: `
      <h1>Index</h1>
      <button>Botão 0</button>
      <img @source(src/assets/images/placeholder.gif, srcset) />
    `
  }
}

export default definePage(Index)