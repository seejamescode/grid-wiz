import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import { injectGlobal } from "styled-components";
import GridProvider, { GridConsumer } from "../components/GridProvider";
import colors from "../utils/color";

injectGlobal`
  html {
    height: 100%;
  }

  body {
    background: ${colors.background0};
    color: white;
    font-family: sans-serif;
    height: 100%;
    margin: 0;
  }

  #__next {
    font-size: 14px;
    height: 100%;
  }

  a {
    color: ${colors.link};
    text-decoration: none;

    :visited {
      color: ${colors.link};
    }

    :hover {
      color: ${colors.linkHover};
    }

    :focus {
      color: ${colors.linkFocus};
      outline: none;
    }

    :active {
      color: ${colors.linkActive};
    }
  }
`;

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <GridProvider>
          <GridConsumer>
            {({ state }) => (
              <React.Fragment>
                <Head>
                  <title>Grid Wiz</title>
                  <style dangerouslySetInnerHTML={{ __html: state.css }} />
                </Head>
                <Component {...pageProps} {...state} />
              </React.Fragment>
            )}
          </GridConsumer>
        </GridProvider>
      </Container>
    );
  }
}
