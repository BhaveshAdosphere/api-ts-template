// Dependencies
import path from 'path'
import logger from './util/logger'
import config from './config/config'
import apiRouter from './router/apiRouter'
import responseMessage from './constant/responseMessage'
import { HttpError as HttpErrorType } from './types/errorType'
import express, { Application, Request, Response, NextFunction } from 'express'

// Defining Application
const app: Application = express()

// Middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Router
app.use('/api/v1', apiRouter)

// 404 - Not Found
app.use((_: Request, __: Response, next: NextFunction) => {
    const errResponse = {
        success: false,
        status: 404,
        message: responseMessage.NOT_FOUND('Route'),
        data: null
    }
    next(errResponse)
})

// Global Error Handler
app.use((err: HttpErrorType, _: Request, res: Response, __: NextFunction) => {
    logger.error(`CONTROLLER_ERROR`, {
        meta: {
            error: err
        }
    })
    res.status(err.status || 500).json(err)
})

// Listening on port
app.listen(config.PORT, () => {
    logger.info(`APPLICATION_STARTED`, {
        meta: {
            port: config.PORT
        }
    })
})
