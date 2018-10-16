# Grid-in-JS

_Make a reliable CSS Grid framework at the snap of a function._

This is a work-in-progress of what it would be like to compile CSS Grid frameworks with JavaScript. Please don’t use it yet unless you have talked to [@seejamescode](https://twitter.com/seejamescode). There’s a lot more to get done and you can help on the [GitHub repo](https://github.com/seejamescode/grid-in-js).

## Benefits

### Subgrid 🔥

HTML isn’t written one layer deep. A great grid framework should allow you to embed divs within divs, but still remember how many columns are available. Without subgrids, users of your grid framework are prone to accidently break out of your design spec.

### Progressive Enhancement 📉

Different experiences have different browser requirements based on the users visiting. Your grid framework should also be performant with the smallest amount of code needed. With this project’s fine-tuned browser compatibility settings, you can support the right browser versions with as little grid code as possible.

### JavaScript? 🤔

The truth is that the name Grid-in-JS is a joke to weed out critics that don’t try stuff before critiquing it. However, we get a lot of flexibility by writing this package in isomorphic JavaScript:

- Wanna configure your grid framework and just copy and paste the CSS straight from [this project’s website](https://grid-in-js.now.sh)? Go ahead.
- Need to distribute your grid framework to multiple projects with a Node package? Add Grid-in-JS as a dependency and compile it there.
- Are you _bleeding-edge_ enough to compile the grid framework directly in your client-side code? Now we’re cooking!

## Browser Compatibility

This package lets you configure your grid’s browser compatibility. The trade-off is that with more backwards compatibility, the larger the size of the grid code will be. This configuration option is great for developers that have multiple products with differing browser requirements.

| Support Mode       | Chrome | Edge   | Firefox | IE  | Opera | Safari |                     |                                                                                           |
| ------------------ | ------ | ------ | ------- | --- | ----- | ------ | ------------------- | ----------------------------------------------------------------------------------------- |
| `displayFlex`      | 29     | 12     | 20      | 11  | 12.1  | 9      | Work-in-Progress    | [Details](https://developer.mozilla.org/en-US/docs/Web/CSS/display#Browser_compatibility) |
| `cssVariables`     | 49     | 15     | 31      | NA  | 36    | 9.1    | Available           | [Details](https://developer.mozilla.org/en-US/docs/Web/CSS/var#Browser_compatibility)     |
| `displayGrid`      | 57     | 16\*\* | 52      | NA  | 44    | 10.1   | Available (Default) | [Details](https://developer.mozilla.org/en-US/docs/Web/CSS/display#Browser_compatibility) |
| `displaySubgrid`\* | ?      | ?      | ?       | NA  | ?     | ?      | Work-in-Progress    | [Details](https://developer.mozilla.org/en-US/docs/Web/CSS/display#Browser_compatibility) |

##### \* [CSS Grid Level 2](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout#grid) is still a working draft. Once this support mode is added, it will significantly cut file size due to support for `display: subgrid`.

##### \*\* This implementation is currently broken on Edge. See [Edge Issue 18676405](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/18676405/) for more details.

## Contribute

To work on this project locally, just do `npm i` once and then `npm run start` to open up dev mode in browser at `http://localhost:4000`.
