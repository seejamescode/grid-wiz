import columns from "./columns";
import grid from "./grid";

export default function gridWiz(config) {
  const breakpoints = config.breakpoints ? config.breakpoints : [];
  const format = config.minified === false ? "keep-breaks" : false;
  const prefix = config.prefix ? config.prefix : "";
  const progressive = config.progressive ? config.progressive : false;
  const subgrid = typeof config.subgrid !== "undefined" ? config.subgrid : true;
  const support = config.support ? config.support : "displayGrid";

  const compat = {
    DisplayFlexOnly: css => {
      return support === "displayFlex" ||
        (progressive &&
          (support === "displayGrid" || support === "cssVariables"))
        ? css
        : "";
    },
    DisplayFlex: css => {
      return support === "cssVariables" ||
        support === "displayFlex" ||
        (progressive && support === "displayGrid")
        ? css
        : "";
    },
    CSSVariablesOnly: css => {
      return support === "cssVariables" ||
        (progressive && support === "displayGrid")
        ? css
        : "";
    },
    CSSVariables: css => {
      return support === "cssVariables" || support === "displayGrid" ? css : "";
    },
    DisplayGrid: css => {
      return support === "displayGrid" ? css : "";
    },
    DisplayGridProgressive: css => {
      // When you need to reset styles used in `display: flex` that mess with `display: grid`
      return progressive && support === "displayGrid"
        ? `@supports (display: grid) {${css}}`
        : "";
    },
    Subgrid: css => {
      // Code that contributes to subgrid ability (embedding a grid or row within a col item)
      return subgrid ? css : "";
    }
  };

  const cssSrc = [
    grid(breakpoints, config.maxWidth, prefix, compat),
    columns(breakpoints, prefix, compat)
  ]
    .join("")
    .replace(/\n/g, "")
    .replace(/\s\s+/g, " ");

  return cssSrc;
}
