const fs = require('fs');

// @todo use real logger to avoid such things
module.exports = console = {
  debug: (...args) => fs.appendFileSync('debug.log', `${args.join(' ')}\n`),
  log: (...args) => fs.appendFileSync('log.log', `${args.join(' ')}\n`),
  info: (...args) => fs.appendFileSync('info.log', `${args.join(' ')}\n`),
  warn: (...args) => fs.appendFileSync('warn.log', `${args.join(' ')}\n`),
  error: (...args) => fs.appendFileSync('error.log', `${args.join(' ')}\n`)
};
