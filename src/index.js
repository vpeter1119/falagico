/**
 * Falagico generates content in random naming language based on predefined rules.
 * @module falagico
 * @author Peter Vertesi <info@petervertesi.com>
 * @copyright Peter Vertesi, 2020
 * @requires languages
 * @requires random
 * @exports languages
 * @exports Language
 * @exports info
 */

// Require modules
const _ = require('lodash');
const random = require('./util/random');
const Language = require('./classes/language');

// Import default languages
const defaultLangs = require('./languages/defaults');

// Messages
const messages = {
    hello: 'Hello world!',
    errors: {
        syntaxError: 'ERROR: Syntax error.',
        langNotFound: 'ERROR: Language not found.'
    }
};

/**
 * Get information on the language.
 * @name info
 * @param {string} lang One of the default languages exported by {@link module:LanguageModule}.
 * @returns {string}
 */
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

module.exports = {
    messages,
    Language,
    languages: defaultLangs,
    info: GetInfo,
    util: {
        random
    }
};
