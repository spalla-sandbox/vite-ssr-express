import { definePage } from '../page';
import MainTemplate from '../templates/MainTemplate';
import { PageContext } from '../types';

/**
 * Gets every request thats not match with a page
 */
function NotFound(_, context: PageContext) {
  context.res.status(404);
  return () => (
    <MainTemplate>
      <h1>Not Found</h1>
    </MainTemplate>
  );
}

export default definePage(NotFound);
