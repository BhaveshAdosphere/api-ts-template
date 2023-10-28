import env from '../constant/env'
import { Request } from 'express'
import config from '../config/config'
import { HttpErrorType } from '../types/types'
import responseMessage from '../constant/responseMessage'

export default (err: Error | unknown, req: Request, errorStatus: number = 500): object => {
    const errorObj: HttpErrorType = {
        success: false,
        status: errorStatus,
        request: {
            ip: req.ip,
            path: req.path
        },
        message: err instanceof Error ? err.message : responseMessage.SOMETHING_WENT_WRONG,
        data: null,
        trace: config.ENV === env.DEVELOPMENT && err instanceof Error ? err.stack : null
    }

    return errorObj
}
