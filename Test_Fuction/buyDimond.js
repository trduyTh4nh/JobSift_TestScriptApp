const { remote } = require('webdriverio');
const XLSX = require('xlsx');
const env = require('dotenv').config()
const ENVIRONMENT_VAR = process.env;
const IS_WINDOWS = process.platform === "win32";

const testLogin = require('./login')


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

async function buyDimondSuccess() {

    const driver = await remote(wdOpts)
    try {
        await driver.pause(14000)
        const workbook = XLSX.readFile(IS_WINDOWS ? ENVIRONMENT_VAR.PATH_WIN : ENVIRONMENT_VAR.PATH_MAC)
        // nhận  data từ excel
        const sheetName = workbook.SheetNames[1];
        const sheet = workbook.Sheets[sheetName];

        const emailData = sheet['F3'] ? sheet['F3'].v : null;
        const passData = sheet['F4'] ? sheet['F4'].v : null;
        const cardNumberData = sheet['F10'] ? sheet['F10'].v : null;
        const dateInCardData = sheet['F11'] ? sheet['F11'].v : null;
        const cvcData = sheet['F12'] ? sheet['F12'].v : null;


        await driver.pause(1500)

        var checkLogin = await driver.$('//android.widget.TextView[@text="Đăng nhập và sử dụng ứng dụng theo cách của bạn"]')
        if (checkLogin != null) {
            sheet['J2'] = { v: 'Pass', t: 's' }
        }
        else {
            sheet['J2'] = { v: 'Fail', t: 's' }
        }

        await driver.pause(2000)

        var emailTextB = await driver.$('//android.widget.EditText[@resource-id="email"]')
        if (emailTextB != null) {
            sheet['J3'] = { v: 'Pass', t: 's' }
            await emailTextB.setValue(emailData)
        }
        else {
            sheet['J3'] = { v: 'Fail', t: 's' }
        }
        await driver.pause(1500)


        var passwordTextB = await driver.$('//android.widget.EditText[@resource-id="text-input-outlined"]')
        if (passwordTextB != null) {
            sheet['J4'] = { v: 'Pass', t: 's' }
            await passwordTextB.setValue(passData)
        }
        else {
            sheet['J4'] = { v: 'Fail', t: 's' }
        }
        await driver.pause(500)


        var btnLogin = await driver.$('//android.view.ViewGroup[@content-desc="Login"]')
        await driver.pause(1000)
        var checkDirectPage = await driver.$('//android.widget.TextView[@text="Xin chào, anhBaDi 👋"]')

        if (btnLogin != null) {
            btnLogin.click();
            if (checkDirectPage != null) {
                sheet['J5'] = { v: 'Pass', t: 's' }
            }
        }
        else {
            sheet['J5'] = { v: 'Fail', t: 's' }

        }
        await driver.pause(500)
        var closeWarning = await driver.$(`//android.view.ViewGroup[@content-desc="!, ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package."]/android.view.ViewGroup[3]`)
        if (closeWarning != null) {

            await closeWarning.click()
        }
        await driver.pause(500)


        var userFrag = await driver.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.View/android.view.View[5]/android.view.ViewGroup');
        if (userFrag != null) {
            userFrag.click()
            sheet['J6'] = { v: 'Pass', t: 's' }
            await driver.pause(500)

        }
        else {
            sheet['J6'] = { v: 'Fail', t: 's' }

        }

        await driver.pause(1000)

        var btnToMenu = await driver.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/com.horcrux.svg.SvgView/com.horcrux.svg.GroupView/com.horcrux.svg.PathView[1]')
        if (btnToMenu != null) {
            await btnToMenu.click()
            sheet['J7'] = { v: 'Pass', t: 's' }
            await driver.pause(500)

        }
        else {
            sheet['J7'] = { v: 'Fail', t: 's' }

        }
        await driver.pause(500)

        // const currentDiamond = await driver.$('//android.widget.TextView[@text="💎 1200 "]')
        // var currentDiamond_text = currentDiamond.getText();

        // console.log("C")

        var bthDetailPackage = await driver.$('(//android.view.ViewGroup[@content-desc="Chi tiết "])[1]')
        if (bthDetailPackage != null) {
            await bthDetailPackage.click()
            sheet['J8'] = { v: 'Pass', t: 's' }
            await driver.pause(500)

        }
        else {
            sheet['J8'] = { v: 'Fail', t: 's' }
        }
        await driver.pause(5500)

        const action = [
            {
                "type": "pointer",
                "id": "finger1",
                "parameters": { "pointerType": "touch" },
                "actions": [
                    { "type": "pointerMove", "duration": 0, "x": 500, "y": 1500 },
                    { "type": "pointerDown", "button": 0 },
                    { "type": "pause", "duration": 1000 }, // Đợi một giây
                    { "type": "pointerMove", "duration": 600, "x": 500, "y": 300 },
                    { "type": "pointerUp", "button": 0 }
                ]
            }
        ];

        await driver.performActions(action);

        await driver.pause(5000)

        var btnPopupPayment = await driver.$('//android.view.ViewGroup[@content-desc="Thanh toán"]')
        if (btnPopupPayment != null) {
            await btnPopupPayment.click()
            sheet['J9'] = { v: 'Pass', t: 's' }
        }
        else {
            sheet['J9'] = { v: 'Fail', t: 's' }
        }

        await driver.pause(5000)

        var cardNumber = await driver.$('//android.widget.ScrollView/android.view.View[1]/android.widget.EditText[1]');

        await driver.pause(1000);

        if (cardNumber != null) {
            // Kiểm tra xem cardNumberData có phải là một chuỗi hoặc số không
            if (typeof cardNumberData === 'string' || typeof cardNumberData === 'number') {
                await cardNumber.setValue(cardNumberData.toString()); // Chuyển đổi cardNumberData thành chuỗi trước khi gán
                sheet['J10'] = { v: 'Pass', t: 's' };
            } else {
                console.error('Invalid card number data');
                // Xử lý lỗi hoặc thông báo cho người dùng
                sheet['J10'] = { v: 'Fail', t: 's' }

            }
        }


        // var cardNumber = await driver.$('//android.widget.ScrollView/android.view.View[1]/android.widget.EditText[1]')
        // await driver.pause(1000)
        // if (cardNumber != null) {
        //     await cardNumber.setValue(cardNumberData)
        //     sheet['J10'] = { v: 'Pass', t: 's' }

        // }
        // else {
        //     sheet['J10'] = { v: 'Fail', t: 's' }
        // }
        await driver.pause(3000)
        var dateTime = await driver.$('//android.widget.ScrollView/android.view.View[1]/android.widget.EditText[2]')
        if (dateTime != null) {
            await dateTime.setValue(dateInCardData)
            sheet['J11'] = { v: 'Pass', t: 's' }
        }
        else {
            sheet['J11'] = { v: 'Fail', t: 's' }
        }
        await driver.pause(3000)

        var cvc = await driver.$('//android.widget.ScrollView/android.view.View[1]/android.widget.EditText[3]')
        if (cvc != null) {
            await cvc.setValue(cvcData)
            sheet['J12'] = { v: 'Pass', t: 's' }
        }
        else {
            sheet['J12'] = { v: 'Fail', t: 's' }
        }
        await driver.pause(2000)

        var area = await driver.$('//android.widget.ScrollView/android.view.View[2]/android.view.View')
        if (area != null) {
            area.click()
            sheet['J13'] = { v: 'Pass', t: 's' }
        }
        else {
            sheet['J13'] = { v: 'Fail', t: 's' }
        }
        await driver.pause(500)
        var areaVN = await driver.$('//android.widget.ScrollView/android.view.View[1]')
        if (areaVN != null) {
            sheet['J14'] = { v: 'Pass', t: 's' }
        }
        else {
            sheet['J14'] = { v: 'Pass', t: 's' }
        }
        areaVN.click()

        await driver.pause(1000)
        var btnPayment = await driver.$('//android.widget.FrameLayout[@resource-id="com.jobapp:id/primary_button"]')

        if (btnPayment != null) {
            btnPayment.click()
            sheet['J15'] = { v: 'Pass', t: 's' }
        }
        else {
            sheet['J15'] = { v: 'Fail', t: 's' }
        }

        await driver.pause(1000)

        var btnOK = await driver.$('//android.widget.Button[@resource-id="android:id/button1"]');
        if (btnOK != null) {
            await btnOK.click()

        }
        else {
            sheet['J16'] = { v: 'Fail', t: 's' }
        }


        var upgradedDiamond = await driver.$('//android.widget.TextView[@text="💎 100 "]')

        await driver.pause(2000)
        XLSX.writeFile(workbook, IS_WINDOWS ? ENVIRONMENT_VAR.PATH_WIN : ENVIRONMENT_VAR.PATH_MAC)

    }
    finally {

    }
    //android.widget.ScrollView/android.view.View[1]/android.widget.EditText[1]

}

module.exports = { buyDimondSuccess }