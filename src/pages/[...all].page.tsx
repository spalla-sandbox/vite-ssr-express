import { definePage } from '../page';
import MainTemplate from '../templates/MainTemplate';
import { PageContext } from '../types';

function NotFound(_, context: PageContext) {
  context.res.status(404);
  return () => (
    <MainTemplate>
      <h1>Not Found</h1>
    </MainTemplate>
  );
}

export default definePage(NotFound);
