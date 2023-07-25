import { definePage } from '../../../page';
import MainTemplate from '../../../templates/MainTemplate';

export default definePage(({ slug }) => () => (
  <MainTemplate>
    <h1>Parametro: {slug}</h1>
  </MainTemplate>
));
