import appConfig from '../config/appConfig'
import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
    const { healthToken } = req.query as { healthToken: string }

    // Checking if valid health token
    if (healthToken !== appConfig.HEALTH_TOKEN) {
        return res.sendStatus(400)
    }

    return next()
}
