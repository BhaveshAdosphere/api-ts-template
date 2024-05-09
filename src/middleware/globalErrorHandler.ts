import logger from '../util/logger'
import appConfig from '../config/appConfig'
import { THttpError } from '../types/types'
import { EEnvironment } from '../constant/application'
import { Request, Response, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: THttpError, _: Request, res: Response, __: NextFunction) => {
    const errorClone = JSON.parse(JSON.stringify(err))

    logger.error(`CONTROLLER_ERROR`, {
        meta: err
    })

    if (appConfig.ENV === EEnvironment.PRODUCTION) {
        if (errorClone.trace) {
            delete errorClone.trace
        }

        if (errorClone.request.ip) {
            delete errorClone.request.ip
        }
    }

    res.status(errorClone.status || 500).json(errorClone)
}
