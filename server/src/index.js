const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const channelsRouter = require('./routes/channels');
const suggestionsRouter = require('./routes/suggestions');
const fs = require('fs')
const http = require('http');
const https = require('https');
const cors = require('cors');
const path = require('path')
var db = require('./db.js')
const { isAnonymousUser } = require('../../shared/user-util')

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('process.env.TWITCH_EXTENSION_SECRET:', process.env.TWITCH_EXTENSION_SECRET);

app.use(cors({ credentials: true, origin: true }))
let server;
let port;

//uses nginx reverse proxy in production
if (process.env.NODE_ENV === 'production'){
    server = http.createServer(app);
    port = 8082
    app.use(express.static(path.resolve(__dirname, '../public')));
}else{
    server = https
        .createServer(
        {   //self signed certs
            key: fs.readFileSync(path.resolve(__dirname, '../ssl/key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, '../ssl/cert.pem')),
        },
        app
        )
    port = 443
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

authRouter(app);

app.post('/*',blockAnonymousUsers)
app.put('/*',blockAnonymousUsers)
app.delete('/*',blockAnonymousUsers)

//anonymous users can ONLY get info. no changing
function blockAnonymousUsers(req,res,next){
	if(isAnonymousUser(req.user)) 
		res.status(403).send('You must login.')
	else 
		next()
}

channelsRouter(app);
suggestionsRouter(app)

db.connect().then(()=>{
    
    server.listen(port, () => {
        console.log(`Find the server at: https://localhost:${port}/`); // eslint-disable-line no-console
    });

})
