const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/lease', { target: 'http://10.8.30.58:9090/',changeOrigin: true,
        pathRewrite: {
            '^/lease': '/lease-gateway-web'
        } }));
};
