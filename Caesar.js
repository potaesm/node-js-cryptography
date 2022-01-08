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
    static crackWithFrequencyAnalysis(ciphertext = '') {
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
        for (let j = 0; j < cipherFrequentLetters.length; j++) {
            const cipherLetter = cipherFrequentLetters[j];
            let key = this.letters.indexOf(cipherLetter) - this.letters.indexOf(this.frequentLetters[0]);
            key = key < 0 ? 26 + key : key;
            possiblePlaintexts.push(this.decrypt(ciphertext, key));
        }
        return possiblePlaintexts;
    }
}

module.exports = Caesar;
