const bcrypt = require('bcryptjs')

function hashing(password) {
  return bcrypt.hashSync(password, 8)
}

function compare(password, encryptPass) {
  return bcrypt.compareSync(password, encryptPass)
}

module.exports = { compare, hashing }