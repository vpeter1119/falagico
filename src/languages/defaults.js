/**
 * This module exports the default languages pre-configured in Falagico.
 * @module DefaultLanguages
 * @author Peter Vertesi <info@petervertesi.com>
 * @requires TestLang
 * @requires Elvish
 */

// Import languages
const Elvish = require('./elvish');
const TestLang = require('./testLang');

// Export
module.exports = {
    Elvish,
    TestLang
};