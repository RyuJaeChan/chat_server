var express = require('express')
,   http    = require('http')
,   path    = require('path')   //serve-static use에서 경로지정할때

var mysql = require('mysql')
,   passport = require('passport')
,   bodyParser = require('body-parser')
,   expressSession = require('express-session')
,   cookieParser = require('cookie-parser')

,   static  = require('serve-static')
,   socketio = require('socket.io')


var config = require('./config/config')
  
var app = express();

//Body Parser를 통해 x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}));
//Body parser를 통한 json 파싱
app.use(bodyParser.json()); 
//쿠키
app.use(cookieParser());
//Session 설정
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));
//static 파일 연결
app.use('/public', static(path.join(__dirname, 'public')));
//===== Passport 사용 설정 =====//
app.use(passport.initialize());
app.use(passport.session());
//passport 설정
var configPassport = require('./config/passport');
configPassport(app, passport);
//route 설정                                                                <<<<<<<<<---- 이게 passport 설정보다 밑에 있어야 세션저장이 된다..
var route_loader = require('./route/route_loader')
route_loader.init(app)
//db 설정
var db = mysql.createPool({     //데이터 베이스 연결 객체가 많이 만들어지는 것을 막고 한번 만든 연결을 다시 사요할 수있게
    connectionLimit : 10,           //커넥션 풀에서 만들 수 있는 최대 연결 개수
    host            : 'localhost',  //연결할 호스트 이름
    port            : 3306,         //데이터베이스가 사용하는 포트
    user            : 'root',       //데이터베이스 사용자 id
    password        : 'qwe123',     //비밀번호
    database        : 'test',       //데이터베이스 이름
    debug           : 'false'       //처리 과정을 로그로 남길것인지.
})
app.set('database', db)
//뷰 파일 위치 설정 및 엔진 설정
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')





app.set('port', config.server_port)
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Server start')

})

var io = socketio.listen(server);
console.log('ready for socketio request success')

io.sockets.on('connection', function(socket){
    console.log('connection info : ' + socket.request._peername)

    socket.remoteAddress = socket.request.connection._peername.address;
    socket.remotePort = socket.request.connection._peername.port;

    socket.on('message', function(message){
        console.log('message event occur')
        console.dir(message); 

        
        if(message.recepient == 'All'){
            console.log('type = all')
            io.sockets.emit('message', message)
        }
    })
})