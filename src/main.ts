import getRouter from './router';
import { PageContext } from './types';

export async function render(url: string, context: PageContext) {
  const router = await getRouter()
  const match = router.lookup(`/${url}`)
  const page = await match.handler()
  return page(match.params, context)
}
