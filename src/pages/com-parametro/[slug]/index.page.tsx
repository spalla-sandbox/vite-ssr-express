import { definePage } from '../../../page';
import MainTemplate from '../../../templates/MainTemplate';

export default definePage(({ params, query }) => () => (
  <MainTemplate>
    <h1>Parametro: {params.slug}</h1>
    <h1>Query:</h1>
    <pre style={{ padding: '10px', marginBottom: '50px' }}>
      {JSON.stringify(query, null, 2)}
    </pre>
  </MainTemplate>
));
