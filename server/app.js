const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose');
const dbConnection=mongoose.connection;
//解决跨域问题
const cors = require('koa2-cors');



//引入中间件
const middleware=require('./middleware');
middleware(app)

const index = require('./routes/index')
const users = require('./routes/users')

app.use(require('koa-static')(__dirname + '/public'))

//连接mongodb
mongoose.connect('mongodb://localhost:27017/discuss',{
  useNewUrlParser: true
});

dbConnection.on('error', (err) => {
  console.log('数据库连接错误')
});

dbConnection.once('open', () => {
  console.log('Database: connect success');
});

//socket.io连接

// error handler
onerror(app)

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


module.exports = app
