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
            }
            process.exit(err ? 1 : 0)
        })
    }
})()
