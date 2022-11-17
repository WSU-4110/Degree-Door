// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  setupFiles: ['dotenv/config'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/functions'],
  transform: { '\\.m?[jt]sx?$': ['babel-jest', { presets: ['next/babel'] }] },
  transformIgnorePatterns: ['/node_modules/(?!(firebase)/)', '^.+\\.module\\.(css|sass|scss)$'],
  "modulePaths": [
    "<rootDir>"
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)

