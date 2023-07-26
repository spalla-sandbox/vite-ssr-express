import { defineAuthPage, definePageHead } from '../../page';
import MainTemplate from '../../templates/MainTemplate';

export default defineAuthPage((_, { extra }) => {
  definePageHead({
    title: 'Restrito',
  });
  return () => (
    <MainTemplate showHead={false}>
      <div class='container'>Área restrita</div>
      <pre>{JSON.stringify(extra, null, 2)}</pre>
    </MainTemplate>
  );
});
