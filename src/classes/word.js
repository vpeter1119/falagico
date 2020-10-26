// Modules
const Syllable = require('./syllable');
const random = require('../util/random');
const defaultOptions = require('./default');

/**
 * @classdesc Represents one word, consisting of one or more Syllables.
 * */
class Word {
    /**
     * 
     * @param {langOptions} langOptions Language configuration options.
     * @param {number} length Word length in syllables.
     * @param {Syllable[]} syllables One or more Syllables.
     */
    constructor(
        langOptions = defaultOptions,
        length,
        syllables = []
    )
    {
        this.options = langOptions;
        if (syllables.length) {
            /**
             * @name syllables
             * @memberof Word
             * @type {Syllable[]}
             * */
            this.syllables = syllables;
            /**
             * @name length
             * @memberof Word
             * @type {number}
             * */
            this.length = syllables.length;
        } else {
            this.syllables = [];
            this.length = (length && length <= this.options.phonology.other.maxWordLength) ? length : random.int(this.options.phonology.other.maxWordLength) + 1;
            for (var i = 0; i < this.length; i++) {
                this.syllables.push(new Syllable(this.options));
            }
        }
        // Resolve word-level constraints
        var constraints = this.options.phonology.constraints;
        //console.log('invalidCodaOnsetPairs = ', constraints.invalidCodaOnsetPairs ? 'on' : 'off')
        if (constraints.invalidCodaOnsetPairs) {
            for (var i = 1; i < this.syllables.length; i++) {
                var previous = this.syllables[i - 1];
                var current = this.syllables[i];
                //var next = this.syllables[i + 1];
                var onsetCodaPair = [previous.coda.type, current.onset.type];
                constraints.invalidCodaOnsetPairs.forEach(rule => {
                    var ruleCoda = rule[0];
                    if (ruleCoda[1] == 'NULL') ruleCoda = [];
                    var ruleOnset = rule[1];
                    if (ruleOnset[1] == 'NULL') ruleOnset = [];
                    if ((ruleCoda[1] == 'ANY' || ruleCoda[1] == onsetCodaPair[0][1]) && (ruleOnset[1] == 'ANY' || ruleOnset[1] == onsetCodaPair[1][1])) {
                        current.ChangeElementType('onset');
                        console.warn(`Enforcing constraint: ${rule} => ${current.onset.text}`);
                    }
                });
            }
        }
        // Resolve invalid doubles
        if (constraints.preventDouble) {
            for (var i = 1; i < this.syllables.length; i++) {
                var previous = this.syllables[i - 1];
                var current = this.syllables[i];
                //var next = this.syllables[i + 1];
                while ((previous.coda.text == current.onset.text) && constraints.preventDouble.includes(current.onset.text)) {
                    current.onset = current.GenerateOnset(current.onset.type);
                    //console.warn(`Enforcing constraint: preventDouble(${previous.coda.text} => ${current.coda.text})`);
                }
            }
        }
        // Resolve preset word initials
        var phonotactics = this.options.phonology.phonotactics;
        var first = this.syllables[0];
        var last = this.syllables[this.syllables.length - 1];
        if (phonotactics.wordInits && phonotactics.wordInits.length && !phonotactics.wordInits.includes(first.onset.text)) {
            first.onset.text = random.pick(phonotactics.wordInits);
            //console.warn(`Enforcing constraint: wordInit(${first.onset.text})`);
        } else if (constraints.preventInits && constraints.preventInits.length && constraints.preventInits.includes(first.onset.text)) {
            //console.warn(`Enforcing constraint: preventInit(${first.onset.text})`);
            first.onset.text = random.pick(this.options.phonology.inventory[first.onset.type[0]][first.onset.type[1]].filter(txt => { return (txt != first.onset.text && constraints.preventInits.includes(txt)); })) || phonotactics.fallbackInit || '';
        }
        if (phonotactics.wordFinals && phonotactics.wordFinals.length && !phonotactics.wordFinals.includes(last.coda.text)) {
            last.coda.text = random.pick(phonotactics.wordFinals);
            //console.warn(`Enforcing constraint: wordFinal(${last.coda.text})`);
        } else if (constraints.preventFinals && constraints.preventFinals.length && constraints.preventFinals.includes(last.coda.text)) {
            //console.warn(`Enforcing constraint: preventFinal(${last.coda.text})`);
            last.coda.text = random.pick(this.options.phonology.inventory[last.coda.type[0]][last.coda.type[1]].filter(txt => { return (txt != last.coda.text && constraints.preventFinals.includes(txt)); })) || phonotactics.fallbackFinal || '';
        }
    }

    toString() {
        var string = '';
        this.syllables.forEach(syl => {
            string = string.concat(syl.toString());
        });
        return string;
    }

    toArray() {
        var array = [];
        this.syllables.forEach(syl => {
            array.push(syl.toString());
        });
        return array;
    }
}

module.exports = Word;