// Dependencies
import path from 'path'
import dotenv from 'dotenv'

// Fetching Configs
dotenv.config({
    path:
        process.env['cross-env NODE_ENV']?.trim() === 'development'
            ? path.join(__dirname, '../', '../', '.env.development')
            : path.join(__dirname, '../', '../', '.env.production')
})

// Exporting Module
export default {
    ENV: process.env.ENV,
    PORT: process.env.PORT
}
