module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/**/*unit.[jt]s?(x)',
    '**/**/*.test.[jt]s?(x)',
  ],
  verbose: true,
  rootDir: './src',
  moduleNameMapper: {
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};
