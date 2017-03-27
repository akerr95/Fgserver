const logger = require("koa-logger");
const router = require("koa-joi-router");
const Koa = require('koa');
const app = new Koa();
const Joi = router.Joi;
const public = router();
const VERIFY_TOKEN = "mushroom_to_grow";

public.get('/', async(ctx) => {
    ctx.body = "Hello Router";
});
public.get('/fbwebhook', async(ctx) => {
    if (ctx.query['hub.mode'] === 'subscribe' &&
        ctx.query['hub.verify_token'] === VERIFY_TOKEN) {
        console.log("Validating webhook");
        ctx.status = 200;
        ctx.message = ctx.query['hub.challenge'];
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        ctx.status = 404;

    }
    return;
});
app.use(logger());
app.use(public.middleware());

app.listen(3000);