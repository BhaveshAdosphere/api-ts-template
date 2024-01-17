// Dependencies
import axios from 'axios'
import { Request } from 'express'
import { THttpError } from '../types/types'
import responseMessage from '../constant/responseMessage'

// Exporting Module
export default (err: Error | unknown, req: Request, errorStatus: number = 500): THttpError => {
    const errorObj: THttpError = {
        success: false,
        status: errorStatus,
        request: {
            method: req.method,
            ip: req.ip,
            url: req.originalUrl
        },
        message: err instanceof Error ? err.message || responseMessage.SOMETHING_WENT_WRONG : responseMessage.SOMETHING_WENT_WRONG,
        data: null,
        trace: err instanceof Error ? { error: err.stack } : null
    }

    // Identifying if error is axios error
    const isAxiosError = axios.isAxiosError(err)
    if (isAxiosError) {
        const errorStatusCode = err.response?.status
        const errorMessage = err.response?.data?.message
        const errorTrace = err.response?.data

        if (errorStatusCode) {
            errorObj.status = errorStatusCode
        }

        if (errorMessage) {
            errorObj.message = errorMessage
        }

        if (errorTrace) {
            errorObj.trace = errorTrace
        }
    }

    return errorObj
}
