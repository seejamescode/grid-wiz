import columns from "./columns";
import grid from "./grid";

export default function gridInJS(config) {
  const breakpoints = config.breakpoints ? config.breakpoints : [];
  const format = config.minified === false ? "keep-breaks" : false;
  const prefix = config.prefix ? config.prefix : "";
  const progressive = config.progressive ? config.progressive : false;
  const support = config.support ? config.support : "displayGrid";

  const compat = {
    CSSVariables: css => {
      return progressive || support === "cssVariables" ? css : "";
    },
    DisplayGrid: (css, progressiveCSS) => {
      return support === "displayGrid"
        ? `${css}
            ${
              progressive && progressiveCSS
                ? `@supports (display: grid) {${progressiveCSS}}`
                : ""
            }`
        : "";
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
