db = require '../config/db'
has_secure_password = require('../user_crypto').has_secure_password
unique_email = require('../user_crypto').unique_email
check_email = require('../user_crypto').check_email
config = require('../config/global')

exports.user = {
  create: (req, res) ->
    if check_email req.body.email, req.body.email_confirm
      unique_email(req.body.email).then (unique) ->
        if unique
          has_secure_password(req.body.password, config.secret).then (pwd) ->
            db.q("INSERT INTO users(email,password) VALUES(?,?)",[req.body.email, pwd.hash_key]).then (user) ->
              req.session.regenerate (err) ->
                req.session.user_id = user.insertId
                console.log "Start session:", req.session.user_id
                res.render "dashboard", auth:true
        else
          res.render "signup", erros: "This email already exist !"
    else
      res.render "signup", errors: "Error email address !"
}
