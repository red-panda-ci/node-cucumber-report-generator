const REPORTPATH=process.env.PR
const JSONPATH=process.env.JD

const fs = require('fs');
const reporter = require('cucumber-html-reporter');
const maxFailedTest = 10;
const options = {
    theme: 'bootstrap',
    jsonDir: JSONPATH,
    output: REPORTPATH,
    reportSuiteAsScenarios: true,
    launchReport: false,
};

reporter.generate(options)

console.log('Report generated');
readReport();

function readReport() { 
    const content = fs.readFileSync('../reports/node-cucumber-report-generator/index.html.json');
    let jsonCont =  JSON.parse(content);
    let failure = 0;
    let totaltest = 0;  

    function setStatus(element) {
        if (element == 'failed'){
            totaltest++;
            failure++;
        }else {
            totaltest++;
        } 
    };

    console.log('Checking test execution...');
    for (let parent = 0; parent < jsonCont.length; parent++){
        for (let elements = 0; elements < jsonCont[parent].elements.length; elements++){
            for (let steps = 0; steps < jsonCont[parent].elements[elements].steps.length; steps++){
                setStatus(jsonCont[parent].elements[elements].steps[steps].result.status);
            } 
        } 
    }
    console.log('############################');
    console.log('Runned steps: ' + totaltest);
    console.log('Failed steps: ' + failure);

    if((totaltest / maxFailedTest) < failure ){
        try {
            throw new error('There were more than 10% of failed tests.');
        } catch(e){
            console.log('Test execution was failed.');
        }
    }else {
            console.log('Test execution was successful.');
    }
}
