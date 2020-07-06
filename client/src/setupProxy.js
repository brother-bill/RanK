const { createProxyMiddleware } = require("http-proxy-middleware");
// If anyone is trying to access /auth/google on client side here, forward it to localhost:5000
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
