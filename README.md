# 🚨 govee_light_control 🚨

## Steps to set up (on a mac)

1) Open terminal and navigate to your the directory this file is in.

2) Type `npm install` to install the required dependencies

3) Rename `.env_example` to `.env` (you may have to type ls -a to see it!)

4) Then open `.env` in a text or code editor and replace the values in for everything except the `GOVEE_BASE_URL` with your own values.  (Don't change the stuff on the left of the equal sign)  

- You can request an api key in the govee app, and they will email it to you.
Which is weird.

- You can check your device id online, via a quick google search.
(They seem to follow the pattern: 'Hxxxx' where x is a number)

- You can check your router or use local network tools to find the mac address.

- PORT is probably fine to leave, but if things don't work, you may want to change it to 5002, 5003, 5008, or some other unused value.

5) In terminal, type `npm start` to run the server.
 - `npm run server` will start the server in dev mode, automatically restarting it if you make changes to the code.  This is useful when tinkering around.

6) Open your browser, and go to to `localhost:5001` (or whatever port number you used.)



## Limitations

Govee's web and LAN APIs don't support individual addressing of LEDs.
If you want that, you'll need to use the Govee app, or do some hardware hacking.
(There are a ton of good youtube tutorials on that)

For now, this is as good as it gets without cutting wires folks.


## ToDo

- Validate User Input
- Add retries to API requests
- Add awereness for rate limits
    - There are two types!
- Make it pretty ✨
    - Maybe the page should turn the color of the lights?
- Go for more walks
