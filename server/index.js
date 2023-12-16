const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const utils = require("ethereum-cryptography/utils");
const keccak = require('ethereum-cryptography/keccak');

app.use(cors());
app.use(express.json());

function hashMessage(message) {
  return keccak.keccak256(utils.utf8ToBytes(message));
}

function getAddress(publicKey) {
  let hash = keccak.keccak256(publicKey.slice(1));

  return hash.slice(-20);
}
/*
{
  privateKey: 'c1c7bda14b3e102f4d74085045a635366962bcc7650977c4d59e97ec58bb86db',
  publicKey: '02bc6148f1e1d11cb9ad897fffb5a5f1b5a2728f89a6f01244d1ca22ccfef7f6c6'
}
{
  privateKey: '1a827c0549785766f29b4cdd008a354e83c2e5b2dfeb0e9941815d74d77fcced',
  publicKey: '03580fedae343f810fc71ae0a3a103902d28b54e985c3d2bb29adeaaa9f22d481d'
}
{
  privateKey: 'bf387eaf8643b7e5a2488c7f4184c208fd4f328113f54a0acff83437bedeb893',
  publicKey: '02cd068122185b37ccd73e69cf5818efccd9b36bea6407700ce6edf1cdad396028'
}
 */
const balances = {
  "1244d1ca22ccfef7f6c6": 100,
  "2bb29adeaaa9f22d481d": 50,
  "700ce6edf1cdad396028": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { recipient, amount, sigHex } = req.body;

  let recoveredSignature = secp.secp256k1.Signature.fromCompact(sigHex.val);
  recoveredSignature = recoveredSignature.addRecoveryBit(sigHex.recovery);
  const senderPublicKey = recoveredSignature.recoverPublicKey(hashMessage('' + amount + recipient)).toRawBytes();

  const sender = utils.toHex(senderPublicKey).slice(-20);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
