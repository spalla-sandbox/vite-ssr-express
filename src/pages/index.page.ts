import { definePage } from '../page';

function Index() {
  return {
    head: [
      `<title>SSR + Vite + Express</title>`,
      `@script(src/assets/scripts/index.script.ts, defer)`,
      `<style type="text/css">@content(src/assets/styles/base.css)</style>`,
    ],
    body: `
      <h1>Index</h1>
      <button type="button">Botão 0</button>
      <img src="@source(src/assets/images/placeholder.gif)" alt="texto" />
    `,
  };
}

export default definePage(Index);
