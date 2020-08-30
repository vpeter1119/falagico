// Modules
const _ = require('lodash');
const random = require('../util/random.js');

class Language {

    // Constructor
    constructor(
        langOptions
    ) {
        //this.options = langOptions;
        this.phonology = langOptions.phonology;
        this.names = langOptions.names;
        this.name = langOptions.name;
        this.id = langOptions.id;
        this.desc = langOptions.desc;
    }

    // Getters

    // Setters

    /* METHODS */


    // Advanced syllable generation
    Syllable() {
        if (!this.phonology.inventoryAdv) {
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
        var nucleusType = random.pick(this.phonology.phonotacticsAdv.nuclei);
        var nucleus = random.pick(this.phonology.inventoryAdv[nucleusType[0]][nucleusType[1]]);
        syllable.nucleus = {
            type: nucleusType[1] || '',
            text: nucleus
        };
        // Generate onset
        var onsetType = random.pick(this.phonology.phonotacticsAdv.onsets);
        var onset = onsetType.length ? random.pick(this.phonology.inventoryAdv[onsetType[0]][onsetType[1]]) : "";
        syllable.onset = {
            type: onsetType[1] || '',
            text: onset
        };
        // Generate coda
        var codaType = random.pick(this.phonology.phonotacticsAdv.codas);
        var coda = codaType.length ? random.pick(this.phonology.inventoryAdv[codaType[0]][codaType[1]]) : "";
        syllable.coda = {
            type: codaType[1] || '',
            text: coda
        };
        return syllable;
    }

    // Advanced word generation
    Word(length = random.int(2) + 1) {
        if (!this.phonology.inventoryAdv) {
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
            //var sylProcessed = (syl.onset.text + syl.nucleus.text + syl.coda.text);
            //wordProcessed = wordProcessed.concat(sylProcessed);
        }
        // Check word for constraints
        if (this.phonology.constraints.noLiquidAfterCoda) {
            word = this.CheckLiquid(word);
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

    // Simple syllable generation
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

/* EXPORT */

module.exports = Language;
