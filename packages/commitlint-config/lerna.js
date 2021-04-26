const { getPackages } = require('./utils/pkg')

module.exports = {
  utils: { getPackages },
  extends: ['./base.js'],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': (ctx) =>
      getPackages(ctx).then((packages) => [2, 'always', packages]),
  },
}
