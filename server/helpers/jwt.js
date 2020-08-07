const jwt = require('jsonwebtoken')

function encode(params) {
  return jwt.sign(params, process.env.SECRET)
}
function decode(token) {
  return jwt.verify(token, process.env.SECRET)
}

module.exports = { encode, decode }