import { ThemeProvider } from 'styled-components';
import defaultTheme from './default';

export const theme = defaultTheme;

export default function Theme({ children }) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}
