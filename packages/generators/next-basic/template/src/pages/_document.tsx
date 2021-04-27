import React from 'react'
import { Head, Html, Main, NextScript } from 'next/document'
import { Document, FreshDesk } from '@bna/next'

import { assetPrefixWithDefault, freshDeskId } from 'utils/env'

class WebAppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href={`${assetPrefixWithDefault}/fonts/index.css`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />

          <FreshDesk id={freshDeskId} />
        </body>
      </Html>
    )
  }
}

export default WebAppDocument
