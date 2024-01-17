// Dependencies
import os from 'os'
import util from 'util'
import moment from 'moment'
import config from '../config/config'

export default {
    // Advanced Console Log
    ACL: (object: object) => util.inspect(object, { showHidden: false, depth: null, colors: true }),
    getSystemHealth: () => {
        return {
            cpuUsage: os.loadavg(),
            totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed()} MB`,
            freeMemory: `${(os.freemem() / 1024 / 1024).toFixed()} MB`
        }
    },
    getApplicationHealth: () => {
        return {
            environment: config.ENV,
            uptime: `${process.uptime().toFixed(2)} Second`,
            memoryUsage: {
                heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
                heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
                external: `${(process.memoryUsage().external / 1024 / 1024).toFixed(2)} MB`
            }
        }
    },
    currentUtcTimestamp: () => moment.utc().format('DD-MM-YYYY HH:mm:ss')
}
