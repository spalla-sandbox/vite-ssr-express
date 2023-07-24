import { defineScripts } from '../../../page';

export default function Button() {
  defineScripts([
    {
      src: '@source(src/components/IndexPage/Button/Button.script.ts)',
      defer: true,
    },
  ]);
  return `
    <div class="button">
      <p>Never clicked</p>
      <button>Clicked 0 time(s)</button>
    </div>
  `;
}
