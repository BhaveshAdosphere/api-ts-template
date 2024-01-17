// Dependencies
import { Router } from 'express'
import apiController from '../controller/apiController'

// Declaring Router
const router = Router()

// Routes
router.route('/self').get(apiController.self)
router.route('/health').get(apiController.health)

// Exporting Router
export default router
