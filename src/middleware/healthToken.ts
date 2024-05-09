import appConfig from '../config/appConfig'
import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.query as { token: string }

    // Checking if valid health token
    if (token !== appConfig.HEALTH_TOKEN) {
        return res.sendStatus(400)
    }

    return next()
}
