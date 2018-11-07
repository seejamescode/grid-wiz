import React from "react";
import styled from "styled-components";
import Markdown from "markdown-to-jsx";
import Highlight, { defaultProps } from "prism-react-renderer";

const MarkdownStyled = styled(Markdown)`
  position: relative;

  pre {
    background: #022c33;
    max-width: 100%;
    overflow-x: auto;
    padding: 1rem;
    width: max-content;
  }

  h1 {
    font-size: 3rem;
    margin: -0.5rem 0 0 -0.25rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 6rem;
  }

  #table-of-contents {
    margin-top: 0;
  }

  h3 {
    font-size: 1rem;
    margin-top: 2rem;
  }

  h5,
  p,
  ul {
    line-height: 1.35;
    margin-bottom: 1rem;
    margin-top: 0;
    max-width: 460px;
  }

  table {
    background: #022c33;
    display: block;
    margin-bottom: 1rem;
    max-width: 100%;
    overflow: auto;
    padding: 1rem;
    width: max-content;
  }

  td,
  th {
    padding-right: 2rem;
    text-align: left;
  }

  tr {
    height: 1.5rem;
  }

  @media (min-width: 900px) {
    h1 {
      font-size: 6rem;
    }
  }
`;
const Pre = styled.pre`
  background: #000 !important;
  margin: 0;
  overflow: auto;
  padding: 1rem;
  white-space: pre-wrap;
`;

export default class extends React.Component {
  render() {
    const markdown = this.props.children.split("```").map(
      (markdown, index) =>
        index % 2 ? (
          <Highlight
            {...defaultProps}
            code={markdown
              .split("\n")
              .slice(1, -1)
              .join("\n")}
            language={markdown.split("\n")[0]}
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
        ) : (
          <MarkdownStyled className={`markdown ${this.props.prefix}col`}>
            {markdown}
          </MarkdownStyled>
        )
    );
    return markdown;
  }
}
