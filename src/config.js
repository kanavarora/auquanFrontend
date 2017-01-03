require('babel-polyfill');

const environment = {
  development: {
    isProduction: false,
    apiUrl: 'http://localhost:5000'
  },
  production: {
    isProduction: true,
    apiUrl: 'https://auquan-backend.herokuapp.com'
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Auquan competition',
    description: 'A competition to find the best trader',
    head: {
      titleTemplate: 'Auquan competition: %s',
      meta: [
        {name: 'description', content: 'A competition to find the best trader.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Auquan competition'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Auquan competition'},
        {property: 'og:description', content: 'A competition to find the best trader.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
