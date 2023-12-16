/*
  Utility script that can be used to generate new public
  and private keys, which can be used to create new
  addresses in the balances array of index.js.
 */
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")

const privateKey = secp.secp256k1.utils.randomPrivateKey();

const publicKey = secp.secp256k1.getPublicKey(privateKey);

console.log({privateKey: toHex(privateKey), publicKey: toHex(publicKey)});