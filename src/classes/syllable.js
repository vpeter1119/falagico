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
        this.onset = elements.onset || random.pick(this.options.phonology.onsets);
        /**
         * Middle part of the syllable (obligatory). In most cases, nucleus is a vowel.
         * @type {Syllable.element}
         */
        this.nucleus = elements.nucleus || random.pick(this.options.phonology.nuclei);
        /**
         * Last part of the syllable (optional).
         * @type {Syllable.element}
         */
        this.coda = elements.coda || random.pick(this.options.phonology.codas);
    }

    // Getters
    get onset() {
        return this.onset;
    }
    get nucleus() {
        return this.nucleus;
    }
    get coda() {
        return this.coda;
    }

    // Setters
    set onset(value) {
        if (value.type && this.options.phonology.phonotactics.onsets.includes(value.type)) {
            this.onset = value;
        } else {
            throw ('Invalid onset type.');
        }
    }
    set nucleus(value) {
        if (value.type && this.options.phonology.phonotactics.nuclei.includes(value.type)) {
            this.nucleus = value;
        } else {
            throw('Invalid nucleus type.');
        }
    }
    set coda(value) {
        if (value.type && this.options.phonology.phonotactics.codas.includes(value.type)) {
            this.coda = value;
        } else {
            throw ('Invalid coda type.');
        }
    }
}

module.exports = Syllable;