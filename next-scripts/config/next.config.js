const { execSync } = require('child_process')
const path = require('path')

let commitHash = 'no-git-commit'
try {
  commitHash = execSync(`git rev-parse HEAD`, { encoding: 'utf8' })
} catch (error) {
  console.error(`Get git commit hash failed.`)
}

const headers = () => {
  return []
}

const webpack = (config, options) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [path.join(__dirname, '../plugins/')],
    use: [options.defaultLoaders.babel],
  })

  return config
}

module.exports = {
  headers,
  webpack,
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
  generateBuildId: async () => {
    return commitHash
  },
}
