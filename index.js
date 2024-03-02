const { remote } = require('webdriverio');
const XLSX = require('xlsx');

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
    await driver.pause(14000)
    // đọc dữ liệu từ Excel 
    const workbook = XLSX.readFile('D:\\DBCLPM_JOBSIFT.xlsx')
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const cellF4Value = sheet['F4'] ? sheet['F4'].v : null;

    const cellF5Value = sheet['F5'] ? sheet['F5'].v : null;

    console.log(cellF4Value)
    console.log(cellF5Value)







    var btnLogin = await driver.$('//android.view.ViewGroup[@content-desc="Login"]')
    btnLogin.click();

  } finally {

  }
}


runTest().catch(console.error);
