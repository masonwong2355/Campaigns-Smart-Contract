const { createServer } = require('http');
const next = require('next');

const app = next({
    dev: process,
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    createServer(handler).listen(3000, (err) => {
        if (err) throw err;
        console.log('Ready on loaclhost:3000');
    });
});
