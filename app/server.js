const catchErr = err => {
  console.error(err);
  process.exit(1);
};
process.on('uncaughtException', catchErr);
process.on('unhandledRejection', catchErr);

const express = require('express');
const morgan = require('morgan');
const swagger = require('swagger-ui-express');
const app = express();
const collection = new (require('./modules/collection'))();

(async () => {
  await collection.connect();
})()

app.use(morgan('tiny'));

app.use(express.static('web'));

app.use('/api-docs', swagger.serve, swagger.setup(require('swagger-jsdoc')({
  swaggerDefinition: {
    info: {
      title: 'Match Filter',
      version: '1.0.0'
    },
    basePath: '/api/'
  },
  apis: ['./routes/*.js', './modules/*.js']
})));

app.use('/api/match', require('./routes/match')(express.Router(), collection));

app.listen(8000, console.log.bind(console, 'Server is running on port', 8000));
