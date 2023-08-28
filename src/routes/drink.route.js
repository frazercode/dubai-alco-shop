const router = require('express').Router();
const DrinkController = require('../controllers/drink');
const formidable = require('express-formidable');
const auth = require('../middlewares/auth.middleware');

router.get('/', DrinkController.getDrinks);

router.post('/', auth, formidable({type: 'multipart'}), DrinkController.postDrink);

router.patch('/', auth, formidable({type: 'multipart'}), DrinkController.patchDrink);

router.delete('/', auth, DrinkController.deleteDrink);

module.exports = router;