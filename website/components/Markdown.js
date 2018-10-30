import React from "react";
import styled from "styled-components";
import Markdown from "markdown-to-jsx";

const MarkdownStyled = styled(Markdown)`
  position: relative;

  h1 {
    font-size: 3rem;
    margin: -0.5rem 0 0 -0.25rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 6rem;

    :first-of-type {
      margin-top: 0;
    }
  }

  h3 {
    font-size: 1rem;
    margin-top: 4rem;

    :first-of-type {
      margin-top: 1rem;
    }
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

export default class extends React.Component {
  render() {
    return (
      <MarkdownStyled className={`markdown ${this.props.prefix}col`}>
        {this.props.children}
      </MarkdownStyled>
    );
  }
}
