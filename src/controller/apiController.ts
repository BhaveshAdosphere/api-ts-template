// Dependencies
import { Request, Response, NextFunction } from 'express'
import responseMessage from '../constant/responseMessage'
import { HttpError as HttpErrorType } from '../types/errorType'

// Exporting Module
export default {
    self: (_: Request, res: Response, next: NextFunction) => {
        try {
            const response = {
                success: true,
                status: 200,
                message: responseMessage.SUCCESS,
                data: null
            }

            res.status(response.status).json(response)
        } catch (error: unknown) {
            const errorObj: HttpErrorType = {
                success: false,
                status: 500,
                message: error instanceof Error ? error.message : responseMessage.SOMETHING_WENT_WRONG,
                data: null
            }

            next(errorObj)
        }
    }
}
