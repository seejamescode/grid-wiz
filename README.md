# Grid Wiz

_Make a CSS Grid framework with custom browser support at the snap of a function._

## Table of Contents

- [Benefits](#benefits)
- [Browser Compatibility](#browser-compatibility)
- [Instructions](#instructions)
- [Contribute](#contribute)

## Benefits

### Subgrid 🔥

HTML isn’t written one layer deep. A great grid framework should allow you to embed divs within divs, but still remember how many columns are available. Without subgrids, users of your grid framework are prone to accidently break out of your design spec.

### Progressive Enhancement 📉

Different experiences have different browser requirements based on the users visiting. Your grid framework should also be performant with the smallest amount of code needed. With this project’s fine-tuned browser compatibility settings, you can support the right browser versions with as little grid code as possible.

### JavaScript? 🤔

We get a lot of flexibility by writing this package in isomorphic JavaScript:

- Wanna configure your grid framework and just copy and paste the CSS straight from [this project’s website](https://grid-wiz.now.sh)? Go ahead.
- Need to distribute your grid framework to multiple projects with a Node package? Add Grid Wiz as a dependency and compile it there.
- Are you _bleeding-edge_ enough to compile the grid framework directly in your client-side code? Now we’re cooking!

## Browser Compatibility

This package lets you configure your grid’s browser compatibility. The trade-off is that with more backwards compatibility, the larger the size of the grid code will be. This configuration option is great for developers that have multiple products with differing browser requirements.

| Support Mode       | Chrome | Edge   | Firefox | IE  | Opera | Safari |                     |                                                                                           |
| ------------------ | ------ | ------ | ------- | --- | ----- | ------ | ------------------- | ----------------------------------------------------------------------------------------- |
| `displayFlex`      | 29     | 12     | 20      | 11  | 12.1  | 9      | Available           | [Details](https://developer.mozilla.org/en-US/docs/Web/CSS/display#Browser_compatibility) |
| `cssVariables`     | 49     | 15     | 31      | NA  | 36    | 9.1    | Available           | [Details](https://developer.mozilla.org/en-US/docs/Web/CSS/var#Browser_compatibility)     |
| `displayGrid`      | 57     | 16\*\* | 52      | NA  | 44    | 10.1   | Available (Default) | [Details](https://developer.mozilla.org/en-US/docs/Web/CSS/display#Browser_compatibility) |
| `displaySubgrid`\* | ?      | ?      | ?       | NA  | ?     | ?      | Work-in-Progress    | [Details](https://developer.mozilla.org/en-US/docs/Web/CSS/display#Browser_compatibility) |

##### \* [CSS Grid Level 2](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout#grid) is still a working draft. Once this support mode is added, it will significantly cut file size due to support for `display: subgrid`.

##### \*\* This implementation is currently broken on Edge. See [Edge Issue 18676405](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/18676405/) for more details.

## Instructions

### Install

```bash
npm install grid-wiz
```

### Use

```javascript
import gridWiz from "grid-wiz";

var yourGridCSS = gridWiz({
  prefix: "bx--", // Prefix for all CSS class names. Can be empty.
  support: "displayGrid", // `displayFlex`, `cssVariables`, or `displayGrid`
  maxWidth: 1584, // Max-width of entire grid in pixels. Optional.
  progressive: false, // Include all browser support fallbacks older than selected support
  subgrid: true, // Embedded grids and rows know the remaining amount of columns available.
  breakpoints: [
    {
      name: "sm", // Class name prefix fot the breakpoint.
      size: 0, // Starting screen width in pixels of the breakpoint.
      columns: 4, // Amount of columns available.
      gutter: 32, // Space between content of adjacent columns in pixels.
      margin: 0 // Space on outside of entire grid in pixels.
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
});
```

## Contribute

To work on this project locally, just do `npm i` once and then `npm run start` to open up dev mode in browser at `http://localhost:4000`.
