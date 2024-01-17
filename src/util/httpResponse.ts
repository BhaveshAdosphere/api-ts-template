// Dependencies
import { Request, Response } from 'express'
import { THttpResponse } from '../types/types'

// Exporting Module
export default (req: Request, res: Response, responseStatus: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        status: responseStatus,
        request: {
            method: req.method,
            ip: req.ip,
            url: req.originalUrl
        },
        message: responseMessage,
        data
    }

    res.status(responseStatus).json(response)
}
