const Caesar = require('./caesar');



(async function() {
    const caesarPlaintext = `The Caesar cipher is named after Julius Caesar, who, according to Suetonius, used it with a shift of three (A becoming D when encrypting, and D becoming A when decrypting) to protect messages of military significance. While Caesar's was the first recorded use of this scheme, other substitution ciphers are known to have been used earlier`;
    const caesarKey = 20;
    const caesarEncryptedCipher = Caesar.encrypt(caesarPlaintext, caesarKey);
    const caesarDecryptedPlaintext = Caesar.decrypt(caesarEncryptedCipher, caesarKey);
    const caesarCrackedPlaintexts = await Caesar.crack(caesarEncryptedCipher);
    console.log({
        caesarPlaintext,
        caesarKey,
        caesarEncryptedCipher,
        caesarDecryptedPlaintext,
        caesarCrackedPlaintexts
    });
})();
