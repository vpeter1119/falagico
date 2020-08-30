// Require modules
const _ = require("lodash");
const Language = require("./classes/language");

// Import default languages
const defaultLangs = require("./languages/defaults");

// Messages
const messages = {
    hello: `Hello world!`,
    errors: {
        syntaxError: 'ERROR: Syntax error.',
        langNotFound: 'ERROR: Language not found.'
    }
}

/* FUNCTIONS */

// Get information on language
function GetInfo(lang) {
    if (lang) {
        var data = defaultLangs[lang];
        if (!data) return messages.errors.langNotFound;
        var msg = `Name: ${data.name}\nID: ${data.id}\nDescription: ${data.desc}`;
        return msg;
    } else {
        return messages.errors.syntaxError;
    }
}

/* EXPORT */

module.exports = {
    messages,
    Language,
    languages: defaultLangs
}

/* TEST AREA */