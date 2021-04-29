#!/usr/bin/env node
const { Command } = require('commander')
const yeoman = require('yeoman-environment')

const pkg = require('./package.json')
const NextBasic = require('./next-basic')
const chalk = require('chalk')

const env = yeoman.createEnv()
const types = []

const subs = [
  {
    name: 'next-basic',
    generator: NextBasic,
  },
]

subs.forEach((item) => {
  env.registerStub(item.generator, item.name)
  types.push(item.name)
})

const program = new Command()
  .version(pkg.version)
  .requiredOption(
    `-t, --template <${types.join('|')}>`,
    'which template to use',
    function (value) {
      if (types.includes(value)) return value

      console.log(
        `${chalk.yellow('Warning: ')} This template ${chalk.cyan(
          value,
        )} is not exist. Only support ${chalk.cyan(types.join('|'))}`,
      )

      process.exit(0)
    },
  )
  .parse()

const { template } = program.opts()

env.run(template)
