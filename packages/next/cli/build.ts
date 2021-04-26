import { srcDir, getConfig } from '../utils'
import nextBuild from 'next/dist/build'

export const build = () => {
  nextBuild(srcDir, getConfig() as any)
}
