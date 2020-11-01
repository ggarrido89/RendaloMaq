
const Maq = require('../models/maqModel');
const articleController = {};

articleController.getData = async (req, res) => {
    const articleList = await Maq.find().sort({created_at:-1});
    res.status(200).json(articleList);
}
articleController.addData = async (req, res) => {
    const article = new Maq(req.body);
    await article.save();
    res.json({ res: 'OK' });
}
articleController.updData = async (req, res) => {
    const { id } = req.params;
    await Maq.findByIdAndUpdate(id, {$set:req.body}, {new:true});

    res.json({ res: 'OK' });
}
articleController.delData = async (req, res) => {
    await Maq.findByIdAndRemove(req.params.id)
    res.json({ res: 'OK' });
}

module.exports = articleController;