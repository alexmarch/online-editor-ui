crypto = require 'crypto'

config = {
    secret: crypto.randomBytes(128).toString "base64"
    alers: {}
    notify: {}
}

module.exports = config
