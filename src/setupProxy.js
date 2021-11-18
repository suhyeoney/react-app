const { createProxyMiddleware } = require('http-proxy-middleware');

/* 
    React (port number 3000)
    Express (port number 3001)
    두 서버 사이에 프록시를 구성하여 마치 하나의 서버인 것처럼 작동하게 함.
    http://localhost:3000/api ~ 이하의 경로를 가진 API 요청 >>>>> 프록시 경유 >>>>> http://localhost:3001/api ~ 이하의 경로로 호출 !
    (e.g. http://localhost:3000/api/getAllTrainsInfo 라는 API 요청이 프록시를 통해 http://localhost:3001/api/getAllTrainsInfo 로 호출하게 됨)
*/

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'http://localhost:3001',
          changeOrigin: true
      })
  )
};