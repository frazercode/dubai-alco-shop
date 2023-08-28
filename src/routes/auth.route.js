const router = require('express').Router();
const AuthController = require('../controllers/auth');

router.get('/', AuthController.getAuth);

router.post('/', AuthController.postAuth);

router.delete('/', AuthController.deleteAuth);

module.exports = router;