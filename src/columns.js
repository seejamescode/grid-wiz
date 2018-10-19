const columns = function(breakpoints, prefix, compat) {
  return `
  /* By default, span all of the grid columns */
  ${compat.CSSVariables(`
    .${prefix}grid > *,
    .${prefix}row > * {
      flex: 100%;
    }
  `)}

  /* By default, span all of the grid columns */
  ${compat.DisplayGrid(`
  .${prefix}grid > *,
  .${prefix}row > * {
    grid-column-end: span var(--${prefix}x-bp-columns);
  }`)}

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

        [class*="${prefix}col"]:not(.${prefix}grid):not(.${prefix}row) {
          padding-left: var(--${prefix}x-gutter);
          padding-right: var(--${prefix}x-gutter);
        }

        [class*="${prefix}col-${breakpoint.name}"] {
          display: initial;
        }
        [class*="${prefix}col-${breakpoint.name}"].${prefix}grid {        
          ${compat.CSSVariables("display: flex;")}
          ${compat.DisplayGrid("display: grid;")}
        }
        .${prefix}col-${breakpoint.name}-0,
        .${prefix}col-${breakpoint.name}-0.${prefix}grid {
          display: none;
        }

        ${[...Array(breakpoint.columns)]
          .map(
            (val, column) => `
              
                ${compat.CSSVariables(`
                .${prefix}col-${breakpoint.name}-${column + 1}{
                      max-width: calc(${((column + 1) / breakpoint.columns) *
                        100}% / var(--${prefix}x-col-percentage));
                      }`)}
                ${compat.DisplayGrid(
                  `
                  .${prefix}col-${breakpoint.name}-${column + 1}{
                  grid-column-end: span ${
                    column === 0
                      ? `var(--${prefix}x-bp)`
                      : `calc(${column + 1} * var(--${prefix}x-bp))`
                  };
                }
                  `,
                  `.${prefix}col-${breakpoint.name}-${column +
                    1}{ max-width: initial; }`
                )}

              ${compat.CSSVariables(`
              .${prefix}col-${breakpoint.name}-${column + 1} * {
                --${prefix}x-col-percentage: ${(column + 1) /
                breakpoint.columns};
              }
              `)}

              
                ${compat.CSSVariables(
                  `
                  .${prefix}offset-${breakpoint.name}-${column + 1} {
                  margin-left: calc(${((column + 1) / breakpoint.columns) *
                    100}% / var(--${prefix}x-col-percentage));
                  }`
                )}
                ${compat.DisplayGrid(
                  `
                  .${prefix}offset-${breakpoint.name}-${column + 1} {
                    grid-column-start: calc(${
                      column === 0 ? `` : `${column + 1} * `
                    }var(--${prefix}x-bp) + 1);
                }`,
                  `.${prefix}offset-${breakpoint.name}-${column +
                    1} { margin-left: initial; }`
                )}
            `
          )
          .join("")}

      ${breakpoints
        .map(
          (subBreakpoint, i) =>
            subBreakpoint.size <= breakpoint.size
              ? `
                  [class*="${prefix}col-${subBreakpoint.name}"] {
                    --${prefix}x-bp: ${breakpoint.columns /
                  subBreakpoint.columns};
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

                  ${[...Array(subBreakpoint.columns - 1)]
                    .map((subVal, subColumn) =>
                      compat.DisplayGrid(
                        `.${prefix}col-${subBreakpoint.name}-${subColumn + 1} {
                            --${prefix}x-col-columns: ${(subColumn + 1) /
                          subBreakpoint.columns};
                          }
                        `
                      )
                    )
                    .join("")}
                `
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
