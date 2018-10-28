const {createLogger, format, transports} = require('winston');
const SignaleTransport = require('signale-transport');

/**
  * Logging strategy
  * - All timestamped for reference on when and calculating duration
  * - To file and console, console for immediate real time reference, and logs for historical reference
  */
const logger = createLogger({
  levels: {
    // RFC
    info: 6,
    // Custom
    success: 8
  },
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json()
  ),
  transports: [
    new SignaleTransport({ level: 'success' }),
    new SignaleTransport({ level: 'info' }),
    new transports.File({ filename: 'logs/combined.log', format: format.printf(
      info => `${info.timestamp} ${info.level}: ${info.message}`
    )})
  ]
});

module.exports = logger;
