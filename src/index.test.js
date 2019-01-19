import gridWiz from './index';

const defaultConfig = {
  prefix: "bx--",
  support: "displayGrid",
  maxWidth: 1584,
  progressive: false,
  subgrid: true,
  breakpoints: [
    {
      name: "sm",
      size: 0,
      columns: 4,
      gutter: 32,
      margin: 0
    },
    {
      name: "md",
      size: 672,
      columns: 8,
      gutter: 32,
      margin: 16
    },
    {
      name: "lg",
      size: 1056,
      columns: 16,
      gutter: 32,
      margin: 16
    },
    {
      name: "xl",
      size: 1312,
      columns: 16,
      gutter: 32,
      margin: 16
    },
    {
      name: "max",
      size: 1584,
      columns: 16,
      gutter: 32,
      margin: 32
    }
  ]
};

describe('gridWiz', () => {
  it('should generate css according to default config', () => {
    expect(gridWiz(defaultConfig)).toMatchSnapshot();
  });
});
