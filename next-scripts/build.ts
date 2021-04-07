const { spawnSync } = require('child_process')
const getDir = () => process.cwd()

export const build = () => {
  const dir = getDir()
  spawnSync(`next`, [`build`, dir], { stdio: 'inherit' })
}
