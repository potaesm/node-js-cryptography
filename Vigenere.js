
class Vigenere {
    static letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    static encrypt(plaintext = '', key = '') {
        let ciphertext = '';
        if (!plaintext || typeof key !== 'string') return ciphertext;
        const letters = this.letters;
        let keyCharIndex = 0;
        for (let i = 0; i < plaintext.length; i++) {
            let char = plaintext[i].toUpperCase();
            if (` ${letters}`.includes(char)) {
                if (!!char.trim()) {
                    const keyChar = key[keyCharIndex % key.length].toUpperCase();
                    const ciphertextCharIndex = (letters.indexOf(char) + letters.indexOf(keyChar)) % 26;
                    char = letters[ciphertextCharIndex];
                    keyCharIndex++;
                }
                ciphertext += char;
            }
        }
        return ciphertext;
    }
    static decrypt(ciphertext = '', key = 0) {
        let plaintext = '';
        if (!ciphertext || typeof key !== 'string') return plaintext;
        const letters = this.letters;
        let keyCharIndex = 0;
        for (let i = 0; i < ciphertext.length; i++) {
            let char = ciphertext[i].toUpperCase();
            if (` ${letters}`.includes(char)) {
                if (!!char.trim()) {
                    const keyChar = key[keyCharIndex % key.length].toUpperCase();
                    let plaintextCharIndex = (letters.indexOf(char) - letters.indexOf(keyChar)) % 26;
                    plaintextCharIndex = plaintextCharIndex < 0 ? 26 + plaintextCharIndex : plaintextCharIndex;
                    char = letters[plaintextCharIndex];
                    keyCharIndex++;
                }
                plaintext += char;
            }
        }
        return plaintext;
    }
}

module.exports = Vigenere;
