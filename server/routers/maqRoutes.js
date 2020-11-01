const express = require('express');
const articleController = require('../controllers/maqController')
const router = express.Router();

const root='maq';
router.get(`/${root}`, articleController.getData);
router.post(`/${root}`, articleController.addData);
router.put(`/${root}/:id`, articleController.updData);
router.delete(`/${root}/:id`, articleController.delData);

module.exports = router;