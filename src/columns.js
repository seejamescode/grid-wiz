import "./arrayFromPolyfill";

const columns = function(breakpoints, prefix, compat) {
  return `
  /* By default, span all of the grid columns */
  ${compat.DisplayFlex(`
    .${prefix}grid > *,
    .${prefix}row > * {
      flex: 100%;
    }
  `)}

  /* By default, sxpan all of the grid columns */
  ${compat.DisplayGrid(`
  .${prefix}grid > *,
  .${prefix}row > * {
    grid-column-end: span var(--${prefix}x-bp-columns);
  }`)}

  ${compat.CSSVariables(`
    [class*="${prefix}col"]:not(.${prefix}grid):not(.${prefix}row) {
      padding-left: var(--${prefix}x-gutter);
      padding-right: var(--${prefix}x-gutter);
    }
  `)}

  ${compat.DisplayGridProgressive(`
  [class*="${prefix}col"][class*="${prefix}col"][class*="${prefix}col"] {
    max-width: initial;
  }

  [class*="${prefix}offset"][class*="${prefix}offset"][class*="${prefix}offset"]{
    margin-left: initial;
  }
`)}

  ${breakpoints
    .map(breakpoint => {
      const result = `
      ${compat.DisplayGrid(`
        /* Grid columns */
        .${prefix}grid,
        .${prefix}row {
          grid-template-columns: repeat(auto-fill, calc(${100 /
            breakpoint.columns}% / var(--${prefix}x-col-columns)));

            --${prefix}x-bp-columns: ${breakpoint.columns};
        }
        `)}

        ${compat.DisplayFlexOnly(`
          [class*="${prefix}col"]:not(.${prefix}grid):not(.${prefix}row) {
            padding-left: ${breakpoint.gutter / 2}px;
            padding-right: ${breakpoint.gutter / 2}px;
          }
        `)}

        [class*="${prefix}col-${breakpoint.name}"] {
          ${compat.DisplayFlexOnly(`
          display: inline;
          `)}
          display: initial;
        }

        [class*="${prefix}col-${breakpoint.name}"].${prefix}grid,
        [class*="${prefix}col-${breakpoint.name}"].${prefix}row {        
          ${compat.DisplayFlex("display: flex;")}
          ${compat.DisplayGrid("display: grid;")}
        }

        .${prefix}col-${breakpoint.name}-0,
        .${prefix}col-${breakpoint.name}-0.${prefix}grid,
        .${prefix}col-${breakpoint.name}-0.${prefix}row {
          display: none;
        }

        ${[...Array(breakpoint.columns)]
          .map(
            (val, column) => `
              .${prefix}col-${breakpoint.name}-${column + 1}{
                ${compat.DisplayFlexOnly(`
                  max-width: ${((column + 1) / breakpoint.columns) * 100}%;
                `)}
                
                ${compat.CSSVariablesOnly(`
                  max-width: calc(${Number(
                    (((column + 1) / breakpoint.columns) * 100).toFixed(4)
                  )}% / var(--${prefix}x-col-percentage));
                `)}

                ${compat.DisplayGrid(
                  `
                  grid-column-end: span ${
                    column === 0
                      ? `var(--${prefix}x-bp)`
                      : `calc(${column + 1} * var(--${prefix}x-bp))`
                  };
                  `
                )}
              }

              ${compat.Subgrid(`
              ${compat.DisplayFlexOnly(`
                ${breakpoints
                  .map(subBreakpoint => {
                    const colWidth = (column + 1) / breakpoint.columns;
                    if (subBreakpoint.size <= breakpoint.size) {
                      return Array.from(
                        Array(subBreakpoint.columns - 1),
                        (_, subColumn) => {
                          const subColWidth =
                            (subColumn + 1) / subBreakpoint.columns;
                          if (subColWidth <= colWidth) {
                            return `
                              .${prefix}col-${breakpoint.name}-${column +
                              1} .${prefix}col-${
                              subBreakpoint.name
                            }-${subColumn + 1} {
                                max-width: ${(
                                  (subColWidth / colWidth) *
                                  100
                                ).toFixed(2)}%;
                              }

                              .${prefix}col-${breakpoint.name}-${column +
                              1} .${prefix}offset-${
                              subBreakpoint.name
                            }-${subColumn + 1} {
                                  margin-left: ${(
                                    (subColWidth / colWidth) *
                                    100
                                  ).toFixed(2)}%;
                                }
                        `;
                          }
                          return "";
                        }
                      ).join("");
                    }
                    return "";
                  })
                  .join("")}
              `)}
              `)}
              
              ${compat.Subgrid(`
              ${compat.CSSVariablesOnly(`
              .${prefix}col-${breakpoint.name}-${column + 1} * {
                --${prefix}x-col-percentage: ${(
                (column + 1) /
                breakpoint.columns
              ).toFixed(4)};
              }
              `)}
              `)}

              ${
                column < breakpoint.columns - 1
                  ? `
                .${prefix}grid .${prefix}offset-${breakpoint.name}-${column +
                      1},
                .${prefix}row .${prefix}offset-${breakpoint.name}-${column +
                      1} {
                  ${compat.DisplayFlexOnly(`
                    margin-left: ${((column + 1) / breakpoint.columns) * 100}%;
                  `)}
                  ${compat.CSSVariablesOnly(`
                    margin-left: calc(${Number(
                      (((column + 1) / breakpoint.columns) * 100).toFixed(4)
                    )}% / var(--${prefix}x-col-percentage));
                  `)}
                  ${compat.DisplayGrid(
                    `
                    grid-column-start: calc(${
                      column === 0 ? `` : `${column + 1} * `
                    }var(--${prefix}x-bp) + 1);`
                  )}
                }
              `
                  : ""
              }
            `
          )
          .join("")}

      ${breakpoints
        .map(
          (subBreakpoint, i) =>
            subBreakpoint.size <= breakpoint.size
              ? compat.CSSVariables(`
                  [class*="${prefix}col-${subBreakpoint.name}"] {
                    --${prefix}x-bp: ${Number(
                  (breakpoint.columns / subBreakpoint.columns).toFixed(4)
                )};
                  }

                  ${
                    i === 0 || breakpoint.gutter !== breakpoints[i - 1].gutter
                      ? `
                        :root {
                          --${prefix}x-gutter: ${breakpoint.gutter / 2}px;
                        }
                      `
                      : ""
                  }

                  ${compat.Subgrid(`
                    ${[...Array(subBreakpoint.columns - 1)]
                      .map((subVal, subColumn) =>
                        compat.DisplayGrid(
                          `.${prefix}col-${subBreakpoint.name}-${subColumn +
                            1} {
                              --${prefix}x-col-columns: ${Number(
                            ((subColumn + 1) / subBreakpoint.columns).toFixed(4)
                          )};
                            }
                          `
                        )
                      )
                      .join("")}
                  `)}
                `)
              : ""
        )
        .join("")}
      `;

      return breakpoint.size === 0
        ? result
        : `@media (min-width: ${breakpoint.size}px) {${result}}`;
    })
    .join("")}`;
};

export default columns;
