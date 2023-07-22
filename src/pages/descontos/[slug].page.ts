import { definePage, definePageScripts } from '../../page';

type PartnerProps = {
  slug: string;
};

async function Partner(props: PartnerProps) {
  definePageScripts([
    {
      src: '@source(src/assets/scripts/script.ts)',
      defer: true,
    },
  ]);
  return `
    <pre>Parceiro ${JSON.stringify(props, null, 2)}</pre>
  `;
}

export default definePage(Partner);
