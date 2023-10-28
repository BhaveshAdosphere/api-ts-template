// Dependencies
import path from 'path'
import logger from './util/logger'
import config from './config/config'
import httpError from './util/httpError'
import apiRouter from './router/apiRouter'
import { HttpErrorType } from './types/types'
import responseMessage from './constant/responseMessage'
import express, { Application, Request, Response, NextFunction } from 'express'

// Defining Application
const app: Application = express()

// Proxy
app.set('trust proxy', true)

// Middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

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
app.use((err: HttpErrorType, _: Request, res: Response, __: NextFunction) => {
    logger.error(`CONTROLLER_ERROR`, {
        meta: err
    })

    res.status(err.status).json(err)
})

// Listening on port
app.listen(config.PORT, () => {
    logger.info(`APPLICATION_STARTED`, {
        meta: {
            port: config.PORT
        }
    })
})
