'use strict';

module.exports = {
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['./tests/setupJest.ts'],
	moduleNameMapper: {
		"tests": "<rootDir>/test_helpers"
	},
	coverageDirectory: '<rootDir>/coverage/sonarQube',
	testResultsProcessor: 'jest-sonar-reporter',
	collectCoverage: true,
	codeCoverage:true,
	coveragePathIgnorePatterns : ['node_modules', '/tests/', 'test_helpers'],
	forceCoverageMatch: [
		'**/src/**/*.ts'
	]
};
