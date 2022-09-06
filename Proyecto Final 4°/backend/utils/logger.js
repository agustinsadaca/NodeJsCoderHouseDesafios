import log4js from 'log4js'

log4js.configure({
  appenders: {
    consola: { type: 'console' },
    archivoErrores: { type: 'file', filename: 'error.log' },
    archivoWarnings: { type: 'file', filename: 'warn.log' },
    loggerArchivoErrores: {
      type: 'logLevelFilter',
      appender: 'archivoErrores',
      level: 'error',
    },
    loggerArchivoWarnings: {
      type: 'logLevelFilter',
      appender: 'archivoWarnings',
      level: 'warn',
    },
  
  },
  categories: {
    default: {
      appenders: ['consola','loggerArchivoErrores','loggerArchivoWarnings'],
      level: 'all',
    },
    prod: {
      appenders: ['consola','loggerArchivoErrores','loggerArchivoWarnings'],
      level: 'all',
    },

  },
})

let logger = null

if (process.env.NODE_ENV === 'production') {
  logger = log4js.getLogger('prod')
} else {
  logger = log4js.getLogger()
}

export default logger
