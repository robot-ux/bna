# `@bna/commitlint-config`

Reference: https://www.conventionalcommits.org/en/v1.0.0/

## How to use
```json
// package.json
{
  "commitlint": {
    "extends": [
      "@bna/commitlint-config"
    ]
  }
}

// For monorepo
{
  "commitlint": {
    "extends": [
      "@bna/commitlint-config/lerna"
    ]
  }
}
```

### Commit Message [Type](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type)
Must be one of the following:

- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
