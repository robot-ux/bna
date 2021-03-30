#!/usr/bin/env node

const { Command } = require('commander')
const pkg = require('./package.json')
const { dev, start } = require('./start')
const { build } = require('./build')

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
