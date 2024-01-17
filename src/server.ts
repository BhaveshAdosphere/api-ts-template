// Dependencies
import path from 'path'
import logger from './util/logger'
import config from './config/config'
import httpError from './util/httpError'
import apiRouter from './router/apiRouter'
import { THttpError } from './types/types'
import { EEnvironment } from './constant/application'
import responseMessage from './constant/responseMessage'
import express, { Application, Request, Response, NextFunction } from 'express'

// Defining Application
const app: Application = express()

// Proxy
app.set('trust proxy', true)

// Middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

// Router
app.use('/api/v1', apiRouter)

// 404 - Route Not Found
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('Route'))
    } catch (err) {
        httpError(next, err, req, 404)
    }
})

// Global Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: THttpError, _: Request, res: Response, __: NextFunction) => {
    logger.error(`CONTROLLER_ERROR`, {
        meta: err
    })

    if (config.ENV === EEnvironment.PRODUCTION) {
        delete err.trace
    }

    res.status(err.status).json(err)
})

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
const server = app.listen(config.PORT)

// Driver
;(async () => {
    try {
        logger.info(`APPLICATION_STARTED`, {
            meta: {
                server_url: config.SERVER_URL,
                port: config.PORT
            }
        })
    } catch (error: unknown) {
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
