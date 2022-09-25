import { fixture, Selector, test } from "testcafe";

const ui_url = 'http://localhost:3001/'

const api_url = "http://localhost:3000/devices"

const axios = require('axios')

const newName = 'Rename Device'

fixture `Testing renaming of devices through API cal in NINJA UI`
    .page(ui_url)
    .before(async t => {
        //Test setup goes here
        //await raunDatabaseReset()
        //await seedTestData()
    })
    .beforeEach(async t => {
        //Runs before each test
        await t.setTestSpeed(0.2)
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


test(`Check if renaming through API is visible in the DOM`, async(t) => {

    let firstElementData = {
        system_name: newName,
        type: "",
        hdd_capacity: ""
    }

    let firstElementDeviceId = ''


    let firstElement = Selector('.device-name').nth(0)

    let firstElementType = firstElement.sibling('.device-type').nth(0)

    //let firstElementCapacity = firstElement.sibling('.device-capacity').nth(0)

    const firstElementName = await firstElement.innerText;

    const responseGet = await axios.get(api_url);

    if (responseGet.statusText === "OK") {
        const devices = responseGet.data;
        for (let device of devices) {
            if (device.system_name === firstElementName) {
                firstElementDeviceId = device.id;
                firstElementData.type = device.type;
                firstElementData.hdd_capacity = device.hdd_capacity;
            }
        }
    }


    const responsePut = await axios({
        method: 'put',
        url: `${api_url}/${firstElementDeviceId}`,
        data: firstElementData

    })
    if (responsePut.statusText === "OK") {
        let firstElem = firstElementType.sibling('.device-name').nth(0)
        await t.eval(() => location.reload(true));
        await t.wait(2000);
        await t.expect(firstElem.innerText).contains(newName)
        await t.expect(firstElem.withText(newName).visible).ok()
    }
})