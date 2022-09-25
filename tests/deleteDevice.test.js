import { fixture, Selector, test } from "testcafe";

const ui_url = 'http://localhost:3001/'

const api_url = "http://localhost:3000/devices"

const axios = require('axios')

fixture `Testing renaming of devices through API cal in NINJA UI`
    .page(ui_url)
    .before(async t => {
        //Test setup goes here
        //await raunDatabaseReset()
        //await seedTestData()
    })
    .beforeEach(async t => {
        //Runs before each test
        await t.setTestSpeed(0.5)
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


test(`Check if last device is visible in the DOM after delete through API`, async(t) => {

    let lastElementDeviceId = ''


    let lastElement = Selector('.device-name').nth(-1)



    const lastElementName = await lastElement.innerText;


    const responseGet = await axios.get(api_url);

    if (responseGet.statusText === "OK") {
        const devices = responseGet.data;
        for (let device of devices) {
            if (device.system_name === lastElementName) {
                lastElementDeviceId = device.id;
            }
        }
    }


    const responsePut = await axios({
        method: 'delete',
        url: `${api_url}/${lastElementDeviceId}`
    })
    if (responsePut.statusText === "OK") {
        let lastElem = Selector('device-name').withText(lastElementName)
        await t.eval(() => location.reload(true));
        await t.wait(2000);
        await t.expect(lastElem.exists).notOk()
        await t.expect(lastElem.visible).notOk()
    }
})