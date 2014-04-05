crypto = require 'crypto'
db = require './config/db'
Q = require 'q'

user_crypto = {

has_secure_password: (pwd, salt = crypto.randomBytes(128).toString("base64")) ->
  deffered = Q.defer()
  if pwd
    crypto.pbkdf2 pwd, salt, 2000, 128, (err, hash_pwd) ->
      key = new Buffer(hash_pwd).toString 'hex'
      deffered.resolve({hash_key:key})
      return
  else
    deffered.reject new Error "Password error !"
  return deffered.promise

unique_email: (email) ->
  deffered = Q.defer()
  db.q("select * from users where email like ?", [email]).then (user) ->
    if user and user.length > 0
      deffered.resolve false
    else deffered.resolve "YES"
    ,(err) ->
      deffered.reject new Error err
  return deffered.promise

check_email: (email, email_confirm=email) ->
  re = /^\w+@{1}\w+\.[a-z]{2,3}$/
  console.log email, email_confirm
  if email == email_confirm and re.test email
    return true
  return false

}

module.exports = user_crypto
