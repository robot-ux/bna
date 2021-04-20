import React from 'react'
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

import { CSPHead } from './Csp'
import { SeoHead } from './SeoHead'

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
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  // static async getInitialProps(ctx: DocumentContext) {
  //   const sheet = new ServerStyleSheet()
  //   const { renderPage } = ctx
  //   const nonce = createNonce()

  //   try {
  //     ctx.renderPage = () =>
  //       renderPage({
  //         enhanceApp: (App) => (props) =>
  //           sheet.collectStyles(<App {...props} />),
  //       })

  //     const initialProps = await NextDocument.getInitialProps(ctx)
  //     const styleTagsNotNonce = sheet.getStyleElement()
  //     const styleTags = React.Children.map(styleTagsNotNonce, (child) =>
  //       React.cloneElement<any>(child, { nonce }),
  //     )

  //     return {
  //       ...initialProps,
  //       nonce,
  //       styles: (
  //         <>
  //           {initialProps.styles}
  //           {styleTags}
  //         </>
  //       ),
  //     }
  //   } finally {
  //     sheet.seal()
  //   }
  // }

  render() {
    const { nonce, customBody, customHead } = this.props

    return (
      <Html>
        <Head nonce={nonce}>{customHead}</Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
          {customBody}
        </body>
      </Html>
    )
  }
}
