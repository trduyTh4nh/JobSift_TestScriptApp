const { remote } = require('webdriverio');
const XLSX = require('xlsx');
const env = require('dotenv').config()
const ENVIRONMENT_VAR = process.env;
const IS_WINDOWS = process.platform === "win32";
async function runTest(wdOpts) {
    const driver = await remote(wdOpts);
    try {
        const workbook = XLSX.readFile(IS_WINDOWS ? ENVIRONMENT_VAR.PATH_WIN : ENVIRONMENT_VAR.PATH_MAC)
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const cellF4Value = sheet['F4'] ? sheet['F4'].v : null;
        const cellF5Value = sheet['F5'] ? sheet['F5'].v : null;
        sheet['F4']
        XLSX.utils.sheet_add_aoa(sheet, [['test']], {origin: 'I3'})
        XLSX.writeFile(workbook, 'test.xlsx')
        console.log(cellF4Value)
        console.log(cellF5Value)
        await driver.pause(14000)
        var txtEmail = await driver.$('//android.widget.EditText[@resource-id="email"]')
        txtEmail.setValue(cellF4Value)
        await driver.pause(1000)
        var txtPassword = await driver.$('//android.widget.EditText[@resource-id="text-input-outlined"]')
        txtPassword.setValue(cellF5Value)
        await driver.pause(1000)
        var btnLogin = await driver.$('//android.view.ViewGroup[@content-desc="Login"]')
        btnLogin.click();
  
    } finally {
  
    }
  }
  module.exports = {
    runTest
  }