import { execSync } from 'child_process'
import path from 'path'

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
    test: /\.(ts|tsx)$/,
    include: [path.join(__dirname, '../plugins/')],
    use: [options.defaultLoaders.babel],
  })

  console.log('config: ', webpack)
  return config
}

export default {
  headers,
  webpack,
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
  generateBuildId: async () => {
    return commitHash
  },
}
