const fs = require('fs');

const MissingConfigFileError = require('./MissingConfigFileError');

const CONFIG_FILE_NAME = 'config.json';

function loadProperties() {
    try {
        fs.accessSync(CONFIG_FILE_NAME);
    } catch(e) {
        throw new MissingConfigFileError('Missing properties file...');
    }

    try {
        return JSON.parse(fs.readFileSync(CONFIG_FILE_NAME).toString());
    } catch(e) {
        console.error('Error occurred while loading properties file', e);
        return {};
    }
}

module.exports = class PropertyUtil {
    static loadProperty(property) {
        const props = loadProperties();
        return props[property];
    }
};
