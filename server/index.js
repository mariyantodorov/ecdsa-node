const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const helper = require("./helper");

app.use(cors());
app.use(express.json());

//address => balance
const balances = {
  "39D593B807F7C9032BB68832C309F38F09DC73EB": 100,
  "ED95ABD05D1E4556C126B6A8F0B212844F013829": 50,
  "0081EFBFFEABB8425389C7D0E54E51D8621304C6": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, signature } = req.body;
  const { recipient, amount } = message;

  const publicKey = helper.retrievePublicKey(message, signature);
  const sender = helper.publicKeyToAddress(publicKey);

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
