// Dependencies
import path from 'path'
import dotenv from 'dotenv'
import { EEnvironment } from '../constant/application'

// Fetching Configs
dotenv.config({
    path:
        process.env['NODE_ENV']?.trim() === EEnvironment.DEVELOPMENT
            ? path.join(__dirname, '../', '../', '.env.development')
            : path.join(__dirname, '../', '../', '.env.production')
})

// Exporting Module
export default {
    // General
    ENV: process.env.ENV || EEnvironment.DEVELOPMENT,
    PORT: process.env.PORT || 3000,
    SERVER_URL: process.env.SERVER_URL || ''
} as const
