// Dependencies
import httpError from '../util/httpError'
import { Request, Response, NextFunction } from 'express'
import responseMessage from '../constant/responseMessage'

// Exporting Module
export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = {
                success: true,
                status: 200,
                message: responseMessage.SUCCESS,
                data: null
            }

            res.status(response.status).json(response)
        } catch (error) {
            next(httpError(error, req, 500))
        }
    }
}
