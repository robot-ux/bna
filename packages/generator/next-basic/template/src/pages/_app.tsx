import { App, AppContext, SeoHead } from '@bna/next'
import { HoneycombThemeProvider } from '@binance-chain/honeycomb'

import { assetPrefixWithDefault } from 'utils/env'

class WebApp extends App {
  static async getInitialProps(props: AppContext) {
    return await super.getInitialProps(props)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <SeoHead assetPrefix={assetPrefixWithDefault} />
        <HoneycombThemeProvider>
          <Component {...pageProps} />
        </HoneycombThemeProvider>
      </>
    )
  }
}

export default WebApp
