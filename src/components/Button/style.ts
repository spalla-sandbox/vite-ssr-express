import { styled } from 'styled-components';
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from 'styled-system';

const ButtonBase = styled.div<ColorProps & SpaceProps & LayoutProps>`
  ${space}
  ${layout}
  ${color}
`;

export default ButtonBase;
