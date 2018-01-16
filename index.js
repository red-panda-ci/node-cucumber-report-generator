const REPORTPATH=process.env.PR
const JSONPATH=process.env.JD

const fs = require('fs')
const reporter = require('cucumber-html-reporter')


const options = {
    theme: 'bootstrap',
    jsonDir: JSONPATH,
    output: REPORTPATH,
    reportSuiteAsScenarios: true,
    launchReport: true,
};

reporter.generate(options)
console.log('Report generated')
