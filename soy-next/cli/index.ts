#!/usr/bin/env node

import { Command } from 'commander'
import { pkg } from '../utils'
import { dev, start } from './start'
import { build } from './build'

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

program.parse(process.argv)

export default {}
