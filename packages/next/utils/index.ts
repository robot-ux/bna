import path from 'path'

import getConfig from '../config/next.config'
import pkg from '../package.json'

const srcDir = process.cwd()
const distDir = path.join(srcDir, '.next')

export { getConfig, pkg, srcDir, distDir }
