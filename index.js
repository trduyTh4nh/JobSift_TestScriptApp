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
    

  } finally {

  }
}


runTest().catch(console.error);
