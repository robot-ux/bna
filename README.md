# bna
> A monorepo for managing all FE infrastructure projects

## Projects
- [next](./packages/next) Customize nextjs, Easier to use, for business development
- [cra](./packages/cra) Customize CRA
- [commitlint](./packages/commitlint-config) Unified commitlint rules
- [generator](./packages/generators) A scaffolding tool
- [prettier-config](./packages/prettier-config) Reusable config for Prettier

## Contributing
1. Clone this repo
2. `yarn`
3. `yarn watch`

### Committing code
This project enforces conventional commit messages via commitlint. See this [summary](https://www.conventionalcommits.org/en/v1.0.0/#summary) for more information on how to write a commit message that follows the rules.

### Opening a Pull Request
Please open all Pull Requests against the master branch.

#### Test your PR
On your PR, You can submit a `/release` comment to release a beta version to test your package
