has_secure_password = require('../user_crypto').has_secure_password
check_email = require('../user_crypto').check_email
db = require '../config/db'
config = require('../config/global')

exports.sessions = {
    signin: (req,res) ->
      console.log req.session.user_id
      if req.session.user_id
        res.render 'dashboard'
      else
        res.render 'signin'
    signup: (req,res) ->
      console.log req.session.user_id
      if req.session.user_id
        res.render 'dashboard'
      else
        res.render 'signup'
    destroy: (req, res) ->
      req.session.destroy()
      res.redirect('/')
    new: (req, res) ->
      if check_email(req.body.email, null)
        db.q("select * from users where email = ? limit 1",[req.body.email]).then (user) ->
          if user and user.length > 0
            has_secure_password(req.body.password,config.secret).then (pwd) ->
              if user[0].password == pwd.hash_key
                req.session.regenerate (err) ->
                  req.session.user_id = user[0].id
                  res.redirect "/"
              else
                res.render "signin", errors: "Auth error !"
          else
            res.render "signin", errors: "Auth error !"


}
