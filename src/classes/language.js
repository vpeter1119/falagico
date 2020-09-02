/**
 * This module uses the following depedencies: [lodash]{@link https://github.com/lodash/lodash} and {@link RandomModule}.
 * @module LanguageModule
 * @author Peter Vertesi <info@petervertesi.com>
 * @copyright Peter Vertesi, 2020
 * @requires lodash
 * @requires RandomModule
 */

// Modules
const _ = require('lodash');
const random = require('../util/random.js');

/**
 * Creates a new Language.
 * @class
 */
class Language {

    /**
     * @constructs Language
     * @param {Object} langOptions Language options object.
     * @param {string} langOptions.name Full name of the language.
     * @param {string} langOptions.id Short language ID.
     * @param {string} langOptions.desc Language description.
     * @param {Object} langOptions.phonology Phonological ruleset.
     * @param {Object} langOptions.phonology.inventory Phonological inventory in format {<type>:{<subtype>:["<option1>","<option2>"...]...}...}.
     * @param {Object} langOptions.phonology.phonotactics Rules of syllable construction.
     * @param {string[]} langOptions.phonology.phonotactics.onsets Possible values for syllable onset.
     * @param {string[]} langOptions.phonology.phonotactics.nuclei Possible values for syllable nucleus.
     * @param {string[]} langOptions.phonology.phonotactics.codas Possible values for syllable coda.
     * @param {Object} langOptions.phonology.constraints Constraints to apply during syllable creation.
     * @param {boolean} langOptions.phonology.constraints.noLiquidAfterCoda Re-generate syllables with liquid onset if previous syllable has non-empty coda.
     * @param {boolean} langOptions.phonology.constraints.noLiquidAfterCoda Re-generate syllables with glide onset if previous syllable has non-empty coda.
     * @param {boolean} langOptions.phonology.constraints.noDoubleNucleus Re-generate syllables with empty onset if previous syllable has empty coda.
     * @param {number} langOptions.other Miscellaneous settings.
     * @param {number} langOptions.other.maxWordLength Maximum length of generated words.
     */
    constructor(
        langOptions
    ) {
        this.phonology = langOptions.phonology;
        this.names = langOptions.names;
        this.name = langOptions.name;
        this.id = langOptions.id;
        this.desc = langOptions.desc;
    }

    // Getters

    // Setters

    /**
     * Generates a syllable based on the phonological inventory and rules.
     * @memberof Language
     */
    Syllable() {
        if (!this.phonology.inventory) {
            return;
        }
        var syllable = {
            onset: {
                type: '',
                text: ''
            },
            nucleus: {
                type: '',
                text: ''
            },
            coda: {
                type: '',
                text: ''
            }
        }
        // Generate nucleus
        var nucleusType = random.pick(this.phonology.phonotactics.nuclei);
        var nucleus = random.pick(this.phonology.inventory[nucleusType[0]][nucleusType[1]]);
        syllable.nucleus = {
            type: nucleusType[1] || '',
            text: nucleus
        };
        // Generate onset
        var onsetType = random.pick(this.phonology.phonotactics.onsets);
        var onset = onsetType.length ? random.pick(this.phonology.inventory[onsetType[0]][onsetType[1]]) : "";
        syllable.onset = {
            type: onsetType[1] || '',
            text: onset
        };
        // Generate coda
        var codaType = random.pick(this.phonology.phonotactics.codas);
        var coda = codaType.length ? random.pick(this.phonology.inventory[codaType[0]][codaType[1]]) : "";
        syllable.coda = {
            type: codaType[1] || '',
            text: coda
        };
        return syllable;
    }

    /**
     * Generates a random word based on the phonological inventory and rules.
     * @memberof Language
     * @param {number} length Word length in syllables. Default: random integer between 1 and <langOptions.phonology.other.maxWordLength>.
     * @returns {string} Random word.
     */
    Word(length = random.int(this.phonology.other.maxWordLength)+1) {
        if (!this.phonology.inventory) {
            return;
        }
        /*
         Constraints:
            - no liquid onset after coda
            - no null onset after null coda (no double nucleus)
         */
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
        })
        return wordProcessed;
    }
    
    /**
     * Generate random sentence based on phonological inventory and rules.
     * @memberof Language
     * @param {number} length The sentence length in words. Default: random integer between 1 and 10.
     * @returns {string} Random sentence.
     */
    Sentence(length = random.int(10)+1) {
        var words = [];
        for (var i = 0; i < length; i++) {
            var commaChance = 10; // in %
            var wordToAdd = (i == 0) ? _.capitalize(this.Word()) : this.Word();
            if (random.int(100) <= commaChance && i < length-1) {
                wordToAdd = wordToAdd.concat(",");
            }
            words = words.concat(wordToAdd);
        }
        var mark = random.pick([".","?","!"]);
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
     * Generate random syllable based on simple phonological rules.
     * @memberof Language
     * @param {string} pattern Syllable pattern, e.g. "CVC". Default: random pattern from langOptions.
     * @returns {string} Random syllable.
     */
    SyllableSimple(pattern = random.pick(this.phonology.phonotacticsSimple)) {
        var syllable = [];
        var sylElList = pattern.split('');
        sylElList.forEach(syllableElement => {
            var index = random.int(this.phonology.inventorySimple[syllableElement].length);
            var character = this.phonology.inventorySimple[syllableElement][index];
            syllable = syllable.concat(character);
        });
        return syllable.join('');
    }
    // Simple word generation
    WordSimple(length = random.int(2) + 1) {
        var word = "";
        for (var i = 0; i < length; i++) {
            word = word.concat(this.SyllableSimple());
        }
        return word;
    }

    // Generate first name
    FirstName(type = random.pick(Object.keys(this.names.firstNames))) {
        var pattern = random.pick(this.names.firstNames[type]);
        var name = _.capitalize(this.SyllableSimple(pattern));
        return name;
    }

    // Generate full name
    FullName(type = random.pick(Object.keys(this.names.firstNames))) {
        var firstName = this.FirstName(type);
        var lastName = _.capitalize(this.WordSimple());
        var fullName = firstName + " " + lastName;
        return fullName + " (" + type + ")";
    }

    // Check: noLiquidAfterCoda
    CheckLiquid(word) {
        // Check if non-empty coda is followed by liquid onset
        for (var i = 0; i < word.length; i++) {
            if (i != word.length - 1 && word[i].coda.type != '' && word[i + 1].onset.type == 'liquids') {
                // Generate a syllable with non-liquid onset
                while (true) {
                    var syl = this.Syllable();
                    if (syl.onset.type != 'liquids') {
                        word[i + 1] = syl;
                        break;
                    }
                }
            }
        }
        return word;
    }
    // Check: noGlideAfterCoda
    CheckGlide(word) {
        // Check if non-empty coda is followed by liquid onset
        for (var i = 0; i < word.length; i++) {
            if (i != word.length - 1 && word[i].coda.type != '' && word[i + 1].onset.type == 'glides') {
                // Generate a syllable with non-liquid onset
                while (true) {
                    var syl = this.Syllable();
                    if (syl.onset.type != 'glides') {
                        word[i + 1] = syl;
                        break;
                    }
                }
            }
        }
        return word;
    }

    // Check: noDoubleNucleus
    CheckDoubleNucleus(word, callback) {
        // Check if empty coda is followed by empty onset
        for (var i = 0; i < word.length; i++) {
            if (i != word.length - 1 && word[i].coda.type == '' && word[i + 1].onset.type == '') {
                // Generate a syllable with non-empty onset
                while (true) {
                    var syl = this.Syllable();
                    if (syl.onset.type != '') {
                        word[i + 1] = syl;
                        break;
                    }
                }
            }
        }
        return word;
    }

}

module.exports = Language;
