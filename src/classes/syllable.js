// Modules
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
        this.pow = (this.options.config && this.options.config.adjustTypes) ? this.options.config.adjustTypes : 1;

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
            onsetType = random.pickAdj(this.options.phonology.phonotactics.onsets, this.pow);
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
            nucleusType = random.pickAdj(this.options.phonology.phonotactics.nuclei, this.pow);
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
            codaType = random.pickAdj(this.options.phonology.phonotactics.codas, this.pow);
        }
        var codaText = codaType.length ? random.pick(this.options.phonology.inventory[codaType[0]][codaType[1]]) : '';
        return {
            type: codaType || '',
            text: codaText
        };
    }

    /**
     * Changes the specified syllable element (onset, nucleus or coda) to another valid type.
     * @param {string} element Syllable element to change. Must be 'onset', 'nucleus' or 'coda'.
     * @returns {Promise<Syllable.element>} The new element.
     */
    ChangeElementType(element) {
        var syntaxError = new SyntaxError('You must provide an element.');
        if (!element) throw syntaxError;
        var typeError = new TypeError(`${element} is not a valid element. Must be 'onset', 'nucleus' or 'coda'.`);
        if (element != 'onset' && element != 'coda' && element != 'nucleus') throw typeError;
        var pt = this.options.phonology.phonotactics;
        var oldElementType;
        var newElementType;
        var newElement;
        return new Promise((resolve) => {
            switch (element) {
                case 'onset':
                    oldElementType = this.onset.type;
                    newElementType = random.pick(pt.onsets.filter(et => et[1] != oldElementType[1]));
                    newElement = this.GenerateOnset(newElementType);
                    this.onset = newElement;
                    resolve(newElement);
                    break;
                case 'nucleus':
                    oldElementType = this.nucleus.type;
                    newElementType = random.pick(pt.nuclei.filter(et => et[1] != oldElementType[1]));
                    newElement = this.GenerateNucleus(newElementType);
                    this.nucleus = newElement;
                    resolve(newElement);
                    break;
                case 'coda':
                    oldElementType = this.coda.type;
                    newElementType = random.pick(pt.codas.filter(et => et[1] != oldElementType[1]));
                    newElement = this.GenerateCoda(newElementType);
                    this.coda = newElement;
                    resolve(newElement);
                    break;
                default:
                    throw typeError;
            }
        });
    }

    /**
     * Completely regenerates syllable elements.
     * @memberof Syllable
     * @returns {Promise<Syllable>} Syllable elements object.
     * */
    Regen() {
        return new Promise(resolve => {
            this.onset = this.GenerateOnset();
            this.nucleus = this.GenerateNucleus();
            this.coda = this.GenerateCoda();
            var newSyl = {
                onset: this.onset,
                nucleus: this.nucleus,
                coda: this.coda
            };
            resolve(newSyl);
        });
    }

    /**
     * Returns syllable text as string.
     * @memberof Syllable
     * @returns {string}
     * */
    toString() {
        return `${this.onset.text}${this.nucleus.text}${this.coda.text}`;
    }

    /**
     * Returns syllable as an array of strings.
     * @memberof Syllable
     * @returns {string[]}
     * */
    toArray() {
        return [this.onset.text,this.nucleus.text,this.coda.text];
    }
}

module.exports = Syllable;