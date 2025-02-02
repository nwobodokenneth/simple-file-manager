export { };
module.exports = {
   collectCoverage: true,
   collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts',
      '!**/vendor/**'],
   coverageDirectory: 'coverage',
   testEnvironment: 'jsdom',
   transform: {
      ".(ts|tsx)": "ts-jest"
   },
   moduleNameMapper: {
      '\\.(gif|tiff|svg|png)$': '<rootDir>/tests/FileMock.ts',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '^@/(.*)$': '<rootDir>/src/$1', // Adjust if necessary
   },

   coveragePathIgnorePatterns: [
      "/node_modules/",
      "/coverage",
      "package.json",
      "package-lock.json",
      "reportWebVitals.ts",
      "setupTests.ts",
      "index.tsx"
   ],
   setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}
