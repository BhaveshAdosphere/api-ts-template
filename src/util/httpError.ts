// Dependencies
import { Request, NextFunction } from 'express'
import errorObject from './errorObject'

// Exporting Module
export default (nextFunc: NextFunction, err: Error | unknown, req: Request, errorStatus: number = 500): void => {
    const errorObj = errorObject(err, req, errorStatus)
    return nextFunc(errorObj)
}
