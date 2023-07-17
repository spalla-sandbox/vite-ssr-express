import getRouter from './router';
import NotFound from './pages/[...all].page';
import { PageContext } from './types';

export async function render(url: string, context: PageContext) {
  const router = await getRouter()
  const match = router.lookup(`/${url}`)
  if (match) {
    const page = await match.handler()
    return page(match.params, context)
  }
  return NotFound()
}
