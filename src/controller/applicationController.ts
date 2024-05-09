// Dependencies
import quicker from '../util/quicker'
import httpError from '../util/httpError'
import httpResponse from '../util/httpResponse'
import { Request, Response, NextFunction } from 'express'
import responseMessage from '../constant/responseMessage'

// Exporting Module
export default class ApplicationController {
    constructor() {
        //
    }

    health = (req: Request, res: Response, next: NextFunction) => {
        try {
            const healthData = {
                application: quicker.getApplicationHealth(),
                system: quicker.getSystemHealth(),
                timestamp: `${quicker.currentUtcTimestamp()} UTC`
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, healthData)
        } catch (error) {
            httpError(next, error, req, 500)
        }
    }

    self = (req: Request, res: Response, next: NextFunction) => {
        try {
            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (error) {
            httpError(next, error, req, 500)
        }
    }
}
