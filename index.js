const {json} = require('micro')

module.exports = async (req, res) => {
  const post = await json(req)
  res.end(JSON.stringify(post))
}
