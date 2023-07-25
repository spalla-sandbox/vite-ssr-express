import { definePage, definePageHead } from '../page';
import MainTemplate from '../templates/MainTemplate';

export default definePage(() => {
  definePageHead({
    title: 'Acesso negado',
  });

  return () => (
    <MainTemplate showHead={false}>
      <h1>Acesso negado</h1>
    </MainTemplate>
  );
});
