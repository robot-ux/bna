import path from 'path'

import conf from '../config/next.config'
import pkg from '../package.json'

const srcDir = process.cwd()
const distDir = path.join(srcDir, '.next')

export { conf, pkg, srcDir, distDir }
