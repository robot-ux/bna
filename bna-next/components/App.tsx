import NextApp, { AppContext, AppInitialProps } from 'next/app'

interface Props extends AppInitialProps {
  assetPrefix: string
}

export class App<P = {}> extends NextApp<P & Props> {
  static async getInitialProps(props: AppContext): Promise<Props> {
    const appProps = await NextApp.getInitialProps(props)

    let assetPrefix = ''
    if (props.ctx.res) {
      // @ts-ignore
      assetPrefix = props.ctx.res.assetPrefix
    } else {
      assetPrefix = window.__NEXT_DATA__.assetPrefix || ''
    }

    return { ...appProps, assetPrefix }
  }
}
