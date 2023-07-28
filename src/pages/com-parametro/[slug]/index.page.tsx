import { definePage } from '../../../page';
import MainTemplate from '../../../templates/MainTemplate';

type ComParametroPageParams = {
  slug: string;
};

export default definePage<ComParametroPageParams>(
  ({ params, query }) =>
    function ComParametroPage() {
      return (
        <MainTemplate>
          <h1>Parametro: {params.slug}</h1>
          <h1>Query:</h1>
          <pre style={{ padding: '10px', marginBottom: '50px' }}>
            {JSON.stringify(query, null, 2)}
          </pre>
        </MainTemplate>
      );
    },
);
