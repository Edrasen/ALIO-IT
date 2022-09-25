import { fixture, Selector, test } from "testcafe";

const axios = require('axios')

let mydevices = []

axios.get('http://localhost:3000/devices')
    .then(res => {
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.status);
        console.log('Date in Response header:', headerDate);

        const devices = res.data;

        for (let device of devices) {
            console.log(`Got user with id: ${device.id}, name: ${device.system_name}`);
            let device_id = device.id
            mydevices.push(device_id)
        }
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });






fixture `Testing visibility of devices in NINJA UI`
    .page('http://localhost:3001/')
    .before(async t => {
        //Test setup goes here
        //await raunDatabaseReset()
        //await seedTestData()
    })
    .beforeEach(async t => {
        //Runs before each test
        await t.setTestSpeed(1)
            //await t.maximizeWindow()
            //await t.setPageLoadTimeout(0)
    })
    .after(async t => {
        //Cleaning test data
        // Logging and sending data to monitoring systems
    })
    .afterEach(async t => {
        //Run after each test
        //await t.wait(3000)
    })


let listOfElements = ['DESKTOP-SMART', 'MAC-LEADER', 'ARMANDO-SERVER', 'MIGUEL-PC', 'FIRST-MAC', 'GOOD-MAC', 'SERVER-ONE', 'GILBERT-COMPUTER', 'MOON-SMART', 'JULIO-MAC-LOCAL']


function testAll(device) {
    test(`Checki if '${device}' is visible in the DOM`, async(t) => {

        let mydevice = Selector('span').withText(device)
        await t.expect(mydevice.exists).ok()
    })
}



listOfElements.forEach(element => {
    testAll(element)
});