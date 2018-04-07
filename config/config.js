




module.exports = {
    server_port : 3000,
    route_info:[
        {path : "/", type : "get", file : "./user", method : "index"},
        {path : "/main", type : "get", file : "./main", method : "main_get"},
        {path : "/login", type:"get", file : "./user", method : "login_get"},
        {path : "/logout", type:"post", file : "./user", method : "logout"},

        {path : "/chat", type : "get", file : "./chat", method : "chat"}


        /*
        {path : "/login", type:"post", file : "./user", method : "login_post"},
        {path : "/signup", type:"get", file : "./user", method : "signup_get"},
        {path : "/signup", type:"post", file : "./user", method : "signup_post"},
        
         */
    ]
};