import { definePage, definePageScripts, definePageStyles } from '../../../page';
import Header from './components/header';

type PageParams = {
  teste: string;
};
export default definePage(({ teste }: PageParams) => {
  definePageStyles([
    {
      innerHTML: '@content(src/pages/[teste]/rota/style.css)',
    },
  ]);

  return {
    body: `
      <div>
        ${Header(teste)}
        <p>Rota com parametro interpolado: ${teste}</p>
      </div>
    `,
  };
});
