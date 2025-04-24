const p = {
  apiUrl: process.env.API_URL || "[https://api.example.com](https://api.example.com)",
  timeout: 3e4,
  version: "1.0.0"
}, e = {
  development: {
    apiUrl: "[https://dev-api.example.com](https://dev-api.example.com)",
    debug: !0
  },
  production: {
    apiUrl: "[https://api.example.com](https://api.example.com)",
    debug: !1
  },
  test: {
    apiUrl: "[https://test-api.example.com](https://test-api.example.com)",
    debug: !0
  }
}, o = (t = "development") => ({
  ...p,
  ...e[t] || e.development
});
export {
  p as appConfig,
  e as environments,
  o as getConfig
};
