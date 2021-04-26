import nextBuild from 'next/dist/build'
import { srcDir, getConfig } from '../utils'

export const analyze = () => {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  })
  const config = withBundleAnalyzer(getConfig())
  nextBuild(srcDir, config)
}
