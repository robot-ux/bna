import React from 'react'
import Head from 'next/head'
import { NextSeo, NextSeoProps } from 'next-seo'

const DEFAULT_FAVICON = `/images/favicon.ico`
const DEFAULT_IMAGE = `/images/dex_twitter.png`

export interface ISeoHead extends NextSeoProps {
  assetPrefix: string
  origin?: string
}

export const SeoHead = (props: ISeoHead) => {
  const { assetPrefix } = props
  const imgUrl = `${assetPrefix}${DEFAULT_IMAGE}`
  const favicon = `${assetPrefix}${DEFAULT_FAVICON}`
  const seo: ISeoHead = {
    openGraph: {
      title:
        'Binance | Binance Smart Chain | Binance Staking | Binance Swap | Binance.org',
      site_name:
        'Binance | Binance Smart Chain | Binance Staking | Binance Swap | Binance.org',
      description:
        props.description ||
        'Binance dual-chain system allows you the freedom to build your own decentralized blockchain apps securely and without the need for an intermediary. Set up your account and get started!',
      url: props.origin || 'https://www.binance.org/',
      images: [{ url: imgUrl }],
      ...props.openGraph,
    },
    twitter: {
      // Twitter will read the og:title, og:xx etc.
      site: '@Binance_Dex',
      cardType: 'summary_large_image',
      handle: '@Binance_Dex',
    },
    ...props,
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"
        />
        <meta name="apple-mobile-web-app-title" content="Binance DEX" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta content="telephone=no" name="format-detection" />
        <meta name="x5-fullscreen" content="true" />
        <meta name="browsermode" content="application" />
        <meta name="x5-page-mode" content="app" />
        <meta name="google" content="notranslate" />

        <link rel="apple-touch-icon" href={favicon} />
        <link
          rel="apple-touch-startup-image"
          href={favicon}
          sizes="320x460"
          media="screen and (max-device-width: 320)"
        />
        <link
          rel="apple-touch-startup-image"
          href={favicon}
          sizes="640x920"
          media="screen and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2)"
        />
        <link rel="shortcut icon" type="image/x-icon" href={favicon} />
      </Head>

      <NextSeo {...seo} />
    </>
  )
}
