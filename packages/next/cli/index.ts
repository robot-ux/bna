#!/usr/bin/env node

import { Command } from 'commander'
import { pkg } from '../utils'
import { dev, start } from './start'
import { build } from './build'
import { analyze } from './analyze'

const program = new Command()
  .version(pkg.version)
  .option('-e, --env <env>', 'which env mode to use')

program.command('dev').action(() => {
  dev()
})

program.command('start').action(() => {
  start()
})

program.command('build').action(() => {
  build()
})

program.command('analyze').action(() => {
  analyze()
})

program.parse(process.argv)

export default {}
