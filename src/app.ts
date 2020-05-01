import express, { json, urlencoded, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import homeRouter from './routes/home';
import settings from './utils/config/settings';

const app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.set('port', settings.port);
app.set('env', settings.nodeEnv)

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', homeRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});
// error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if (err.errorCode) {
    res.status(err.errorCode.status || 500);
    res.json({ code: err.errorCode.code, message: err.message, status: err.errorCode.status })
  } else {
    res.status(err.status || 500);
    res.json({ message: err.message });
  }
});

export default app;
