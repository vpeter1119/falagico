// Import classes
const Language = require('../classes/language');

// Import languages
const Elvish = require('./elvish');
const TestLang = require('./testLang');

// Set default language
const Default = new Language();

// Export
module.exports = {
    Elvish,
    TestLang,
    Default
};