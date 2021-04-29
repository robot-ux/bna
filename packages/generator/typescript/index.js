const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const fs = require('fs')

module.exports = class extends Generator {
  async prompting() {
    this.log(yosay(`Welcome to the ${chalk.red('create-bna-app')} generator!`))

    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name:',
        default: 'ts-demo',
        validate: (input) => {
          const _name = path.join(process.cwd(), input)
          const isExist = fs.existsSync(_name)

          if (isExist) return chalk.cyan(`${_name} already exist`)
          return true
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your project description:',
      },
    ])

    this.answers = answers
    this.destinationRoot(path.join(process.cwd(), this.answers.name))
    this.sourceRoot(path.join(__dirname, 'template'))
  }

  writing() {
    const copyPath = this.answers.name

    // Copy all dotfiles
    this.fs.copy(this.templatePath('./**/*'), this.destinationRoot(), {
      globOptions: {
        dot: true,
        ignore: ['**/node_modules', '**/.next', 'dist', 'README.md', 'package.json'],
      },
    })

    // Copy package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.answers.name,
        description: this.answers.description,
      },
    )
    // Copy README.md
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { name: this.answers.name, description: this.answers.description },
    )
  }

  install() {
    this.spawnCommandSync('yarn', ['install'])
  }

  end() {
    this.log(yosay(`WOW! I'm all ${chalk.red('done')}!`))
  }
}
