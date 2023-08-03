export default {
  my: value => ({
    marginTop: value,
    marginBottom: value,
  }),
  mx: value => ({
    marginLeft: value,
    marginRight: value,
  }),
  py: value => ({
    paddingTop: value,
    paddingBottom: value,
  }),
  px: value => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  lineClamp: (lines: number | string) => ({
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': lines,
  }),
  text: size => ({
    fontSize: `{text.${size}.fontSize}`,
    lineHeight: `{text.${size}.lineHeight}`,
  }),
  gradientText: (gradient: string) => ({
    '-webkit-text-fill-color': 'transparent',
    backgroundImage: gradient,
    '-webkit-background-clip': 'text',
    backgroundClip: 'text',
  }),
};
