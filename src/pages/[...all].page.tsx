import { definePage } from '../page';
import MainTemplate from '../templates/MainTemplate';

/**
 * Gets every request thats not match with a page
 */
export default definePage((_, context) => {
  context.res.status(404);
  return () => (
    <MainTemplate>
      <h1>Not Found</h1>
    </MainTemplate>
  );
});
