// Dependencies
import { Router } from 'express'
import ApplicationController from '../controller/applicationController'

// Declaring Router
const router = Router()

// Controller
const applicationController = new ApplicationController()

// Routes
router.route('/self').get(applicationController.self)
router.route('/health').get(applicationController.health)

// Exporting Router
export default router
