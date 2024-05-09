// Dependencies
import path from 'path'
import dotenv from 'dotenv'
import { AppConfig } from '../types/types'
import { EEnvironment } from '../constant/application'

// NODE_ENV
const NODE_ENV = process.env['NODE_ENV'] as string

// Fetching Configs
dotenv.config({
    path: NODE_ENV.trim() === EEnvironment.DEVELOPMENT ? path.join(process.cwd(), '.env.development') : path.join(process.cwd(), '.env.production')
})

// Creating Config
const config: AppConfig = {
    ENV: process.env.ENV as EEnvironment,
    PORT: parseInt(process.env.PORT as string),
    SERVER_URL: process.env.SERVER_URL as string,
    SERVER_DOMAIN: process.env.SERVER_DOMAIN as string,
    HEALTH_TOKEN: process.env.HEALTH_TOKEN as string
}

// Validating Config
const validateConfig = (config: AppConfig): void => {
    const requiredFields = ['ENV', 'PORT', 'SERVER_URL', 'HEALTH_TOKEN'] as const

    const errors: string[] = []
    const missingFields: string[] = []

    // Check for required fields
    requiredFields.forEach((field) => {
        if (!config[field]) {
            missingFields.push(field)
        }
    })

    // Validate ENV
    if (config.ENV) {
        if (![EEnvironment.DEVELOPMENT, EEnvironment.PRODUCTION].includes(config.ENV)) {
            errors.push(`ENV --> Expected a valid value either development or production`)
        } else {
            if (config.ENV !== NODE_ENV) {
                errors.push(`ENV --> Expected a value to be ${NODE_ENV}`)
            }
        }
    }

    // Validate PORT
    if (config.PORT) {
        const minRange = 1024
        const maxRange = 65535

        if (isNaN(config.PORT) || !(config.PORT >= minRange && config.PORT <= maxRange)) {
            errors.push(`PORT --> Expected a valid value between ${minRange} and ${maxRange}.`)
        }
    }

    // Validate SERVER_URL
    if (config.SERVER_URL) {
        try {
            const url = new URL(config.SERVER_URL)
            config.SERVER_URL = `${url.protocol}://${url.hostname}`
            config.SERVER_DOMAIN = url.hostname
        } catch (err) {
            errors.push(`SERVER_URL --> Expected a valid url.`)
        }
    }

    // Validate HEALTH_TOKEN
    if (config.HEALTH_TOKEN) {
        const minRange = 6
        const maxRange = 12

        if (!(config.HEALTH_TOKEN.length >= minRange && config.HEALTH_TOKEN.length <= maxRange)) {
            errors.push(`HEALTH_TOKEN --> Expected a valid value between length ${minRange} and ${maxRange}.`)
        }
    }

    // Throw an error if there are any validation issues
    if (errors.length > 0 || missingFields.length > 0) {
        let message = `----------> Config Validation Failed <----------\n\n`

        if (missingFields.length > 0) {
            message += `Missing Variables --> [${missingFields.join(', ')}]\n\n`
        }

        for (let i = 0; i < errors.length; i++) {
            const error = errors[i]
            message += `(${i + 1}) ${error}\n`
        }

        throw new Error(message)
    }
}

try {
    validateConfig(config)
} catch (error) {
    // eslint-disable-next-line no-console
    console.error((error as Error).message)
    process.exit(0)
}

export default config
