import { definePage } from '../page';
import { PageContext } from '../types';

function NotFound(_, context: PageContext) {
  context.res.status(404);
  return `<h1>Not Found</h1>`;
}

export default definePage(NotFound);
