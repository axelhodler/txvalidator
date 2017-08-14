const {json} = require('micro')
const EthereumTx = require('ethereumjs-tx')

module.exports = async (req, res) => {
  const transactionPayload = await json(req)
  var stringifiedTxPayload = JSON.stringify(transactionPayload)
  var tx = new EthereumTx(JSON.parse(stringifiedTxPayload))
  if (tx.verifySignature()) {
    res.end(stringifiedTxPayload)
  } else {
    throw new Error("Tx invalid")
  }
}
