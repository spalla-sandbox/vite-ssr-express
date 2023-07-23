import { definePageScripts } from '../../../../page';

export default function Header(name: string) {
  definePageScripts([
    {
      src: '@source(src/pages/[teste]/rota/components/header.script.ts)',
      defer: true,
    },
  ]);
  return `
    <h1>Sou Header ${name}</h1>
    <button>Botão</button>
  `;
}
