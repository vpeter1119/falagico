// Modules
const _ = require('lodash');
const Language = require('./language');
const defaultOptions = require('./default.js');
const random = require('../util/random.js');

/**
 * @classdesc The lowest level generated element of a naming language.
 */
class Syllable {
    /**
     * @param {langOptions} options Language configuration options.
     * @param {Object} [elements] Syllable onset, nucleus and coda.
     */
    constructor(
        options = defaultOptions,
        elements = {}
    ) {
        this.options = options;

        /**
         * Syllable element.
         * @typedef {Object} Syllable.element
         * @memberof Syllable
         * @property {string[]} type Element type and subtype, e.g. "consonants.approximant".
         * @property {string} text Element value, e.g. "b".
         */

        /**
         * First part of the syllable (optional).
         * @type {Syllable.element}
         */
        this.onset = elements.onset || this.GenerateOnset();
        /**
         * Middle part of the syllable (obligatory). In most cases, nucleus is a vowel.
         * @type {Syllable.element}
         */
        this.nucleus = elements.nucleus || this.GenerateNucleus();
        /**
         * Last part of the syllable (optional).
         * @type {Syllable.element}
         */
        this.coda = elements.coda || this.GenerateCoda();
    }

    /**
     * Generate a valid syllable onset.
     * @memberof Syllable
    * @param {string[]} [type] A valid onset type, for example ['consontants','affricates']. Optional.
     * @return {Syllable.element} A valid onset.
     * */
    GenerateOnset(type) {
        var onsetType;
        if (type && this.options.phonology.phonotactics.onsets.includes(type)) {
            onsetType = type;
        } else {
            onsetType = random.pick(this.options.phonology.phonotactics.onsets);
        }
        var onsetText = onsetType.length ? random.pick(this.options.phonology.inventory[onsetType[0]][onsetType[1]]) : '';
        return {
            type: onsetType || '',
            text: onsetText
        };
    }

    /**
    * Generate a valid syllable nucleus.
    * @memberof Syllable
    * @param {string[]} [type] A valid nucleus type, for example ['vowels','low']. Optional.
    * @return {Syllable.element} A valid nucleus.
    * */
    GenerateNucleus(type) {
        var nucleusType;
        if (type && this.options.phonology.phonotactics.nuclei.includes(type)) {
            nucleusType = type;
        } else {
            nucleusType = random.pick(this.options.phonology.phonotactics.nuclei);
        }
        var nucleusText = nucleusType.length ? random.pick(this.options.phonology.inventory[nucleusType[0]][nucleusType[1]]) : '';
        return {
            type: nucleusType || '',
            text: nucleusText
        };
    }

    /**
    * Generate a valid syllable coda.
    * @memberof Syllable
    * @param {string[]} [type] A valid coda type, for example ['consontants','approximants']. Optional.
    * @return {Syllable.element} A valid coda.
    * */
    GenerateCoda(type) {
        var codaType;
        if (type && this.options.phonology.phonotactics.codas.includes(type)) {
            codaType = type;
        } else {
            codaType = random.pick(this.options.phonology.phonotactics.codas);
        }
        var codaText = codaType.length ? random.pick(this.options.phonology.inventory[codaType[0]][codaType[1]]) : '';
        return {
            type: codaType || '',
            text: codaText
        };
    }

    
}

module.exports = Syllable;