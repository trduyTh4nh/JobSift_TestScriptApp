const { remote } = require('webdriverio');
const XLSX = require('xlsx');
const env = require('dotenv').config()
const ENVIRONMENT_VAR = process.env;
const IS_WINDOWS = process.platform === "win32";
console.log(IS_WINDOWS)
const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.jobapp',
  'appium:appActivity': '.MainActivity',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};


async function runTest() {
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






    var btnLogin = await driver.$('//android.view.ViewGroup[@content-desc="Login"]')
    btnLogin.click();

  } finally {

  }
}


runTest().catch(console.error);
