const express = require('express');
const viewController = require('./../controllers/viewsController');
const router = express.Router();
const authController = require('./../controllers/authController');

router.get('/', viewController.getOverview);

router.get('/tour/:slug', authController.protect, viewController.getTour);
router.get('/login', viewController.getLoginForm);

module.exports = router;
