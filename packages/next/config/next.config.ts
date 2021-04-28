import { execSync } from 'child_process'
import { existsSync } from 'fs'
import path from 'path'

const customConfig = path.join(process.cwd(), 'next.config.js')

let commitHash = 'no-git-commit'
try {
  commitHash = execSync(`git rev-parse HEAD`, { encoding: 'utf8' })
} catch (error) {
  console.error(`Get git commit hash failed.`)
}

const headers = () => {
  return []
}

const webpack = (config: any, options: any) => {
  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    include: [path.join(__dirname, '../')],
    use: [options.defaultLoaders.babel],
  })
  return config
}

/**
 * Fix load runtime env failed
 */
const _getPublicEnv = (prefix: string) => {
  const envs = process.env
  const res: any = {}

  Object.keys(envs).forEach((k) => {
    if (k.startsWith(prefix)) {
      res[k] = envs[k]
    }
  })

  return res
}

const baseConfig = {
  headers,
  webpack,
  assetPrefix: process.env.NEXT_PUBLIC_STATIC_HOST,
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
  generateBuildId: async () => {
    return commitHash
  },
  publicRuntimeConfig: {
    ..._getPublicEnv('NEXT_PUBLIC_'),
  },
  serverRuntimeConfig: {
    ..._getPublicEnv('NEXT_PRIVATE_'),
  },
  future: {
    webpack5: true,
  },
}

export default () => ({
  ...(existsSync(customConfig) ? require(customConfig) : {}),
  ...baseConfig,
})
