import http from 'http'
import path from 'path'

import Debug from 'debug'
import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import json from 'koa-json'
import logger from 'koa-logger'
import onerror from 'koa-onerror'
import views from 'koa-react-view'
import statics from 'koa-static'

import api from './routes/api'
import html from './routes/html'

const app = new Koa()
const debug = Debug('demo:server')

// error handler
onerror(app);

// global middlewares

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json());
app.use(logger());
app.use(statics(__dirname + '/public'));
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

views(app, {
  views: path.resolve(__dirname, 'views')
});

// routes definition
app.use(api.routes(), api.allowedMethods());
app.use(html.routes(), html.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});



/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
