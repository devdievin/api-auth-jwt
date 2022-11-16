import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../helpers/api-errors'

export const errorMidddleware = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message : 'Internal Server Error'
    return res.status(statusCode).json({ message })
}