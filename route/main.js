

var main_get = function(req, res){
    console.log('>> /main (get)')
    /*
    if(req.isAuthenticated()){
        console.log('인증됨')
    }
    else{
        console.log('인증안됨')
    }
    //console.log('req.user id : ' + req.user.id)
    console.log('req.user pw : ' + req.user.token)
    console.log('sesson : ' + req.session)
    res.render('main', { id : "test id ", token : req.user.token} )
     */
    res.render('main')
}

module.exports.main_get = main_get;