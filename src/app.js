import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

import http from 'http';
import config from 'config';
import api from './routes';
import swagger from 'swagger-express';
import mongoose from 'mongoose';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {console.log('Connected to mongodb server'); });
const mongoURI = `mongodb:\/\/${config.mongo.host}:${config.mongo.port}\/${config.mongo.db}`;
mongoose.connect(mongoURI);

app.use('/v1', api);

app.use(swagger.init(app, {
  apiVersion: '0.1',
  swaggerVersion: '1.0',
  swaggerURL: '/docs',
  swaggerJSON: '/api-docs.json',
  swaggerUI: './public/swagger/',
  basePath: 'http://localhost:3000',
  apis: [
    './routes/users.js',
    './routes/guiders.js'
  ],
  middleware: function(req, res){}
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', config.server.port);
const server = http.createServer(app);

server.listen(app.get('port'));

module.exports = app;
