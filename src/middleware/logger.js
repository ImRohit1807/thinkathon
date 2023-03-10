
const { createLogger, format, transports, config } = require('winston');
const { combine, simple } = format;

const logger = createLogger({
    format: combine(
        format.colorize(),
        simple()
    ),

    transports: [
        new transports.Console()
    ]
});
module.exports = logger;