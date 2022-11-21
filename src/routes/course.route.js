const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

courseController.index;

router.get('/trash', courseController.trash);
router.patch('/:id/restore', courseController.restore);
router.get('/:id/edit', courseController.edit);
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);
router.get('/:slug', courseController.show);

module.exports = router;
