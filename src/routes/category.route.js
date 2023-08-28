const router = require('express').Router();
const CategoryController = require('../controllers/category');
const formidable = require('express-formidable');
const auth = require('../middlewares/auth.middleware');

router.get('/', CategoryController.getCategories);

router.post('/', auth, formidable({type: 'multipart'}), CategoryController.postCategory);

router.patch('/', auth, formidable({type: 'multipart'}), CategoryController.patchCategory);

router.delete('/', auth, CategoryController.deleteCategory);

module.exports = router;