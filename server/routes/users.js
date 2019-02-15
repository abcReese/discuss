const router = require('koa-router')()
const auth = require('../model/auth');
const users = require('../model/users');
const mongoose = require('mongoose');

const multer = require('koa-multer');//加载koa-multer模块

const Schema=mongoose.Schema;
router.prefix('/users')

router.get('/getCode',async function(ctx,next){
  let email=ctx.query.email;
  let code= await auth.getCode(email);
  let json={status: 'success'};
  if(code===null){
    let authCode='';
    for(var i=0;i<4;i++){
    	authCode+=Math.floor(Math.random()*10)
    }
    console.log(authCode);
    auth.setCode(email,authCode);
  }else{
    json.status='exist';
  }
  ctx.set('Content-Type', 'application/json');
  ctx.body=JSON.stringify(json);
})

router.post('/signin', async function (ctx, next) {
  ctx.set('Content-Type', 'application/json');
  let user=ctx.request.body;
  console.log(user);
  //获取验证码，若与数据库的验证码不符，则不允许注册。
  let authCode=await auth.getCode(user.email);
  console.log(authCode);
  if(authCode!==user.code){
    ctx.body=JSON.stringify({status:'codeWorong'});
  }else{
    let status=await users.register(user);
    let json={};
    if(status){
      json.status='success';
    }else{
      json.status='exist';
    }
    ctx.body=JSON.stringify(json);
  }
})

router.post('/login', async (ctx,next)=>{
  let user=ctx.request.body;
  let json={};
  json.status=await users.login(user);
  //send为挂载到ctx上的一个中间件；
  ctx.send(json);
})

var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({ storage: storage });

router.post('/uploadImg', upload.single('file'),async (ctx,next)=>{

  ctx.body = {
    filename: ctx.req.file.filename//返回文件名
  }
})

module.exports = router
