const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose');
const dbConnection=mongoose.connection;
//解决跨域问题
const cors = require('koa2-cors');

const send = require('./send')
module.exports = (app) => {

  app.use(cors({
      origin: function (ctx) {
          if (ctx.url === '/test') {
              return "*"; // 允许来自所有域名请求
          }
          return 'http://localhost:9080'; // 这样就能只允许 http://localhost:9080 这个域名的请求了
      },
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }))

  app.use(bodyparser({
    enableTypes:['json','form', 'text']
  }))
  app.use(json())
  app.use(logger())
  app.use(require('koa-static')(__dirname + '/public'))
  // app.use(koaBody({
  //   enableTypes:['form' ]
  // }));
  app.use(views(__dirname + '/views', {
    extension: 'pug'
  }))

  // logger
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })


  app.use(send())
}
