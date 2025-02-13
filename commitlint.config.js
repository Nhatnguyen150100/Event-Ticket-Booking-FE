export default {
  extends: ['@commitlint/config-conventional', 'cz'],
  rules: {
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 100],
    // 'type-enum': [
    //   2,
    //   'always',
    //   [
    //     '✨ feat',
    //     '🐛 fix',
    //     '📚 docs',
    //     '💄 style',
    //     '♻️ refactor',
    //     '🚀 perf',
    //     '✅ test',
    //     '🔧 chore',
    //     '📦 build',
    //     '👷 ci',
    //     '⏪ revert',
    //     '🚧 wip',
    //   ],
    // ],
  },
};