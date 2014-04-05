exports.index = function(req, res){
    if (req.session.user_id) {
        res.render('dashboard',{auth:true});
    }else{
        res.render('signin');
    }

};
