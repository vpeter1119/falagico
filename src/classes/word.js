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