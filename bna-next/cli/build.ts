import fs from 'fs'
import { srcDir, distDir, conf } from '../utils'
import path from 'path'
import nextBuild from 'next/dist/build'

export const build = () => {
  nextBuild(srcDir, conf as any).then(() => {
    const srcDir = path.join(__dirname, '../config')
    // copy dockerfile
    fs.copyFileSync(`${srcDir}/dockerignore`, `${distDir}/.dockerignore`)
    fs.copyFileSync(`${srcDir}/Dockerfile`, `${distDir}/Dockerfile`)
  })
}
