db = require  '../config/db'
crypto = require 'crypto'
Q = require 'q'
deffered = Q.defer()
global = require '../config/global'

has_secure_password = (pwd, salt = crypto.randomBytes(128).toString("base64")) ->
  if pwd
    crypto.pbkdf2 pwd, salt, 2000, 256, (err, hash_pwd) ->
      deffered.resolve(hash_pwd)
  else
    deffered.reject new Error "Password error !"
  return deffered.promise

exports.user = {
  create: (req,res) ->
    has_secure_password(req.body.password, null).then (pwd) ->
      db.q("SELECT * FROM users").then (user)->
        console.log "Result", user
      ,(error) ->
        flash.errors["password"] = error
        console.log flash.errors
    ,(error) ->
      console.log "Errors:", global.flash
      global.flash.errors.password = error
      console.log "Errors:", global.flash
      return
}