// Dependencies
import path from 'path'
import logger from './util/logger'
import router from './router/router'
import httpError from './util/httpError'
import appConfig from './config/appConfig'
import responseMessage from './constant/responseMessage'
import globalErrorHandler from './middleware/globalErrorHandler'
import express, { Application, Request, Response, NextFunction } from 'express'

// Defining Application
const app: Application = express()

// Proxy
app.set('trust proxy', true)

// Middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

// Router
app.use('/api/v1', router)

// 404 - Route Not Found
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('Route'))
    } catch (err) {
        httpError(next, err, req, 404)
    }
})

// Global Error Handler
app.use(globalErrorHandler)

// Uncaught Exception
process.on('uncaughtException', (error) => {
    logger.error(`UNCAUGHT_EXCEPTION`, { meta: error })
    // Perform cleanup tasks here, e.g. close database connections
    process.exit(1)
})

// Unhandled Rejection
process.on('unhandledRejection', (reason) => {
    logger.error(`UNHANDLED_REJECTION`, { meta: { reason } })
    // Perform cleanup tasks here, e.g. close database connections
    process.exit(1)
})

// Graceful shutdown on SIGTERM
process.on('SIGTERM', () => {
    logger.info(`SIGTERM`)
    // Perform cleanup tasks here, e.g. close database connections
    process.exit(0)
})

// Graceful shutdown on SIGINT
process.on('SIGINT', () => {
    logger.info(`SIGINT`)
    // Perform cleanup tasks here, e.g. close database connections
    process.exit(0)
})

// Listening on port
const server = app.listen(appConfig.PORT)

// Driver
;(async () => {
    try {
        logger.info(`APPLICATION_STARTED`, {
            meta: {
                server_url: appConfig.SERVER_URL,
                port: appConfig.PORT
            }
        })
    } catch (error: unknown) {
        logger.error(`APPLICATION_TERMINATED`, { meta: error })

        server.close((err) => {
            if (err) {
                logger.error(`APPLICATION_TERMINATED`, { meta: err })
            } else {
                logger.error(`APPLICATION_TERMINATED`)
            }

            process.exit(err ? 1 : 0)
        })
    }
})()
