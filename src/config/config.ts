// Dependencies
import path from 'path'
import dotenv from 'dotenv'
import env from '../constant/env'

// Fetching Configs
dotenv.config({
    path:
        process.env['cross-env NODE_ENV']?.trim() === env.DEVELOPMENT
            ? path.join(__dirname, '../', '../', '.env.development')
            : path.join(__dirname, '../', '../', '.env.production')
})

// Exporting Module
export default {
    ENV: process.env.ENV,
    PORT: process.env.PORT
}
