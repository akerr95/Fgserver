const logger = require("koa-logger");
const router = require("koa-joi-router");
const Koa = require('koa');
const app = new Koa();
const Joi = router.Joi;
const public = router();

public.get('/', async(ctx) => {
    ctx.body = "Hello Router";
});
app.use(logger());
app.use(public.middleware());

app.listen(3000);