/**
 * This module exports the default languages pre-configured in Falagico.
 * @module languages
 * @author Peter Vertesi <info@petervertesi.com>
 */

// Import languages
const Elvish = require('./elvish');
const TestLang = require('./testLang');

// Export
module.exports = {
    Elvish,
    TestLang
};