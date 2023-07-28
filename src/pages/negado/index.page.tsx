import { definePage, definePageHead } from '../../page';
import MainTemplate from '../../templates/MainTemplate';

export default definePage(tes => {
  definePageHead({
    title: 'Acesso negado',
  });
  tes.params;

  return function NotAllowed() {
    return (
      <MainTemplate showHead={false}>
        <h1>Acesso negado</h1>
      </MainTemplate>
    );
  };
});
