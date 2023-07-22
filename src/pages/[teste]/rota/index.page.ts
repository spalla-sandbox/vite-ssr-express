import { definePage } from '../../../page';
import Header from './components/header';

type PageParams = {
  teste: string;
};
export default definePage(({ teste }: PageParams) => ({
  head: `<style>@content(src/pages/[teste]/rota/style.css)</style>`,
  body: `
      <div>
        ${Header(teste)}
        <p>Rota com parametro interpolado: ${teste}</p>
      </div>
    `,
  footer: `<script defer @source(src/pages/[teste]/rota/components/header.script.ts)></script>`,
}));
