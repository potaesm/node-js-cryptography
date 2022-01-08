// https://github.com/lorenbrichter/Words
const fs = require('fs-extra');
class Caesar {
    static letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // https://pi.math.cornell.edu/~mec/2003-2004/cryptography/subs/frequencies.html
    static frequentLetters = 'ETAOINSRHDLUCMFYWGPBVKXQJZ';
    static encrypt(plaintext = '', key = 0) {
        let ciphertext = '';
        if (!plaintext || typeof key !== 'number') return ciphertext;
        const letters = this.letters;
        for (let i = 0; i < plaintext.length; i++) {
            let char = plaintext[i].toUpperCase();
            if (` ${letters}`.includes(char)) {
                if (!!char.trim()) {
                    const newIndex = (letters.indexOf(char) + key) % 26;
                    char = letters[newIndex];
                }
                ciphertext += char;
            }
        }
        return ciphertext;
    }
    static decrypt(ciphertext = '', key = 0) {
        let plaintext = '';
        if (!ciphertext || typeof key !== 'number') return plaintext;
        const letters = this.letters;
        for (let i = 0; i < ciphertext.length; i++) {
            let char = ciphertext[i].toUpperCase();
            if (` ${letters}`.includes(char)) {
                if (!!char.trim()) {
                    let newIndex = (letters.indexOf(char) - key) % 26;
                    newIndex = newIndex < 0 ? 26 + newIndex : newIndex;
                    char = letters[newIndex];
                }
                plaintext += char;
            }
        }
        return plaintext;
    }
    static async crack(ciphertext = '') {
        const possiblePlaintexts = [];
        const charCounter = {};
        /** Frequency Analysis */
        for (let i = 0; i < ciphertext.length; i++) {
            const char = ciphertext[i].toUpperCase();
            if (this.letters.includes(char)) {
                if (!charCounter.hasOwnProperty(char)) {
                    charCounter[char] = 1;
                } else {
                    charCounter[char] = charCounter[char] + 1;
                }
            }
        }
        const cipherFrequentLetters = Object.keys(charCounter).sort((a, b) => b - a);
        for (let j = 0; j < this.frequentLetters.length; j++) {
            let key = this.letters.indexOf(cipherFrequentLetters[0]) - this.letters.indexOf(this.frequentLetters[j]);
            key = key < 0 ? 26 + key : key;
            const decryptedObject = { key, plaintext: this.decrypt(ciphertext, key) };
            const isEnglish = await this.isEnglish(decryptedObject.plaintext);
            if (isEnglish) return [decryptedObject];
            possiblePlaintexts.push(decryptedObject);
        }
        return possiblePlaintexts;
    }
    static async isEnglish(text = '', minimumConfident = 50) {
        const enTxt = await fs.readFile('en.txt', 'utf-8');
        const enArray = enTxt.toString().split('\n');
        const lowerCaseText = text.toLowerCase().split(' ').filter(_ => !!_);
        let counter = 0;
        for (let i = 0; i < lowerCaseText.length; i++) {
            if (enArray.includes(lowerCaseText[i])) counter++;
        }
        return counter / lowerCaseText.length * 100 > minimumConfident;
    }
}

module.exports = Caesar;
