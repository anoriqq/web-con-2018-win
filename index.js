'use strict';

// パッケージの読み込み
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('app:server');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// モデルの読み込み

// モデルのリレーション設定

// ポートの設定
const port = process.env.PORT || '8000';
app.set('port', port);

// ビューエンジンの設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ミドルウェアの設定
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ルート設定
app.get('/', (req, res, next)=>{
  res.render('index', {title: 'ホームページ'});
});

// 404ハンドラー
app.use((req, res, next)=>{
  next(createError(404));
});

// エラーハンドラー
app.use((err, req, res, next)=>{
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// ポート待機
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// socket.ioイベント
io.on('connection', (socket)=>{
  socket.on('chat message', (msg)=>{
    io.emit('chat message', msg);
  });
});

/**
 * HTTPサーバーエラーハンドラー
 * @param {string} error エラー
 */
function onError(error){
  if(error.syscall !== 'listen'){
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port '+ port;
  switch(error.code){
    case 'EACCES':
      console.error(bind + ' ');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + 'is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * HTTPサーバーリスナーハンドラー
 */
function onListening(){
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
