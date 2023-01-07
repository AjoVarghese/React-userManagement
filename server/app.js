var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const {v4:uuidv4} = require('uuid')
const bodyParser = require('body-parser')
const cors = require('cors');

const cloudinary=require("cloudinary").v2

var fs = require('fs')

const indexRouter = require('./routes/admin');
const usersRouter = require('./routes/users');

var app = express();


// database
const connection = require('./config/connection')



//connection
connection.connect((err)=>{
  if(err) throw err
  else{
    console.log('database connected');
  }
})



// session
app.use(session({
  secret : uuidv4(),
  resave:false,
  saveUninitialized:true,
  cookie: { maxAge: 6000000000 },
}))

// const corsOptions ={
  // origin:'http://localhost:3001', 
  // credentials:true,            //access-control-allow-credentials:true
  // optionSuccessStatus:200,
//   'Access-Control-Allow-Origin': 'http://localhost:3001'
// }
// app.use(cors(corsOptions));

app.use(cors());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('views', [__dirname + '/views/', __dirname + '/views/'])
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// file object
// app.use(fileUpload())

// cache

app.use(function(req, res, next) {
  if (!req.user) {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
  }
  next();
});


app.use('/', usersRouter);
app.use('/admin', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
 
  res.render('error');
});

// port

const PORT = process.env.PORT||3001

app.listen(PORT,()=>{
  console.log(`server is running on http://localhost:${PORT}`);
})

module.exports = app;
