const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const breakdownsRouter = require('./routes/breakdowns');
const roomsRouter = require('./routes/rooms');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/breakdowns', breakdownsRouter);
app.use('/rooms', roomsRouter);


module.exports = app;
