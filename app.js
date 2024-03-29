const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const breakdownsRouter = require('./routes/breakdowns');
const roomsRouter = require('./routes/rooms');
const blocksRouter = require('./routes/blocks');
const severitiesRouter = require('./routes/severities');
const reasonsRouter = require('./routes/reason');

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
app.use('/blocks', blocksRouter);
app.use('/severities', severitiesRouter);
app.use('/reasons', reasonsRouter);

app.listen(8089);


module.exports = app;
