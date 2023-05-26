const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04f4fb7ffa901a21af6e4049a0acaba9bcd9ac68de13782e8364e688ef404264341117610b92666b69a464c739cfa91a0dd9139eea9aaa920cb1df41feb126d8ac": 100,
  "04c29912fca9ae0283a5c1ca0d686015ac4c5c0afd6f9c1ce2221c1c70860018cec277f8c6246aeb5594834d6f428b096d8038cd97b818b9035bcace19f39bbd19": 50,
  "045533a711f740ec5cdec678d6ead01185cfd5d67c76179606e3c267d8e52a273dd52ebff7784ee198ced4c5bd5de5cb10ba918d857313dcc21d7484a8a55cd123": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  console;
  console.log(req.body);
  const { sender, recipient, amount, signature, recovery } = req.body;

  if (!signature)
    res.status(404).send({ message: "signature was not provide" });

  try {
    const bytes = utf8ToBytes(JSON.stringify({ sender, recipient, amount }));
    const hash = keccak256(bytes);

    const sig = new Uint8Array(signature);

    const publicKey = await secp.recoverPublicKey(hash, sig, recovery);

    if (toHex(publicKey) !== sender) {
      res.status(400).send({ message: "signature no is valid" });
    }

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      console.log("hi");
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      console.log("hi else");
      res.send({ balance: balances[sender] });
    }
  } catch (error) {
    console.log("Error----", error.message);
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

/* private key: d4cf12db73eb133df4235821968ca3df51fc2a1692f5f071547333d55a6278db
public key:  04f4fb7ffa901a21af6e4049a0acaba9bcd9ac68de13782e8364e688ef404264341117610b92666b69a464c739cfa91a0dd9139eea9aaa920cb1df41feb126d8ac 

private key: 68177c52f05bf1c25fccccaaf36ded0a79c970ea0742b7b230260f89a1c42481
public key:  04c29912fca9ae0283a5c1ca0d686015ac4c5c0afd6f9c1ce2221c1c70860018cec277f8c6246aeb5594834d6f428b096d8038cd97b818b9035bcace19f39bbd19 

private key: 0494956c2296d1302c8147841d6da256b507cd1191fc6acf42b888f2d22cf3a9
public key:  045533a711f740ec5cdec678d6ead01185cfd5d67c76179606e3c267d8e52a273dd52ebff7784ee198ced4c5bd5de5cb10ba918d857313dcc21d7484a8a55cd123 
 */
