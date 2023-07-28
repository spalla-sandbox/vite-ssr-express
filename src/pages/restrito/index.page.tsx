import { defineAuthPage, definePageHead } from '../../page';
import MainTemplate from '../../templates/MainTemplate';

export default defineAuthPage((_, { extra }) => {
  definePageHead({
    title: 'Restrito',
  });
  return function RestrictPage() {
    return (
      <MainTemplate showHead={false}>
        <div className='container'>Área restrita</div>
        <pre>{JSON.stringify(extra, null, 2)}</pre>
      </MainTemplate>
    );
  };
});
