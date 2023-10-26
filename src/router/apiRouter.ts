// Dependencies
import { Router } from 'express'
import apiController from '../controller/apiController'

// Declaring Router
const router = Router()

// Routes
router.route('/').get(apiController.self)

// Exporting Router
export default router
