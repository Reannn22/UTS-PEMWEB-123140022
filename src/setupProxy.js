const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.resend.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
      onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS';
      },
      onError: function(err, req, res) {
        console.error('Proxy Error:', err);
      }
    })
  );
};
