import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import { createNonce, CSPHead } from './Csp'

type Props = {
  styleTags: any
  nonce: string
}

class SCDocument extends Document<Props> {
  static getInitialProps({ renderPage }: any) {
    const sheet = new ServerStyleSheet()
    const nonce = createNonce()

    const page = renderPage((App: any) => (props: any) =>
      sheet.collectStyles(
        <StyleSheetManager stylisPlugins={[]}>
          <App {...props} />
        </StyleSheetManager>,
      ),
    )

    const styleTagsNotNonce = sheet.getStyleElement()
    const styleTags = React.Children.map(styleTagsNotNonce, (child) =>
      React.cloneElement<any>(child, { nonce }),
    )
    return { ...page, styleTags, nonce }
  }

  render() {
    const { styleTags, nonce } = this.props

    return (
      <Html>
        <Head nonce={nonce}>
          <CSPHead nonce={nonce} />
          {styleTags}
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    )
  }
}

export default SCDocument
