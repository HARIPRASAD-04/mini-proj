const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/ping', (req, res) => {
  res.send('Auth route is working!');
});

router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOtp);

module.exports = router;
