
const {expect, test} = require('@jest/globals');
const { remote } = require('webdriverio');
const XLSX = require('xlsx');
const ungtuyen = require('./ung_tuyen')
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

test('Ứng tuyển bằng CV PDF', async () => { 
    var res = await ungtuyen.runTest(wdOpts)
    expect(res).toBe(true)
 })
