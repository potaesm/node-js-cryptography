
class Vigenere {
    static letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    static encrypt(plaintext = '', key = '') {
        let ciphertext = '';
        if (!plaintext || typeof key !== 'string') return ciphertext;
        const letters = this.letters;
        let keyCharNumber = 0;
        for (let i = 0; i < plaintext.length; i++) {
            let char = plaintext[i].toUpperCase();
            if (` ${letters}`.includes(char)) {
                if (!!char.trim()) {
                    const keyChar = key[keyCharNumber % key.length].toUpperCase();
                    const newIndex = (letters.indexOf(char) + letters.indexOf(keyChar)) % 26;
                    char = letters[newIndex];
                    keyCharNumber++;
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
        let keyCharNumber = 0;
        for (let i = 0; i < ciphertext.length; i++) {
            let char = ciphertext[i].toUpperCase();
            if (` ${letters}`.includes(char)) {
                if (!!char.trim()) {
                    const keyChar = key[keyCharNumber % key.length].toUpperCase();
                    let newIndex = (letters.indexOf(char) - letters.indexOf(keyChar)) % 26;
                    newIndex = newIndex < 0 ? 26 + newIndex : newIndex;
                    char = letters[newIndex];
                    keyCharNumber++;
                }
                plaintext += char;
            }
        }
        return plaintext;
    }
}

module.exports = Vigenere;
