import winston from 'winston';

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf, colorize } = format;

const projectFormat = printf(
  ({ level, message, label: localLabel, timestamp: localTimestamp }) =>
    `${localTimestamp} [${localLabel}] ${level}: ${message}`,
);

const logFormat = combine(
  colorize({ all: true }),
  label({ label: 'avenue-api' }),
  timestamp({ format: 'DD-MM-YY HH:MM:SS' }),
  projectFormat,
);

const options = {
  console: {
    handleExceptions: true,
    json: false,
    format: logFormat,
  },
};

const logger = createLogger({
  level: 'debug',
  transports: [new transports.Console(options.console)],
  exitOnError: false,
});

export default logger;
