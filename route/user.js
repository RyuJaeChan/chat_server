





var index = function(req, res){
    console.log('index page');
    res.render('index')
}

var login_get = function(req, res){
    console.log('>> login (get)')
    res.render('login')
}

var logout = function(req, res){
    console.log('>> logout(post)')
    req.logout();
    //req.session.destroy()
    //res.redirect('/')

    //POST
    var unirest = require('unirest');

    console.log("re token : " + req.body.token)
    

    var atoken = 'bearer ' + req.body.token;
    console.log("atoken : " + atoken)

    unirest.post('https://kapi.kakao.com/v1/user/logout')
    .header('Authorization', atoken)
    .send()
    .end(function (response) {  
        console.log('res : ')
        console.log(response.body);
        res.redirect('/')
    });
    
}

module.exports.index = index;
module.exports.login_get = login_get;
module.exports.logout = logout