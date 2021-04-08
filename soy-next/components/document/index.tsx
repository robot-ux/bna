import React from 'react'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

import { CSPHead } from './Csp'
import { SeoHead } from './SeoHead'
import { createNonce } from './Csp'

interface Props {
  styleTags: any
  nonce: string
  children: any
  customHead?: any
  customBody?: any
}

export type { DocumentContext }
export { SeoHead, CSPHead, Head }

export class Document extends NextDocument<Props> {
  static async getInitialProps({ renderPage }: any) {
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
    const { nonce, customBody, customHead, styleTags } = this.props

    return (
      <Html>
        <Head nonce={nonce}>
          {styleTags}
          {customHead}
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
          {customBody}
        </body>
      </Html>
    )
  }
}
