const Caesar = require('./caesar');
const Vigenere = require('./Vigenere');

const plaintext = `The Caesar cipher is named after Julius Caesar, who, according to Suetonius, used it with a shift of three (A becoming D when encrypting, and D becoming A when decrypting) to protect messages of military significance. While Caesar's was the first recorded use of this scheme, other substitution ciphers are known to have been used earlier`;

(async function() {
    /** Caesar Cipher */
    // const caesarKey = 20;
    // const caesarEncryptedCipher = Caesar.encrypt(plaintext, caesarKey);
    // const caesarDecryptedPlaintext = Caesar.decrypt(caesarEncryptedCipher, caesarKey);
    // const caesarCrackedPlaintexts = await Caesar.crack(caesarEncryptedCipher);
    // console.log({
    //     plaintext,
    //     caesarKey,
    //     caesarEncryptedCipher,
    //     caesarDecryptedPlaintext,
    //     caesarCrackedPlaintexts
    // });
    /** Vigenere Cipher */
    const vigenereKey = 'SUTHINAN';
    const vigenereEncryptedCipher = Vigenere.encrypt(plaintext, vigenereKey);
    const vigenereDecryptedPlaintext = Vigenere.decrypt(vigenereEncryptedCipher, vigenereKey);
    console.log({
        plaintext,
        vigenereKey,
        vigenereEncryptedCipher,
        vigenereDecryptedPlaintext
    });
})();
