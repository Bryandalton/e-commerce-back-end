const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{ model: Product}],
  })
  .then (dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({ message: 'No Category data'});
      return;
    }
    res.status(200).json( { message: 'Category retrieval successful', dbCategoryData });
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [{model: Product}],
  })
  .then(catData => {
    if(!catData){
      res.status(404).json({message: "No category with this id found!"})
    } res.status(200).json({message: 'Category found!'})
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body);
  res.status(200).json(req.body);
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body);
  res.status(200).json(req.body);
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(req.body)
});

module.exports = router;
