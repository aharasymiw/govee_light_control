const express = require('express');
require('dotenv').config();
const axios = require('axios');

const PORT = process.env.PORT || 3000;
const MAC = process.env.MAC;
const GOVEE_API_KEY = process.env.GOVEE_API_KEY;
const DEVICE = process.env.DEVICE;
const GOVEE_BASE_URL = process.env.GOVEE_BASE_URL;

const app = express();

const headers = {
    headers: {
        'Govee-API-Key': `${GOVEE_API_KEY}`
    }
};

app.use(express.static('server/public'));
app.use(express.json());

app.get('/lights/on', (req, res) => {

    console.log('clicked on');

    const message = {
        device: MAC,
        model: DEVICE,
        cmd: {
            name: "turn",
            value: "on"
        }
    };

    axios.put(GOVEE_BASE_URL + '/devices/control', message, headers)
        .then(response => {
            console.log("lights are on");
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

app.get('/lights/off', (req, res) => {

    console.log('clicked off');

    const message = {
        device: MAC,
        model: DEVICE,
        cmd: {
            name: "turn",
            value: "off"
        }
    };

    axios.put(GOVEE_BASE_URL + '/devices/control', message, headers)
        .then(response => {
            console.log("lights are off");
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('Error:', error);
            res.sendStatus(500);
        })
})

app.put('/lights/color', (req, res) => {

    console.log('set color');

    let { red, green, blue } = req.body;

    const message = {
        device: MAC,
        model: DEVICE,
        cmd: {
            name: "color",
            value: {
                r: Number(red),
                g: Number(green),
                b: Number(blue)
            }
        }
    };

    axios.put(GOVEE_BASE_URL + '/devices/control', message, headers)
        .then(response => {
            console.log("light color changed");
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('Error:', error);
            res.sendStatus(500);
        })
})

app.put('/lights/brightness', (req, res) => {

    console.log('set brightness');

    console.log('req.body:', req.body);

    let { value } = req.body;

    const message = {
        device: MAC,
        model: DEVICE,
        cmd: {
            name: "brightness",
            value: Number(value)
        }
    };

    axios.put(GOVEE_BASE_URL + '/devices/control', message, headers)
        .then(response => {
            console.log("light brightness changed");
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('Error:', error);
            res.sendStatus(500);
        })
})

app.put('/lights/color_temp', (req, res) => {

    console.log('set color temp');

    console.log('req.body:', req.body);

    let { value } = req.body;

    const message = {
        device: MAC,
        model: DEVICE,
        cmd: {
            name: "colorTem",
            value: Number(value)
        }
    };

    axios.put(GOVEE_BASE_URL + '/devices/control', message, headers)
        .then(response => {
            console.log("light color temp changed");
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('Error:', error);
            res.sendStatus(500);
        })
})


app.listen(PORT, function () {
    console.log(`You started the server! It is running on port ${PORT}.`);
})

