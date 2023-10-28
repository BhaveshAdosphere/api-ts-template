// Dependencies
import path from 'path'
import env from '../constant/env'
import config from '../config/config'
import { createLogger, transports, format } from 'winston'
import { ConsoleTransportInstance } from 'winston/lib/winston/transports'

// Custom log format with meta information
const customLogFormat = format.printf(({ level, message, timestamp, meta = {} }) => {
    const logData = { level: level.toUpperCase(), message, timestamp, meta: {} }
    logData.meta = meta
    return JSON.stringify(logData)
})

const consoleTransports = (): Array<ConsoleTransportInstance> => {
    if (config.ENV === env.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), customLogFormat)
            })
        ]
    }

    return []
}

// Exporting Module
export default createLogger({
    transports: [
        new transports.File({
            filename: path.join(__dirname, '../', 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), customLogFormat)
        }),
        ...consoleTransports()
    ]
})
