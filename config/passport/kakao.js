
var kakaoStrategy = require('passport-kakao').Strategy

module.exports = function(app, passport) {
    return new kakaoStrategy({
        clientID: "a58b523f1bf601ac92f3e80babd1b916",
        callbackURL : "http://localhost:3000/oauth/kakao/callback"
    }, function(accessToken, refreshToken, profile, done){
        console.log('kakao of passport Called')

        console.log ('accessToken : ' + accessToken)
        console.dir(profile)


        var user = {username : profile.username, token : accessToken}

        return done(null, user)
    })
    


}