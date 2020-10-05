import pino, { Logger } from 'pino';

import { app } from '../config';

interface ILogger {
  development: Logger;
  production: Logger;

  [key: string]: Logger;
}

const loggers: ILogger = {
  development: pino({ timestamp: false, level: 'debug', prettyPrint: true }),
  production: pino({ level: 'error' }),
};

const logger: Logger = loggers[app.env];

export default logger;
