import Document, { Head, Main, NextScript } from "next/document";
import styled, { ServerStyleSheet } from "styled-components";

const Body = styled.body`
  color: #403b33;
  font-family: "Libre Franklin", sans-serif;
  height: 100%;
  margin: 0;
`;

const HTML = styled.html`
  height: 100%;
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <HTML>
        <Head>{this.props.styleTags}</Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </HTML>
    );
  }
}
