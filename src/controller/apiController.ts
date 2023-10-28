// Dependencies
import httpError from '../util/httpError'
import httpResponse from '../util/httpResponse'
import { Request, Response, NextFunction } from 'express'
import responseMessage from '../constant/responseMessage'

// Exporting Module
export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('here')
            console.log('heureu')
            console.log('adede the code')
            httpResponse(res, 200, responseMessage.SUCCESS)
        } catch (error) {
            httpError(next, error, req, 500)
        }
    }
}
