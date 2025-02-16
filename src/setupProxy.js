const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.rajaongkir.com/starter',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};