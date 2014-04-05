helpers = (app) ->
  (req, res, next) ->
    app.locals.is_auth_user = () -> true
#    if req.session.user_id
#      app.locals.is_auth_user = true
#    else app.locals.is_auth_user = false
    next()
    return
module.exports = helpers
