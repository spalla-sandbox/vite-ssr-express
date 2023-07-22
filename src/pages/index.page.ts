import { definePageMeta, definePage } from '../page';

function Index() {
  definePageMeta({
    title: 'Seo',
    description: 'Um exemplo de nova aplicação',
    ogDescription: 'Ainda dá pra brincar',
    ogTitle: 'Vite',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
  });

  return {
    head: [
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
