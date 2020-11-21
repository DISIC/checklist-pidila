module.exports = {
  verbose: false,
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '~/(components|plugins|services|bus|lib)/([^\\.]*)$': '<rootDir>/$1/$2'
  },
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor'
  },
  testEnvironment: 'jest-environment-jsdom-global',
  testURL: 'https://exemple.net/'
}
