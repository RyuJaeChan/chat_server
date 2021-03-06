



var local_login = require('./passport/local_login')
var kakao = require('./passport/kakao')

module.exports = function (app, passport){
    console.log('config/passport.js Called')

    passport.serializeUser(function(user, done){
        console.log('serializeUser() Called')
        console.dir(user)

        done(null, user);
    })

    passport.deserializeUser(function(user, done){
        console.log('deserializeUser() Called')
        console.dir(user)

        done(null, user)
    })

    passport.use('local-login', local_login)
    passport.use('kakao', kakao(app, passport))

    app.post('/login',
        passport.authenticate('local-login', {
            successRedirect : '/main',
            failureRedirect : '/chat'
        })
    )
    app.get('/oauth/kakao',
        passport.authenticate('kakao')
    )

    app.get('/oauth/kakao/callback',
        passport.authenticate('kakao', {
            successRedirect : '/main',
            failureRedirect : '/login'
        })
    )

    //app.post('/login/kakao',)



    console.log('2 type of passport Initialized...')
}