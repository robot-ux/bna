import { srcDir, conf } from '../utils'
import nextBuild from 'next/dist/build'

export const build = () => {
  nextBuild(srcDir, conf as any)
}
