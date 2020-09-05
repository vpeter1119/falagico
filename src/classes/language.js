// Modules
const _ = require('lodash');
const random = require('../util/random.js');
const defaultOptions = require('./default.js');
const Syllable = require('./syllable');

/**
 * @classdesc A naming language which generates random syllables, words, sentences and text based on pre-defined linguistic rules.
 * @example
 * const Gibberish = new Language(); // uses default values for langOptions
 */
class Language {

    /**
     * @param {langOptions} langOptions Language configuration options.
     */
    constructor(
        /**
        * Language configuration options.
        * @typedef {Object} langOptions
        * @global
        * @property {string} name Full name of the language.
        * @property {string} id Short language ID.
        * @property {string} desc Language description
        * @property {langOptions.phonology} phonology Phonological ruleset used for generating syllables.
        * @default {@link defaultLangOptions}
        */
        langOptions
    ) {
        this.options = (!langOptions || Object.keys(langOptions).length === 0) ? defaultOptions : langOptions;
        /**
         * Phonological ruleset.
         * @typedef {Object} phonology
         * @memberof langOptions
         * @property {phonology.inventory} inventory Phonological inventory in format.
         * @property {phonology.phonotactics} phonotactics Rules of syllable generation.
         * @property {phonology.constraints} constraints Constraints to apply during syllable creation.
         * @property {phonology.other} Miscellaneous language settings.
        */
        this.phonology = {
            /**
             * Phonological inventory.
             * @typedef {Object} phonology.inventory
             * @memberof phonology
             * @property {Object} vowels Contains vowel categories.
             * @example
             * {
             *   vowels: {
             *     low: ["a","u","o"],
             *     mid: [],
             *     high: ["e","i"]
             *   },
             *   consonants: {
             *     glides: ['w'],
             *     liquids: ['bl', 'br', 'pr', 'tr', 'dl', 'dr', 'kl', 'kr', 'gl', 'gr'],
             *     nasals: ['m', 'n'],
             *     fricatives: ['f', 'v', 'th', 's', 'z', 'sh', 'h'],
             *     affricates: ['b', 'p', 't', 'd', 'k', 'g']
             *   }
             * }
             * @property {Object} consonants Contains consonant categories.
             *
            */
            inventory: this.options.phonology.inventory,
            /**
            * Rules of syllable generation.
            * @typedef {Object} phonology.phonotactics
            * @memberof phonology
            * @property {Array<string[]>} onsets Possible values for onset.
            * @property {Array<string[]>} nuclei Possible values for nucleus.
            * @property {Array<string[]>} codas Possible values for coda.
            * @example
            * {
            *   onsets: [[], ['consonants', 'fricatives'], ['consonants', 'affricates'], ['consonants', 'liquids']],
            *   nuclei: [['vowels', 'low'], ['vowels', 'high']],
            *   codas: [[], ['consonants', 'nasals']]
            * }
            */
            phonotactics: this.options.phonology.phonotactics,
            /**
            * Constraints to apply during syllable creation.
            * @typedef {Object} phonology.constraints
            * @memberof phonology
            * @property {boolean} noLiquidAfterCoda Re-generate syllables with liquid onset if previous syllable has non-empty coda.
            * @property {boolean} noGlideAfterCoda Re-generate syllables with glide onset if previous syllable has non-empty coda.
            * @property {boolean} noDoubleNucleus Re-generate syllables with empty onset if previous syllable has empty coda.
            * @example
            * {
            *   noLiquidAfterCoda: true,
            *   noGlideAfterCoda: false,
            *   noDoubleNucleus: true
            * }
            */
            constraints: this.options.phonology.constraints,
            /**
            * Miscellaneous language settings.
            * @typedef {Object} phonology.other
            * @memberof phonology
            * @property {number} maxWordLength Maximum length of randomly generated words (in syllables).
            * @example
            * {
            *   maxWordLength: 3
            * }
           */
            other: this.options.phonology.other
        };
        this.names = this.options.names;
        /** Full name of the language. */
        this.name = this.options.name;
        /** Short language ID. */
        this.id = this.options.id;
        /** Language description. */
        this.desc = this.options.desc;
    }

    /**
     * Generates a syllable based on the phonological inventory and rules.
     * @function
     * @memberof Language
     * @returns {Syllable} Random syllable.
     * @example
     * const Gibberish = new Language(); // uses default values for langOptions
     * var syl = Gibberish.Syllable();
     * console.log(syl).toString(); // bar
     */
    Syllable(elements) {
        if (!this.phonology.inventory) {
            return;
        }
        return new Syllable(this.options, elements);
    }

    /**
     * Generates a random word based on the phonological inventory and rules.
     * @memberof Language
     * @param {number} length Word length in syllables. Default: random integer between 1 and {@link langOptions.phonology.other.maxWordLength}.
     * @returns {string} Random word.
     */
    Word(length = random.int(this.phonology.other.maxWordLength)+1) {
        if (!this.phonology.inventory) {
            return;
        }
        var word = [];
        var wordProcessed = '';
        for (var i = 0; i < length; i++) {
            var syl = this.Syllable();
            word = word.concat(syl);
        }
        // Check word for constraints
        if (this.phonology.constraints.noLiquidAfterCoda) {
            word = this.CheckLiquid(word);
        }
        if (this.phonology.constraints.noGlideAfterCoda) {
            word = this.CheckGlide(word);
        }
        if (this.phonology.constraints.noDoubleNucleus) {
            word = this.CheckDoubleNucleus(word);
        }
        // Concat syllables to word
        word.forEach(syl => {
            var sylProcessed = (syl.onset.text + syl.nucleus.text + syl.coda.text);
            wordProcessed = wordProcessed.concat(sylProcessed);
        });
        return wordProcessed;
    }
    
    /**
     * Generate random sentence based on phonological inventory and rules.
     * @memberof Language
     * @param {number} length The sentence length in words. Default: random integer between 1 and 10.
     * @returns {string} Random sentence.
     */
    Sentence(length = random.int(9)+1) {
        var words = [];
        for (var i = 0; i < length; i++) {
            var commaChance = 10; // in %
            var wordToAdd = (i == 0) ? _.capitalize(this.Word()) : this.Word();
            if (random.int(100) <= commaChance && i < length-1) {
                wordToAdd = wordToAdd.concat(',');
            }
            words = words.concat(wordToAdd);
        }
        var mark = random.pick(['.','?','!']);
        var sentence = `${words.join(' ')}${mark}`;
        return sentence;
    }

    /**
     * Generate random text based on phonological inventory and rules.
     * @memberof Language
     * @param {number} length Length of Text in sentences. Default: random integer between 1 and 10.
     * @returns {string} Random text.
     */
    Text(length = random.int(10)+1) {
        var sentences = [];
        for (var i = 0; i < length; i++) {
            var sentenceToAdd = this.Sentence();
            sentences = sentences.concat(sentenceToAdd);
        }
        var text = sentences.join(' ');
        return text;
    }

    // Convert string into gibberish
    /**
     * Convert string into a random text with the same number of sentences and words.
     * @memberof Language
     * @param {string} string
     * @returns {string} Converted text.
     */
    Convert(string) {
        var sentences = string.split(/[\.?!]+/);
        var sentencesFiltered = sentences.filter(sentence => sentence.length > 0);
        var sentencesAndWords = [];
        sentencesFiltered.forEach(sentence => sentencesAndWords.push(sentence.split(' ').filter(word => word.length > 0)));
        var convertedSentences = [];
        sentencesAndWords.forEach(sentence => convertedSentences.push(this.Sentence(sentence.length)));
        return convertedSentences.join(' ');
    }

    /**
     * Regenerates onset if non-empty coda is followed by liquid onset.
     * @param {Syllable[]} word
     */
    CheckLiquid(word) {
        var processedWord = word;
        for (var i = 0; i < word.length; i++) {
            if (i != word.length - 1 && word[i].coda.type != '' && word[i + 1].onset.type[1] == 'liquids') {
                // Generate a syllable with non-liquid onset
                processedWord[i + 1].ChangeElementType('onset');
            }
        }
        return processedWord;
    }

    /**
     * Regenerates onset if non-empty coda is followed by glide onset.
     * @param {Syllable[]} word
     */
    CheckGlide(word) {
        var processedWord = word;
        for (var i = 0; i < word.length; i++) {
            if (i != word.length - 1 && word[i].coda.type != '' && word[i + 1].onset.type[1] == 'glides') {
                // Generate a syllable with non-glide onset
                processedWord[i + 1].ChangeElementType('onset');
            }
        }
        return processedWord;
    }

    /**
     * Regenerates onset if empty coda is followed by empty onset
     * @param {any} word
     */
    CheckDoubleNucleus(word) {
        var processedWord = word;
        for (var i = 0; i < word.length; i++) {
            if (i != word.length - 1 && word[i].coda.type[1] == undefined && word[i + 1].onset.type[1] == undefined) {
                // Generate a syllable with non-empty onset
                processedWord[i + 1].ChangeElementType('onset');
            }
        }
        return processedWord;
    }

}

module.exports = Language;
