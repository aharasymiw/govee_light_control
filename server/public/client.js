console.log("js works!");

function turnOn() {
    console.log('clicked on');
    axios({
        method: 'GET',
        url: '/lights/on'
    }).then(
        function (response) {
            console.log('GET /lights/on call successful');
            console.log('response:', response);
        }
    ).catch(
        function (error) {
            console.log('GET /lights/on call failed');
            console.log('error:', error);
        }
    );
}

function turnOff() {
    console.log('clicked off');
    axios({
        method: 'GET',
        url: '/lights/off'
    }).then(
        function (response) {
            console.log('GET /lights/off call successful');
            console.log('response:', response);
        }
    ).catch(
        function (error) {
            console.log('GET /lights/off call failed');
            console.log('error:', error);
        }
    )
}


function setColor(event) {
    event.preventDefault();

    console.log('set color');

    let redInputEl = document.getElementById('red');
    let greenInputEl = document.getElementById('green');
    let blueInputEl = document.getElementById('blue');

    let colors = {
        red: redInputEl.value,
        green: greenInputEl.value,
        blue: blueInputEl.value
    }

    axios({
        method: 'PUT',
        url: '/lights/color',
        data: colors
    }).then(
        function (response) {
            console.log('PUT /lights/color call successful');
            console.log('response:', response);

            redInputEl.value = '';
            greenInputEl.value = '';
            blueInputEl.value = '';
        }
    ).catch(
        function (error) {
            console.log('PUT /lights/color call failed');
            console.log('error:', error);
        }
    )
}

function setBrightness(event) {
    event.preventDefault();

    console.log('set brightness');

    let brightnessInputEl = document.getElementById('brightness');

    let brightness = {
        value: brightnessInputEl.value,
    }

    axios({
        method: 'PUT',
        url: '/lights/brightness',
        data: brightness
    }).then(
        function (response) {
            console.log('PUT /lights/brightness call successful');
            console.log('response:', response);

            brightnessInputEl.value = '';
        }
    ).catch(
        function (error) {
            console.log('PUT /lights/brightness call failed');
            console.log('error:', error);
        }
    )
}
