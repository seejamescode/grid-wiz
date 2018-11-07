import React from "react";
import styled from "styled-components";
// const prettier = require("prettier/standalone");
// const prettierPostCSS = require("prettier/parser-postcss");
import Highlight, { defaultProps } from "prism-react-renderer";
import { GridConsumer } from "./GridProvider";

const Pre = styled.pre`
  background: #000 !important;
  margin: 0;
  overflow: auto;
  padding: 1rem;
  white-space: pre-wrap;
`;

export default class extends React.Component {
  render() {
    return (
      <GridConsumer>
        {({ state }) => (
          <Highlight
            {...defaultProps}
            // code={prettier.format(state.css, {
            //   parser: "css",
            //   plugins: [prettierPostCSS]
            // })}
            code={state.css}
            language="css"
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <Pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </Pre>
            )}
          </Highlight>
        )}
      </GridConsumer>
    );
  }
}
