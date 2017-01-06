// require('babel-polyfill');

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
    title: 'QuantQuest',
    description: 'A competition to find the best trader',
    head: {
      titleTemplate: 'QuantQuest: %s',
      meta: [
        {name: 'description', content: 'A quest to find the best quant'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Quant Quest'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.png'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Auquan competition'},
        {property: 'og:description', content: 'A quest to find the best quant'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
