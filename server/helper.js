
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, hexToBytes, utf8ToBytes } = require("ethereum-cryptography/utils");

const publicKeyToAddress = (publicKey) => {
    const publicKeyHash = keccak256(publicKey.slice(1));
    return toHex(publicKeyHash.slice(-20)).toUpperCase();
}

const retrievePublicKey = (message, signature) => {
    const msgHash = keccak256(Uint8Array.from(message));
    const fullSignatureBytes = hexToBytes(signature);
    const recoveryBit = fullSignatureBytes[0];
    const signatureBytes = fullSignatureBytes.slice(1);

    const publicKey = secp.recoverPublicKey(msgHash, signatureBytes, recoveryBit);
    return publicKey;
}

module.exports = {
    retrievePublicKey,
    publicKeyToAddress
}