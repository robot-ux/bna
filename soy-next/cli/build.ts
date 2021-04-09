import { spawnSync } from 'child_process'
import fs from 'fs'
import { distDir } from '../utils'
import path from 'path'

const getDir = () => process.cwd()

export const build = () => {
  const dir = getDir()
  spawnSync(`next`, [`build`, dir], { stdio: 'inherit' })

  const srcDir = path.join(__dirname, '../config')
  // copy dockerfile
  fs.copyFileSync(`${srcDir}/dockerignore`, `${distDir}/.dockerignore`)
  fs.copyFileSync(`${srcDir}/Dockerfile`, `${distDir}/Dockerfile`)
}
