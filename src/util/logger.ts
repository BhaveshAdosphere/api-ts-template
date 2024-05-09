// Dependencies
import path from 'path'
import util from 'util'
import appConfig from '../config/appConfig'
import { EEnvironment } from '../constant/application'
import * as sourceMapSupport from 'source-map-support'
import { createLogger, transports, format } from 'winston'
import { red, green, blue, yellow, magenta } from 'colorette'
import { ConsoleTransportInstance } from 'winston/lib/winston/transports'

// Enables source map support
sourceMapSupport.install()

// Custom log format with meta information
const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    // Define color functions for different log levels
    const colorizeLevel = (level: string) => {
        switch (level) {
            case 'ERROR':
                return red(level)
            case 'INFO':
                return blue(level)
            case 'WARN':
                return yellow(level)
            default:
                return level
        }
    }

    // Colorize log level and timestamp
    const coloredLevel = colorizeLevel(level.toUpperCase())
    const coloredTimestamp = green(timestamp)

    // Colorize message
    const coloredMessage = colorizeLevel(message)

    // Colorize and format meta object
    const coloredMeta = util.inspect(meta, { showHidden: false, colors: true, depth: null })

    // Construct the final log message with colorized components
    const coloredLogData = `${coloredLevel} [${coloredTimestamp}] ${coloredMessage}\n${magenta('META')} ${coloredMeta}\n`

    return coloredLogData
})

const fileLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    // Meta for file log
    const logMeta: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || ''
            }
        } else {
            logMeta[key] = value
        }
    }

    const logData = { level: level.toUpperCase(), message, timestamp, meta: logMeta }
    return JSON.stringify(logData, null, 4)
})

const consoleTransports = (): Array<ConsoleTransportInstance> => {
    if (appConfig.ENV === EEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }

    return []
}

// Exporting Module
export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${appConfig.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat)
        }),
        ...consoleTransports()
    ]
})
