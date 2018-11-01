import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

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
      <html lang="en">
        <Head>
          {this.props.styleTags}
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="icon" type="image/png" href="/static/icon-32.png" />
          <meta name="theme-color" content="#f1faff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Make a reliable CSS Grid framework at the snap of a function."
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/static/icon-57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/static/icon-72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/static/icon-114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/static/icon-144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href="/static/icon-512.png"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="white" />
          <link
            href="/static/splash-2048.png"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/static/splash-1668.png"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/static/splash-1536.png"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/static/splash-1125.png"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/static/splash-1242.png"
            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/static/splash-750.png"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/static/splash-640.png"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
