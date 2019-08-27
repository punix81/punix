module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.ts'
  ],
  collectCoverage: false,
  verbose: false,
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [151001]
      }
    }
  }
}
