// Dependencies
import { Response } from 'express'
import { HttpResponseType } from '../types/types'

// Exporting Module
export default (res: Response, responseStatus: number, responseMessage: string, data: unknown = null): void => {
    const response: HttpResponseType = {
        success: true,
        status: responseStatus,
        message: responseMessage,
        data
    }

    res.status(responseStatus).json(response)
}
