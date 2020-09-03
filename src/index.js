/**
 * Falagico generates content in random naming language based on predefined rules.
 * @module Falagico
 * @author Peter Vertesi <info@petervertesi.com>
 * @copyright Peter Vertesi, 2020
 * @requires LanguageModule
 * @exports Language
 */

// Require modules
const _ = require('lodash');
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

/* EXPORT */

module.exports = {
    messages,
    Language,
    languages: defaultLangs,
    info: GetInfo
};
