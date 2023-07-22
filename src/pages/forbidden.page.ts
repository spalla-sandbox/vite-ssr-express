import { definePageHead } from '../page';

export default function ForbiddenPage() {
  definePageHead({
    title: 'Acesso proibido',
  });

  return {
    body: `Acesso negado`,
  };
}
