import {
  definePageMeta,
  definePage,
  definePageScripts,
  definePageStyles,
} from '../page';

function Index() {
  definePageMeta({
    title: 'Seo',
    description: 'Um exemplo de nova aplicação',
    ogDescription: 'Ainda dá pra brincar',
    ogTitle: 'Vite',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
  });

  definePageScripts([
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': '',
      }),
    },
    {
      src: '@source(src/assets/scripts/index.script.ts)',
      defer: true,
      tagPosition: 'bodyClose',
    },
  ]);

  definePageStyles([
    {
      innerHTML: '@content(src/assets/styles/base.css)',
    },
  ]);

  return `
    <h1>Index</h1>
    <button type="button">Botão 0</button>
    <img src="@source(src/assets/images/placeholder.gif)" alt="texto" />
  `;
}

export default definePage(Index);
