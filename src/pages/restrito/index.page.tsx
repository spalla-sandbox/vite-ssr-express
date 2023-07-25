import { defineAuthPage, definePageHead } from '../../page';
import MainTemplate from '../../templates/MainTemplate';

export default defineAuthPage(() => {
  definePageHead({
    title: 'Restrito',
  });
  return () => (
    <MainTemplate showHead={false}>
      <div class='container'>Área restrita</div>
    </MainTemplate>
  );
});
