# Corona Statistics
This is Firefox Kias Application which parse Ministry of health and family welfare website and display same on application

# Features
This is a `node js`, `javascript` application which crawl  ``Ministry of Healthand Family WelfareGovernment of India``(https://www.mohfw.gov.in/) website 
and fetch latest data available there and store same in application . And same is visible on application

# Installation
initial setup require to have latest [`node js`] and [`npm`] (https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04) and [KaiOS](https://developer.kaiostech.com/getting-started/) setup.


# Crawal data
Latest COVID-19 Stastics is updated periodically on  ``Ministry of Healthand Family WelfareGovernment of India``(https://www.mohfw.gov.in/) website . 
This application crawl website and parse data present over thier. If structure of website changes the application code needs to be changed accordingly.

To crawl latest data type  `node crawler.js` command on console it will take latest data .

## Usage

Import the app into the [App Manager](https://developer.mozilla.org/Firefox_OS/Using_the_App_Manager). Then you can run it in the simulator, or in a Firefox OS device.

## Code walkthrough

The `manifest.webapp` file contains metadata about the app, such as its name, description, icon and required permissions for running under Firefox OS.

Moving over to `index.html`, this is the starting point for the app when it's launched, and also where the layout is defined and the JavaScript files with the functionality and logic are loaded.

The appearance is defined in `css/app.css`. There are just some very basic rules.

We define the app's behaviour in `js/app.js`. Right now we're just basically displaying a "Hello world" message.

Finally we are also including `js/libs/l10n.js`, which contains [L10n](https://developer.mozilla.org/en-US/docs/Web/API/L10n_API), a library for translating the strings in the app. Using this library, users can run the app in their own language, as long as you provide the translations for those languages. We're currently including a translation to Spanish as an example, but feel free to contribute with more translations in `data/locales.ini`, looking at `data/es.properties` and `data/en-US.properties` to see the syntax in action. The way it works, it will automatically translate the HTML elements that contain a `data-l10n-id` attribute with the translation identifier.

For any dynamically shown content, you need to use the `navigator.webL10n.get` function, but since that is slightly tedious to write each time, we're aliasing it to just `translate`:

```javascript
var translate = navigator.mozL10n.get;
```