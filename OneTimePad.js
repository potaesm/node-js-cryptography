class OneTimePad {
    static letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    static randomSequence(plaintext = '') {
        const randomArray = [];
        const letters = this.letters;
        for (let i = 0; i < plaintext.length; i++) {
            const char = plaintext[i].toUpperCase();
            if (` ${letters}`.includes(char) && !!char.trim()) {
                randomArray.push(Math.floor(Math.random() * (letters.length - 1)));
            }
        }
        return randomArray;
    }
    static encrypt(plaintext = '', key = []) {
        let ciphertext = '';
        if (!plaintext || !Array.isArray(key)) return ciphertext;
        const letters = this.letters;
        let keyIndex = 0;
        for (let i = 0; i < plaintext.length; i++) {
            let char = plaintext[i].toUpperCase();
            if (` ${letters}`.includes(char)) {
                if (!!char.trim()) {
                    const ciphertextCharIndex = (letters.indexOf(char) + key[keyIndex]) % 26;
                    char = letters[ciphertextCharIndex];
                    keyIndex++;
                }
                ciphertext += char;
            }
        }
        return ciphertext;
    }
    static decrypt(ciphertext = '', key = []) {
        let plaintext = '';
        if (!ciphertext || !Array.isArray(key)) return plaintext;
        const letters = this.letters;
        let keyIndex = 0;
        for (let i = 0; i < ciphertext.length; i++) {
            let char = ciphertext[i].toUpperCase();
            if (` ${letters}`.includes(char)) {
                if (!!char.trim()) {
                    let plaintextCharIndex = (letters.indexOf(char) - key[keyIndex]) % 26;
                    plaintextCharIndex = plaintextCharIndex < 0 ? 26 + plaintextCharIndex : plaintextCharIndex;
                    char = letters[plaintextCharIndex];
                    keyIndex++;
                }
                plaintext += char;
            }
        }
        return plaintext;
    }
}

module.exports = OneTimePad;
