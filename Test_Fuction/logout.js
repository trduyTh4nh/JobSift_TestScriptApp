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

const workbook = XLSX.readFile(IS_WINDOWS ? ENVIRONMENT_VAR.PATH_WIN : ENVIRONMENT_VAR.PATH_MAC)

async function logOut() {
    const driver = await remote(wdOpts);
    try {
        await driver.pause(14000)

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const emailData = sheet['F4'] ? sheet['F4'].v : null;
        const passData = sheet['F5'] ? sheet['F5'].v : null;
        console.log(emailData)
        console.log(passData)
        var closeWarning = await driver.$(`//android.view.ViewGroup[@content-desc="!, ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package."]/android.view.ViewGroup[3]`)
        await closeWarning.click()
        await driver.pause(2000)
        var checkLogin = await driver.$('//android.widget.TextView[@text="Đăng nhập và sử dụng ứng dụng theo cách của bạn"]')
        if (checkLogin != null) {
            sheet['J2'] = { v: 'Pass', t: 's' }
        }

        var emailTextB = await driver.$('//android.widget.EditText[@resource-id="email"]')
        if (emailTextB != null) {
            sheet['J3'] = { v: 'Pass', t: 's' }
            await emailTextB.setValue(emailData)
        }

        var passwordTextB = await driver.$('//android.widget.EditText[@resource-id="text-input-outlined"]')
        if (passwordTextB != null) {
            sheet['J4'] = { v: 'Pass', t: 's' }
            await passwordTextB.setValue(passData)
        }

        var btnLogin = await driver.$('//android.view.ViewGroup[@content-desc="Login"]')
        if (btnLogin != null) {
            sheet['J5'] = { v: 'Pass', t: 's' }
            btnLogin.click();
        }

        await driver.pause(1000)
        XLSX.writeFile(workbook, IS_WINDOWS ? ENVIRONMENT_VAR.PATH_WIN : ENVIRONMENT_VAR.PATH_MAC)

        
        await driver.pause(5000)

        var userFrag = await driver.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.View/android.view.View[5]/android.view.ViewGroup');
        if(userFrag != null){
            userFrag.click()
        }
        await driver.pause(2000)

        var btnLogout = await driver.$('//android.view.ViewGroup[@content-desc=" Đăng xuất"]');
        if(btnLogout != null){
            btnLogout.click()
        }
        await driver.pause(2000)

        var checkLogin = await driver.$('//android.widget.TextView[@text="Đăng nhập và sử dụng ứng dụng theo cách của bạn"]')
        if (checkLogin != null) {
        }

        var btnConfirmLogout = await driver.$('//android.widget.Button[@resource-id="android:id/button1"]')
        if (btnConfirmLogout != null){
            btnConfirmLogout.click()
           console.log("lụm")

        }

        await driver.pause(1000)
        XLSX.writeFile(workbook, IS_WINDOWS ? ENVIRONMENT_VAR.PATH_WIN : ENVIRONMENT_VAR.PATH_MAC)
    } finally {
        await driver.pause(10000)
        
    }
}

module.exports = { logOut }