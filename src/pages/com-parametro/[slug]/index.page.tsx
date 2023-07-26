import { definePage } from '../../../page';
import MainTemplate from '../../../templates/MainTemplate';

type PageProps = {
  params: { slug: string };
  query: Record<string, string>;
};

export default definePage(({ params, query }: PageProps) => () => (
  <MainTemplate>
    <h1>Parametro: {params.slug}</h1>
    <h1>Query:</h1>
    <pre style={{ padding: '10px', marginBottom: '50px' }}>
      {JSON.stringify(query, null, 2)}
    </pre>
  </MainTemplate>
));
